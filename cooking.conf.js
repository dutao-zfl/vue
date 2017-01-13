var path = require('path');
var cooking = require('cooking');

cooking.set({
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    dist: './dist',
    template: './index.tpl',
    devServer: {
        port: 8081,
        publicPath: '/',
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                pathRewrite: {'^/api': ''},
                //secure: false
            }
        }
    },

    // production
    clean: true,
    hash: true,
    //sourceMap: true,
    minimize: true,
    chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    postcss: [
        // require('...')
    ],
    publicPath: '',
    assetsPath: 'static',
    urlLoaderLimit: 10000,
    extractCSS: '[name].[contenthash:7].css',
    externals:{
        system_path:'snc-system'
    },
    alias: {
        'src': path.join(__dirname, 'src'),
        'vue': 'vue/dist/vue.min',
        'http': 'src/plugin/http.js',
        'jquery': 'src/plugin/jquery.min.js',
        'underscore': 'src/plugin/underscore.js',
        'backbone': 'src/plugin/backbone.js',
        'common': 'src/plugin/common.js',
        'serializejson': 'src/plugin/jquery.serializejson.min.js',
        'jquery-validate': 'src/plugin/jquery.validate.js',
        'layer': 'src/plugin/layer/layer.js',
        'form': 'src/plugin/form.js',
        'jquery-ui': 'src/plugin/jqueryui.js',
        'icheck': 'src/plugin/icheck/icheck.js',
        'gridList': 'src/components/table/gridList.js',
        'gridModel': 'src/components/table/gridModel.js',
        'tableView': 'src/components/table/view.js',
        'tableModel': 'src/components/table/model.js',
        'btnView': 'src/components/btn/view.js',
        'btnModel': 'src/components/btn/model.js',
        'dataSourceModel': 'src/components/dataSource/model.js',
        'publicModel': 'src/components/addModel/publicModel.js',
        'getProjectPath': 'src/components/addModel/getProjectPath.js',
        'modelAnalyze': 'src/components/page/modelAnalyze.js',
    },
    extends: ['vue2', 'less', 'autoprefixer']//'eslint'
});

module.exports = cooking.resolve();
