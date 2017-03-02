/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Alan Zhang @zcfan

  This plugin is only for insert some ejs template snippets which required to dynamiclly change api server address
  using server side environment variable
*/

function InjectApiSnippet(options) {
  // Nothing to configure
}

InjectApiSnippet.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      // the html-webpack-plugin has done its job,
      // insert ejs template for server use now.
      var titleIndex = htmlPluginData.html.search('</title>') + '</title>'.length
      var ejsTemplates = '<% if (apiServerAddr) { %><script>var apiServerAddr="<%=apiServerAddr%>"</script><% } %>'
      htmlPluginData.html = [htmlPluginData.html.slice(0, titleIndex), ejsTemplates, htmlPluginData.html.slice(titleIndex)].join('')
      callback(null, htmlPluginData);
    });
  });
};

module.exports = InjectApiSnippet;
