var config = {
   entry: './src/index.js',
	
   output: {
      path:'./',
      filename: 'bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
             test:/\.scss$/,
             loaders:['style','css?sourceMap','sass']
         }
      ]
   }
}

module.exports = config;