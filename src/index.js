/**
 * vite2 plugin
 * .vue/.styl/.stylus style file handle
 */
 const path = require('path')

 const nodeStylus = require('stylus')
 
 const stylFileRegex = /\.(styl|stylus)$/
 
 const relurl = /(@(import|require)) '(\.\/*.+)'/g
 
 const transStylus = (styleContent, stylusOpts, filePath = './') => {
   // @import & @require file path trans to abs path
   styleContent = styleContent.replace(relurl, function(match, req1, req2, relfile) {
     // console.log(relfile, path.join(filePath, relfile))
     if (relfile.indexOf('.') === 0) {
       relfile = path.join(filePath, relfile)
     }
     return `${req1} '${relfile}'`
   })
 
   const ref = nodeStylus(styleContent)
 
   // set resolveURL type
   if (stylusOpts.resolveURL) {
     ref.define('url', nodeStylus.resolver(stylusOpts.resolveURL))
   }
 
   // handle global import on each file
   if (stylusOpts.import) {
     if (Array.isArray(stylusOpts.import)) {
       stylusOpts.import.forEach(fileUrl => {
         ref.import(fileUrl)
       })
     } else {
       ref.import(stylusOpts.import)
     }
   }
 
   return ref.render()
 }
 
 function vStylusPlugins(stylusOptions = {}) {
   const plugins = []
 
   // TODO: global imported file content like minix(), maybe not hot reload
   plugins.push({
     name: 'plugin:vStylus',
     enforce: 'pre',
     transform(src, id) {
       // console.log('fileid', id)
       if (id.includes(`&lang.stylus`) || id.includes(`&lang.styl`) || stylFileRegex.test(id)) {
         stylusOptions.debug && console.log('[stylus file transform]', id)
 
         return {
           code: transStylus(src, stylusOptions, path.dirname(id) + '/'),
           map: null
         }
       }
     }
   })
 
   return plugins
 }
 
 module.exports = { vStylusPlugins }
 