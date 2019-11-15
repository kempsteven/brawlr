const path = require('path');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/style/app.scss";`
            }
        }
    },

    pwa: {
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'public/service-worker.js',
            exclude: [
                /\.map$/,
                /manifest\.json$/
            ],
        },

        themeColor: '#1a1a1a'
    }
}
    
    