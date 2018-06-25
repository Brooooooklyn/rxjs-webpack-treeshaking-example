const { resolve } = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const tsImportPluginFactory = require('ts-import-plugin')

const importPlugin = tsImportPluginFactory([
  {
    libraryName: 'rxjs/operators',
    libraryDirectory: '../_esm5/internal/operators',
    camel2DashComponentName: false,
    transformToDefaultImport: false
  },
  {
    libraryName: 'rxjs',
    libraryDirectory: '../_esm5/internal/observable',
    camel2DashComponentName: false,
    transformToDefaultImport: false,
  }
])

module.exports = {
  entry: {
    app: './src/app.ts'
  },
  output: {
    filename: '[name].js',
    path: resolve(process.cwd(), 'dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ importPlugin ]
          })
        },
        exclude: /node_modules/
      }
    ]
  },

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: './report.html'
    })
  ]
}