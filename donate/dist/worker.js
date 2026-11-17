export default {
    async fetch(request, env, ctx) {
        const path = new URL(request.url).pathname.slice(1) || 'GoFundMe';
        const ip = request.headers.get('CF-Connecting-IP');

        console.info({ message: 'Donate hit for ' + path });

        await env.d1_donations
            .prepare(`
                INSERT INTO visits (timestamp, path, ip)
                VALUES (?, ?, ?)
            `)
            .bind(Date.now(), path, ip)
            .run();

        return Response.redirect('https://www.gofundme.com/f/support-st-modans-vex-robotics-teams', 302)
    }
};