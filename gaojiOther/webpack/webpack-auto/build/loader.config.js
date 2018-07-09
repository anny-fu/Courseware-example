// CSS剥离
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// 打包后静态资源路径
const staticAssets = 'static/';

// CSS输出
exports.styles = new ExtractTextWebpackPlugin(staticAssets + 'css/[name].css');

exports.config = [
    // less编译
    {
        test: /\.(less|css)$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: "css-loader!less-loader"
        })
    },
    {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'file-loader',
        options: {
            useRelativePath: true,
            name: 'assets/[name].[ext]',
            outputPath: 'static/'
        }
    },
    // 字体图标
    {
        test: /\.(woff2?|svg|eot|ttf)$/,
        loader: 'file-loader',
        options: {
            name: 'fonts/[name].[ext]',
            outputPath: 'static/'
        }
    },
    // 用babel编译js
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|.idea|.git)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }
    },
    // HTML中的图片
    {
        test: /\.html/,
        loader: 'html-loader'
    }
]