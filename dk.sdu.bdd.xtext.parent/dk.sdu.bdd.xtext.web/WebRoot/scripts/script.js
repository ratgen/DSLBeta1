function readFile() {
  let input = document.getElementById('file-input')
  let file = input.files[0]
  let reader = new FileReader()
  reader.readAsText(file, 'UTF-8')
  reader.onload = () => {
    var fileContent = reader.result
    let editor = getCurrentAceEditor()
    let document  = editor.env.document.doc
    if (document !== null || document !== undefined) {
      document.setValue(fileContent)
      let fileName = document.getElementById('fileName');
      fileName.value = file.name
      localStorage.setItem("fileName", file.name)
    }
  }
}

window.onload = () => {
  setTimeout(() => {  
    for (let editor of editors) {
      getSavedDocument(editor)
      d.on('change', onDocumentChange)
    }
    let input = document.getElementById('file-input')
    input.addEventListener('change', readFile) 
  }, 200);
}

function printChildren(a){
  let s = "";
  a.forEach((element) => {
    s = s + element.getFieldValue("TEXT");
  })
  return s;
}
function onDocumentChange(editor) {
  console.log(editor)
  let editorId = currentTab.dataset.editorId
  let fileContent = d.getValue()
  localStorage.setItem(editorId + "fileContent", fileContent)
}

function getSavedDocument(editor) {
  console.log("getting: " + currentTab.dataset.editorId)
  let editorId = currentTab.dataset.editorId
  let fileContent = localStorage.getItem(editorId + "fileContent");
  if (fileContent !== null) {
    d.insert({row: 0, column: 0}, fileContent)
  }
  let fileName = localStorage.getItem(editorId + "fileName")
  if (fileContent !== null) {
    let fileNameElement = document.getElementById(editorId + 'fileName');
    fileNameElement.value = fileName
  }
}

let entities = document.getElementById('xtext-editor-entities')
let entitiesTab = document.getElementById('entity-tab')
let scenario = document.getElementById('xtext-editor-scenarios')
let scenarioTab = document.getElementById('scenario-tab')

function displayEditor(currentEditor, newEditor) {
  currentEditor.style.display = "none"
  newEditor.style.display = "block"
}

function switchEditor(e) {
  if (e.target != currentTab ) {
    removeSelectionBorder(currentTab)
    let editorId = e.target.dataset.editorId
    let editor = document.getElementById(editorId)
    displayEditor(currentEditor, editor)
    currentEditor = editor
    currentTab = e.target
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
currentEditor = scenario;
currentTab = scenarioTab
setSelectionBorder(scenarioTab)
