function readFile() {
  let input = document.getElementById('file-input')
  let file = input.files[0]
  let reader = new FileReader()
  reader.readAsText(file, 'UTF-8')
  reader.onload = () => {
    var fileContent = reader.result
    let editor = getCurrentAceEditor()
    let doc= editor.env.document.doc
    if (doc!== null || doc!== undefined) {
      doc.setValue(fileContent)
      let fileName = document.getElementById('fileName');
      fileName.value = file.name
      localStorage.setItem("fileName", file.name)
    }
  }
}

function printChildren(a){
  let s = "";
  a.forEach((element) => {
    s = s + element.getFieldValue("TEXT");
  })
  return s;
}
function onDocumentChange() {
  let editor = getCurrentAceEditor()
  let document = editor.env.document.doc
  let fileContent = document.getValue()
  localStorage.setItem(editor.container.id + "fileContent", fileContent)
}

function getSavedDocument(editor) {
  let doc = editor.env.document.doc
  let editorId = editor.container.id
  let fileContent = localStorage.getItem(editorId + "fileContent");
  if (fileContent !== null) {
    doc.insert({row: 0, column: 0}, fileContent)
  }
  let fileName = localStorage.getItem(editorId + "fileName")
  if (fileContent !== null) {
    let fileNameElement = document.getElementById(editorId + 'fileName');
    if (fileNameElement !== null )
      fileNameElement.value = fileName
  }
}

let entities = document.getElementById('xtext-editor-entities')
let entitiesTab = document.getElementById('entity-tab')
let entitiesBlock = document.getElementById('blockly-editor')
let scenario = document.getElementById('xtext-editor-scenarios')
let scenarioTab = document.getElementById('scenario-tab')
let scenarioBlock = document.getElementById('blockly-editor2')

function displayEditor(currentEditor, newEditor, currentBlockly, newBlockly) {
  currentEditor.style.display = "none"
  currentBlockly.style.display = "none"
  newEditor.style.display = "block"
  newBlockly.style.display = "block"
}

function switchEditor(e) {
  var b = ""
  if (e.target != currentTab ) {
    removeSelectionBorder(currentTab)
    let editorId = e.target.dataset.editorId

    if (editorId == "xtext-editor-entities") {b = "blockly-editor"}
    else if (editorId == "xtext-editor-scenarios") {b = "blockly-editor2"}

    let editor = document.getElementById(editorId)
    let blockly = document.getElementById(b)
    displayEditor(currentEditor, editor, currentBlockly, blockly)
    currentEditor = editor
    currentTab = e.target
    currentBlockly = blockly
    setSelectionBorder(currentTab)
  }
}

function setSelectionBorder(element) {
  element.style.border = "2px black solid";
}

function removeSelectionBorder(element) {
  element.style.border = "2px white solid"
}

if (entitiesTab != undefined)
  entitiesTab.onclick = switchEditor
if (scenarioTab != undefined)
  scenarioTab.onclick = switchEditor


currentEditor = entities
currentTab = entitiesTab
currentBlockly = entitiesBlock

setSelectionBorder(entitiesTab)

window.onload = () => {
  setTimeout (() => {
  for (let editor of editors) {
    getSavedDocument(editor)
    let document = editor.env.document.doc
    document.on('change', onDocumentChange)
  }
  let input = document.getElementById('file-input')
  input.addEventListener('change', readFile) 

  fetch('/xtext-service/blocks?resource=multi-resource/scenarios.bdd')
    .then(response => response.json())
    .then(response => {
      console.log(response)
      response.blocks = JSON.parse(response.blocks)
      response.toolBox = JSON.parse(response.toolBox)
      Blockly.defineBlocksWithJsonArray(response.blocks)


      let id_validator = function(newValue) {
        //if it returns '', then the input is correct
        let res = newValue.replace(/[\^a-zA-Z_][a-zA-Z_0-9]*/g, '')

        if (res == ''){ 
          return undefined;
        }
        return null;
      }

      Blockly.Blocks["ID"] = {
        init: function() {
          this.setOutput(true, 'ID')
          this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('ID', id_validator));

        }
      }

      let string_validator = function(newValue) {
        
        let res = newValue.replace(/[^\"]*/g, '')
        if (res == ''){ 
          return undefined;
        }
        return null;
      }


      Blockly.Blocks["STRING"] = {
        init: function() {
          this.setOutput(true, 'STRING')
          this.appendDummyInput()
            .appendField("\"")
            .appendField(new Blockly.FieldTextInput('String', string_validator))
            .appendField("\"");
        }
      }

      let termArr = []
      termArr.push({"kind" : "block", "type" : "ID"})
      termArr.push({"kind" : "block", "type" : "STRING"})

      response.toolBox.contents.push({"kind" : "category", "name" : "Terminals", contents: termArr})


      scenarioWorkspace = Blockly.inject("blockly-editor2", {"toolbox": response.toolBox});
      entityWorkspace = Blockly.inject("blockly-editor", {"toolbox": response.toolBox});
      console.log(response)

      function onClick(event) {
        Blockly.svgResize(scenarioWorkspace);
        Blockly.svgResize(entityWorkspace);
      }

      function onchange(event){
        console.log(event)
        let entityBlockArray = entityWorkspace.getAllBlocks();
        let scenarioBlockArray = scenarioWorkspace.getAllBlocks();

        let entityTab = editors[0].env.document.doc;
        let scenarioTab = editors[1].env.document.doc;

        scenarioArray = []
        entityArray = []

        // do not remove all lines
        //scenarioTab.removeFullLines(0, scenarioTab.getLength());
        //entityTab.removeFullLines(0, entityTab.getLength());

        entityBlockArray.forEach((block) => {
          if (block.type == "modelblock"){
            scenarioArray = addBlocksToArray(block.getDescendants());
          }
        })

        scenarioBlockArray.forEach((block) => {
          if (block.type == "modelUsingBlock"){
            entityArray = addBlocksToArray(block.getDescendants());
          }
        })

        scenarioTab.insertFullLines(0, scenarioArray);
        entityTab.insertFullLines(0, entityArray);

        Blockly.svgResize(scenarioWorkspace);
        Blockly.svgResize(entityWorkspace);
      }

      document.getElementById('blockly-editor2').style.display = "none"

      entityWorkspace.addChangeListener(onchange);
      scenarioWorkspace.addChangeListener(onchange);

      window.addEventListener('click', onClick, false);

      onchange();
      console.log(response)
    })
  }, 200)
}

let astBtn = document.getElementById('get-ast')
astBtn.onclick = () => {
  fetch('/xtext-service/ast?resource=multi-resource/scenarios.bdd')
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
}
