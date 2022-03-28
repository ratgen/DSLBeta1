var baseUrl = window.location.pathname;
var fileIndex = baseUrl.indexOf("index.html");
if (fileIndex > 0)
  baseUrl = baseUrl.slice(0, fileIndex);
require.config({
  baseUrl: baseUrl,
  paths: {
    "jquery": "webjars/jquery/3.5.1/jquery.min",
    "ace/ext/language_tools": "webjars/ace/1.3.3/src/ext-language_tools",
    "xtext/xtext-ace": "xtext/2.25.0/xtext-ace"
  }
});
let editor;
require(["webjars/ace/1.3.3/src/ace"], function() {
  require(["xtext/xtext-ace"], function(xtext) {
    editor = xtext.createEditor({
      baseUrl: baseUrl,
      syntaxDefinition: "xtext-resources/generated/mode-bdd"
    });
  });
});
