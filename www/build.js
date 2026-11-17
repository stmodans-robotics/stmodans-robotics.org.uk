const fs = require('fs');
const path = require('path');

const srcName = 'src';
const destName = 'dist';
const pubName = 'public';

const srcDir = path.join(__dirname, srcName);
const destDir = path.join(__dirname, destName);
const pubDir = path.join(__dirname, pubName);


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


console.log(`Building: ${srcName} → ${destName}`);
copyDir(srcDir, destDir);

console.log();

console.log(`Copying: ${pubName} → ${destName}`);
copyDir(pubDir, destDir);

console.log(`\nDone.\n`);
