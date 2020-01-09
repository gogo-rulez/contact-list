module.exports = {
    // css: {
    //     modules: true,
    //     loaderOptions: {
    //         sass: {
    //             prependData: `
    //                 @import "static/scss/includes/i_mixins";
    //                 @import "static/scss/site_settings";
    //             `
    //         }
    //     }
    // },

    chainWebpack: config => {
        config.module
            .rule( 'css')
            .test( /\.css$/)
            .use('vue-style-loader')
                .loader('css-loader')
                .options({
                    modules: true
                })
    }


//     module: {
//     rules: [
//       // ... other rules omitted
//       {
//         test: /\.css$/,
//         use: [
//           'vue-style-loader',
//           {
//             loader: 'css-loader',
//             options: {
//               // enable CSS Modules
//               modules: true,
//               // customize generated class names
//               localIdentName: '[local]_[hash:base64:8]'
//             }
//           }
//         ]
//       }
//     ]
//   }



    // module: {
    //     rules: [
    //         {
    //             test: /\.scss$/,
    //             use: [
    //                 'vue-style-loader',
    //                 {
    //                 loader: 'css-loader',
    //                 options: { modules: true }
    //                 },
    //                 'sass-loader'
    //             ]
    //         }
    //     ],
    // },

    // chainWebpack: config => {
    //     config.module
    //     .rule('scss')
    //     .use('vue-style-loader')
    //         .loader('css-loader')
    //         .tap(options => {
    //             options.modules = true;
    //             return options
    //         })
    // }
};

// module.rules = {
//     test: /\.scss$/,
//     use: [
//         'vue-style-loader',
//         {
//             loader: 'css-loader',
//             options: { modules: true }
//         },
//         'sass-loader'
//     ]
// }

