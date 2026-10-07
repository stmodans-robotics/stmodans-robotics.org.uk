export default {
    async fetch(request, env, ctx) {
        const path = new URL(request.url).pathname.slice(1) || 'GoFundMe';
        const ip = request.headers.get('CF-Connecting-IP');

        console.info({ message: 'Donate hit for ' + path });

        env.donations.writeDataPoint({
            indexes: [path],
            blobs: [ip],
            doubles: [Date.now()]
        });

        return new Response(path + '\n' + ip);

        // return Response.redirect(
        //     'https://www.gofundme.com/f/support-st-modans-vex-robotics-teams',
        //     302
        // );
    }
};