const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');
const destDir = path.resolve(__dirname, 'dist');


function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });

    //// check for empty folder

    // Read all entries in the source directory
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied: ${path.relative(__dirname, srcPath)}`);
        }
    }
}


fs.rmSync(destDir, { recursive: true, force: true });

console.log(`Building: src → dist\n`);
copyDir(srcDir, destDir);
console.log(`\nDone.\n`);
