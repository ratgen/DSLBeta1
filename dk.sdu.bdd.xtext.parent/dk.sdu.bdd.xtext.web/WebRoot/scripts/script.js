

function readFile() {
  let input = document.getElementById('file-input')
  let file = input.files[0]
  let reader = new FileReader()
  reader.readAsText(file, 'UTF-8')
  reader.onload = () => {
    var fileContent = reader.result
    
    if (d !== null || d !== undefined) {


      d.setValue(fileContent)
      let fileName = document.getElementById('fileName');
      fileName.value = file.name
      localStorage.setItem("fileName", file.name)
    }
  }
}

window.onload = () => {
  setTimeout(() => {  
    for (let editor of editors) {
      d = editor.env.document.doc
      getSavedDocument(editors)
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
function onDocumentChange() {
  let fileContent = d.getValue()
  localStorage.setItem("fileContent", fileContent)
}

function getSavedDocument() {
  let fileContent = localStorage.getItem("fileContent");
  if (fileContent !== null) {
    d.insert({row: 0, column: 0}, fileContent)
  }
  let fileName = localStorage.getItem("fileName")
  if (fileContent !== null) {
    let fileNameElement = document.getElementById('fileName');
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
