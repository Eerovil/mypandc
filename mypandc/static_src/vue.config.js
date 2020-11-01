module.exports = {
    devServer: {
        proxy: 'http://localhost:8003',
    },
    outputDir: '../static',
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'My point-and-click game';
                args[0].meta = {viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'};
    
             return args;
        })
    }
}