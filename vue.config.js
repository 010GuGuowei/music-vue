module.exports = {
    devServer: {
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3300',
        //         ws: true,
        //         changeOrigin: true
        //     },
        // },

        proxy:'http://localhost:3300'
    }
}