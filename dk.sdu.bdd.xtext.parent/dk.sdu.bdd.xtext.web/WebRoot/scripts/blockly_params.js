Blockly.defineBlocksWithJsonArray([
  {
    "type": "modelblock",
    "message0": "Model %1",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME"
      }
    ],
    "inputsInline": true,
    "nextStatement": "model",
    "colour": 0,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "entityblock",
    "message0": "Entity %1",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME"
      }
    ],
    "inputsInline": true,
    "previousStatement": ["model", "entity"],
    "nextStatement": "entity",
    "colour": 45,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "entityactionsblock",
    "message0": "actions %1 %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "NAME",
        "check": "text2"
      }
    ],
    "previousStatement": "entity",
    "nextStatement": ["entity", "action"],
    "colour": 90,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "entitystatesblock",
    "message0": "states %1 %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "NAME"
      }
    ],
    "previousStatement": ["entity", "action"],
    "nextStatement": ["entity", "state"],
    "colour": 135,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "entitypropertiesblock",
    "message0": "properties %1 %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "NAME"
      }
    ],
    "previousStatement": ["entity", "action", "state"],
    "nextStatement": ["entity", "property"],
    "colour": 180,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "scenarioblock",
    "message0": "Scenario %1",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME"
      }
    ],
    "inputsInline": true,
    "previousStatement": "entity",
    "nextStatement": "given",
    "colour": 0,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "givenblock",
    "message0": "Given %1",
    "args0": [
      {
        "type": "input_value",
        "name": "giveninput"
      }
    ],
    "inputsInline": true,
    "previousStatement": "given",
    "nextStatement": ["whichmean", "when"],
    "colour": 45,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "whenblock",
    "message0": "When %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "whenScen",
        "options": [
          [
            "I",
            "INAME"
          ],
          [
            "the",
            "THENAME"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "wheninput"
      }
    ],
    "inputsInline": true,
    "previousStatement": "when",
    "nextStatement": ["then", "whichmean"],
    "colour": 90,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "thenblock",
    "message0": "Then %1",
    "args0": [
      {
        "type": "input_value",
        "name": "theninput"
      }
    ],
    "inputsInline": true,
    "previousStatement": "then",
    "nextStatement": "whichmean",
    "colour": 135,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "whichmeansblock",
    "message0": "Which means %1 %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "NAME",
        "check": "given"
      }
    ],
    "inputsInline": true,
    "previousStatement": "whichmean",
    "nextStatement": ["when", "then"],
    "colour": 345,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "textblock",
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
      }
    ],
    "output": "String",
    "style": "text_blocks",
  },
  {
    "type": "textblock",
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
      }
    ],
    "output": "String",
    "style": "text_blocks",
  },
  {
    "type": "textblock2",
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
      }
    ],
    "previousStatement": "text2",
    "nextStatement": "text2",
    "colour": 345,
  }
]);


var toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Model",
      "contents":[
        {
          "kind": "block",
          "type": "modelblock"
        }
      ]	
    },
    {
      "kind": "category",
      "name": "Entity",
      "contents":[
        {
          "kind": "block",
          "type": "entityblock"
        },
        {
          "kind": "block",
          "type": "entityactionsblock"
        },
        {
          "kind": "block",
          "type": "entitystatesblock"
        },
        {
          "kind": "block",
          "type": "entitypropertiesblock"
        },
      ]	
    },
    {
      "kind": "category",
      "name": "Bdd blocks",
      "contents": [
        {
          "kind": "block",
          "type": "scenarioblock"
        },
        {
          "kind": "block",
          "type": "givenblock"
        },
        {
          "kind": "block",
          "type": "whenblock"
        },
        {
          "kind": "block",
          "type": "thenblock"
        },
        {
          "kind": "block",
          "type": "whichmeansblock"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Text blocks",
      "contents": [
        {
          "kind": "block",
          "type": "textblock"
        },
        {
          "kind": "block",
          "type": "textblock2"
        }
      ]
    }
  ]
}

var workspace = Blockly.inject('blockly-editor', {toolbox: toolbox});

let d;

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
    d = editor.env.document.doc
    getSavedDocument()
    d.on('change', onDocumentChange)
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


function onchange(event){
  if (event === undefined)
    return 
  console.log(event)
  if (event.type == "click")  {
    let blockArray = workspace.getAllBlocks();
    let typeArray = [];
    //d.removeFullLines(0, d.getLength());

    blockArray.forEach((element) => {
      console.log(element.type);
      switch (element.type){
        case "modelblock":
          typeArray.push("model " + printChildren(element.getChildren()));
          break;

        case "entityblock":
          typeArray.push("entity " + printChildren(element.getChildren()));
          break;

          /*case "textblock":
          typeArray.push(element.getFieldValue("TEXT"));
          break;
          */	
        default:
          console.log("No blocks found");
      }
    });
    d.insertFullLines(0, typeArray);
  }
}

let entities = document.getElementById('xtext-editor-entities')
let entitiesTab = document.getElementById('entity-tab')
let scenario = document.getElementById('xtext-editor-scenarios')
let scenarioTab = document.getElementById('scenario-tab')

let currentEditor;
function displayEditor(element) {
  currentEditor.style.display = "none"
  currentEditor = element
  currentEditor.style.display = "block"
}

function switchEditor() {
  let entities = document.getElementById('xtext-editor-entities')
  let entitiesTab = document.getElementById('entity-tab')
  let scenario = document.getElementById('xtext-editor-scenarios')
  let scenarioTab = document.getElementById('scenario-tab')

  if (currentEditor == entities) {
    removeSelectionBorder(entitiesTab)
    displayEditor(scenario)
    setSelectionBorder(scenarioTab)
  }
  else {
    removeSelectionBorder(scenarioTab)
    displayEditor(entities)
    setSelectionBorder(entitiesTab)
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
currentEditor = entities;
setSelectionBorder(entitiesTab)


workspace.addChangeListener(onchange);

onchange();

