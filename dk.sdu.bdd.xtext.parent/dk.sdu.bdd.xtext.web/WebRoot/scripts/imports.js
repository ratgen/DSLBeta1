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

let editors = []
let currentEditor;
let currentTab;

function getCurrentAceEditor() {
  /*
   * Returns the current editor object based on which container is marked as the
   * current editor.
   */
  for (let editor of editors) {
    if (editor.container == currentEditor) 
      return editor
  }
}

require(["webjars/ace/1.3.3/src/ace"], function() {
  require(["xtext/xtext-ace"], function(xtext) {
    editors[0] = xtext.createEditor({
      baseUrl: baseUrl,
      syntaxDefinition: "xtext-resources/generated/mode-bdd",
      parent: "xtext-editor-scenarios"
    });
    editors[1] = xtext.createEditor({
      baseUrl: baseUrl,
      syntaxDefinition: "xtext-resources/generated/mode-bdd",
      parent: "xtext-editor-entities"
    });
    jQuery('#save-button').bind("click", function(e){
      const a = document.createElement("a")
      let textValue = getCurrentAceEditor().env.document.doc.getValue()
      let blob = new Blob([textValue], {type: 'text/plain'})
      const url = window.URL.createObjectURL(blob) 
      a.href = url
      let fileNameElement = document.getElementById("fileName")
      if (fileNameElement != undefined) {
        console.log("element not undefined")
        console.log("value " + fileNameElement.value)
        if (fileNameElement.value != undefined && fileNameElement.value.length > 0) {
          a.download = fileName.value
        }
        else {
          a.download = "sample.bdd"
        }
      }
      a.click();
      a.remove()
      e.preventDefault();
    });
    
    jQuery('#load-button').bind("click", function(e){
      $('#file-input').trigger('click')
      e.preventDefault();
    });
  })
});

