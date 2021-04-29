const fs = require('fs')
const path = require('path')
const spritesmithPlugin = require('webpack-spritesmith')
const terserPlugin = require('terser-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const cdnDependencies = require('./dependencies.cdn')

const spritesmithTasks = []
fs.readdirSync('src/assets/sprites').map(dirname => {
    if (fs.statSync(`src/assets/sprites/${dirname}`).isDirectory()) {
        spritesmithTasks.push(
            new spritesmithPlugin({
                src: {
                    cwd: path.resolve(__dirname, `src/assets/sprites/${dirname}`),
                    glob: '*.png'
                },
                target: {
                    image: path.resolve(__dirname, `src/assets/sprites/${dirname}.[hash].png`),
                    css: [
                        [path.resolve(__dirname, `src/assets/sprites/_${dirname}.scss`), {
                            format: 'handlebars_based_template',
                            spritesheetName: dirname
                        }]
                    ]
                },
                customTemplates: {
                    'handlebars_based_template': path.resolve(__dirname, 'scss.template.hbs')
                },
                // 样式文件中调用雪碧图地址写法
                apiOptions: {
                    cssImageRef: `~${dirname}.[hash].png`
                },
                spritesmithOptions: {
                    algorithm: 'binary-tree',
                    padding: 10
                }
            })
        )
    }
})

// CDN 相关
const isCDN = process.env.VUE_APP_CDN == 'ON'
const externals = {}
cdnDependencies.forEach(pkg => {
    externals[pkg.name] = pkg.library
})
const cdn = {
    css: cdnDependencies.map(e => e.css).filter(e => e),
    js: cdnDependencies.map(e => e.js).filter(e => e)
}
// gzip 相关
const isGZIP = process.env.VUE_APP_GZIP == 'ON'

const Timestamp = new Date().getTime();
const systrem_version = '1.1.8';

module.exports = {
    publicPath: '',
    productionSourceMap: false,
    devServer: {
        open: true,
        proxy: {
            '/': {    // search为转发路径
                target: process.env.VUE_APP_API_ROOT,  // 目标地址
                // target: 'https://admin-api.haitunshenghuo.com',  // 目标地址
                secure: false,  // 如果是https接口，需要配置这个参数
                ws: true, // 是否代理websockets
                changeOrigin: true   // 设置同源  默认false，是否需要改变原始主机头为目标URL,
            }
        }
    },
    // devServer: {
    //     open: true
    //     // proxy: {
    //     //     '/': {
    //     //         target: process.env.VUE_APP_API_ROOT,
    //     //         changeOrigin: true
    //     //     }
    //     // },
    //     // 用于 mock-server
    //     // proxy: {
    //     //     '/mock': {
    //     //         target: '/',
    //     //         changeOrigin: true
    //     //     },
    //     //     '/': {
    //     //         target: process.env.VUE_APP_API_ROOT,
    //     //         changeOrigin: true
    //     //     }
    //     // },
    // },
    // configureWebpack: config => {
    //     config.resolve.modules = ['node_modules', 'assets/sprites']
    //     config.plugins.push(...spritesmithTasks)
    //     if (isCDN) {
    //         config.externals = externals
    //     }
    //     config.optimization = {
    //         minimizer: [
    //             new terserPlugin({
    //                 terserOptions: {
    //                     compress: {
    //                         warnings: false,
    //                         drop_console: true,
    //                         drop_debugger: true,
    //                         pure_funcs: ['console.log']
    //                     }
    //                 }
    //             })
    //         ]
    //     }
    //     if (isGZIP) {
    //         return {
    //             plugins: [
    //                 new CompressionPlugin({
    //                     algorithm: 'gzip',
    //                     test: /\.(js|css)$/, // 匹配文件名
    //                     threshold: 10240, // 对超过10k的数据压缩
    //                     deleteOriginalAssets: false, // 不删除源文件
    //                     minRatio: 0.8 // 压缩比
    //                 })
    //             ]
    //         }
    //     }
    // },
    configureWebpack: { // webpack 配置
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `[name].${systrem_version}.${Timestamp}.js`,
            chunkFilename: `[name].${systrem_version}.${Timestamp}.js`
        },
    },
    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: true
        },
        mock: {
            entry: './src/mock/server.js',
            debug: true,
            disable: true
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: [
                        './src/assets/styles/resources/*.scss',
                        './src/assets/sprites/*.scss'
                    ]
                })
                .end()
        })
        config.module
            .rule('svg')
            .exclude.add(path.join(__dirname, 'src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(path.join(__dirname, 'src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config.plugin('html')
            .tap(args => {
                args[0].title = process.env.VUE_APP_TITLE
                if (isCDN) {
                    args[0].cdn = cdn
                }
                args[0].debugTool = process.env.VUE_APP_DEBUG_TOOL
                args[0].appType = process.env.VUE_APP_TYPE
                return args
            })
        config.module
            .rule('i18n')
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use('i18n')
            .loader('@kazupon/vue-i18n-loader')
            .end()
    }
}
