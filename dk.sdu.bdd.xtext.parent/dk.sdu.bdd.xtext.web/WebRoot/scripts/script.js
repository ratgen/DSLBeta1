function readFile() {
	let input = document.getElementById('file-input')
	let file = input.files[0]
	let reader = new FileReader()
	reader.readAsText(file, 'UTF-8')
	reader.onload = () => {
		var fileContent = reader.result
		let editor = getCurrentAceEditor()
		let doc = editor.env.document.doc
		if (doc !== null || doc !== undefined) {
			doc.setValue(fileContent)
			let fileName = document.getElementById('fileName');
			fileName.value = file.name
			localStorage.setItem("fileName", file.name)
		}
	}
}

function printChildren(a) {
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
		doc.insert({ row: 0, column: 0 }, fileContent)
	}
	let fileName = localStorage.getItem(editorId + "fileName")
	if (fileContent !== null) {
		let fileNameElement = document.getElementById(editorId + 'fileName');
		if (fileNameElement !== null)
			fileNameElement.value = fileName
	}
}

let entities = document.getElementById('xtext-editor-entities')
let entitiesTab = document.getElementById('entity-tab')
let entitiesBlock = document.getElementById('blockly-editor')
let scenario = document.getElementById('xtext-editor-scenarios')
let scenarioTab = document.getElementById('scenario-tab')
let scenarioBlock = document.getElementById('blockly-editor2')
let warningMessage = document.getElementById('warning-message')
let originalToolbox;
let entitiesToolboxInjected = false;
let scenarioToolboxInjected = false;
let scenarioWorkspace;
let entityWorkspace;
let blockArray;

const runCodeForEntity = (element) => {
	if (entitiesToolboxInjected && element === entitiesTab)
	{
		const entityCode = getBddGenerator(blockArray).workspaceToCode(entityWorkspace);
		// console.log(entityCode);

		let editor = getCurrentAceEditor()
		let doc = editor.env.document.doc
		if (doc !== null || doc !== undefined) {
			doc.setValue(entityCode.replace(/^\s*$\n?/gm, '').replace(/ +/g, ' ')); // removes blank lines & multiple spaces
		}
	}	
};

const runCodeForScenario = (element) => {
	if (scenarioToolboxInjected && element === scenarioTab)
	{
		const scenarioCode = getBddGenerator(blockArray).workspaceToCode(scenarioWorkspace);
		// console.log(scenarioCode);
		
		let editor = getCurrentAceEditor()
		let doc = editor.env.document.doc
		if (doc !== null || doc !== undefined) {
			doc.setValue(scenarioCode.replace(/^\s*$\n?/gm, '').replace(/ +/g, ' ')); // removes blank lines & multiple spaces	
		}
	}	
};

function displayEditor(currentEditor, newEditor, currentBlockly, newBlockly) {
	currentEditor.style.display = "none"
	currentBlockly.style.display = "none"
	newEditor.style.display = "block"
	newBlockly.style.display = "block"
}

function switchEditor(e) {
	if (e.target.disabled)
		return;

	var b = ""
	if (e.target != currentTab) {
		removeSelectionBorder(currentTab)
		let editorId = e.target.dataset.editorId

		if (editorId == "xtext-editor-entities") { b = "blockly-editor" }
		else if (editorId == "xtext-editor-scenarios") { b = "blockly-editor2" }

		let editor = document.getElementById(editorId)
		let blockly = document.getElementById(b)
		displayEditor(currentEditor, editor, currentBlockly, blockly)
		currentEditor = editor
		currentTab = e.target
		currentBlockly = blockly
		setSelectionBorder(currentTab)
    	loadBlocks(currentTab, true);
	}
}

function onEntityEditorChange() {
	if (entities.innerText != null && entities.innerText.replace(/[^a-zA-Z]/g, '').trim() !== '') {
		setEnabled(scenarioTab);
		enabledByText = true;
	}
	else if (!enabledByCodeBlocks) {
		setDisabled(scenarioTab);
		enabledByText = false;
	}
}

function setSelectionBorder(element) {
	element.style.border = "2px black solid";
}

function removeSelectionBorder(element) {
	element.style.border = "2px white solid"
}

function setDisabled(element) {
	element.style.backgroundColor = "#f2f2f2";
	element.style.pointerEvents = "none";
	element.disabled = true;
	warningMessage.style.visibility = "visible";
}

function setEnabled(element) {
	element.style.backgroundColor = "#ddd";
	element.style.pointerEvents = "auto";
	element.disabled = false;
	warningMessage.style.visibility = "hidden";
}

if (entitiesTab != undefined)
	entitiesTab.onclick = switchEditor
if (scenarioTab != undefined)
	scenarioTab.onclick = switchEditor

currentEditor = entities
currentTab = entitiesTab
currentBlockly = entitiesBlock

enabledByText = false
enabledByCodeBlocks = false

setEnabled(entitiesTab);
setSelectionBorder(entitiesTab);

window.onload = () => {
  setTimeout (() => {
    for (let editor of editors) {
      getSavedDocument(editor)
      let document = editor.env.document.doc
      document.on('change', onDocumentChange)
    }
    let input = document.getElementById('file-input')
    input.addEventListener('change', readFile) 

    loadBlocks(currentTab, false)
  }, 200)
}

let astBtn = document.getElementById('get-ast')
astBtn.onclick = () => {
	fetch('/xtext-service/ast?resource=multi-resource/scenarios.bdd')
		.then(response => response.json())
		.then(response => {
			// console.log(response)
		})
}

function loadBlocks(element, skipAddingBlocks) {
	fetch('/xtext-service/blocks?resource=multi-resource/scenarios.bdd')
		.then(response => response.json())
		.then(response => {
			// console.log(response)
			response.blocks = JSON.parse(response.blocks)
			response.toolBox = JSON.parse(response.toolBox)
			blockArray = response.blocks

      		if (!skipAddingBlocks)
			  Blockly.defineBlocksWithJsonArray(response.blocks)

			let id_validator = function(newValue) {
				//if it returns '', then the input is correct
				let res = newValue.replace(/[\^a-zA-Z_][a-zA-Z_0-9]*/g, '')

				if (res == '') {
					return undefined;
				}
				return null;
			}

			Blockly.Blocks["ID"] = {
				init: function() {
					this.setColour(200)
					this.setOutput(true, 'ID')
					this.appendDummyInput()
						.appendField(new Blockly.FieldTextInput('ID', id_validator), 'TEXT_INPUT');

				}
			}

			let string_validator = function(newValue) {

				let res = newValue.replace(/[^\"]*/g, '')
				if (res == '') {
					return undefined;
				}
				return null;
			}


			Blockly.Blocks["STRING"] = {
				init: function() {
					this.setColour(300)
					this.setOutput(true, 'STRING')
					this.appendDummyInput()
						.appendField("\"")
						.appendField(new Blockly.FieldTextInput('String', string_validator), 'TEXT_INPUT')
						.appendField("\"");
				}
			}

			let termArr = []
			termArr.push({ "kind": "block", "type": "ID" })
			termArr.push({ "kind": "block", "type": "STRING" })

			response.toolBox.contents.push({ "kind": "category", "name": "Terminals", contents: termArr })

      		originalToolbox = response.toolBox;
			response.toolBox.contents = filterCategories(element, originalToolbox.contents);

			if (element === scenarioTab && !scenarioToolboxInjected)
			{
				scenarioWorkspace = Blockly.inject("blockly-editor2", { "toolbox": response.toolBox });
				scenarioToolboxInjected = true;
			}

			if (element === entitiesTab && !entitiesToolboxInjected)
			{
					entityWorkspace = Blockly.inject("blockly-editor", { "toolbox": response.toolBox });
				entitiesToolboxInjected = true;
			}

			// console.log(response)

			if (entities != undefined) {
				entities.addEventListener("input", onEntityEditorChange);
			}

			function onClick(event) {
				if (scenarioWorkspace != undefined)
					Blockly.svgResize(scenarioWorkspace);
				
				if (entityWorkspace != undefined)
					Blockly.svgResize(entityWorkspace);
			}

			function onchange(event) {
				// console.log(event);

				let entityBlockArray = [];
				let scenarioBlockArray = [];

				if (entityWorkspace != undefined)
				{
					entityBlockArray = entityWorkspace.getAllBlocks();
				}

				if (scenarioWorkspace != undefined)
				{
					scenarioBlockArray = scenarioWorkspace.getAllBlocks();
				}

				let entityTab = editors[0].env.document.doc;
				let scenarioTab = editors[1].env.document.doc;

				scenarioArray = []
				entityArray = []

				// do not remove all lines
				//scenarioTab.removeFullLines(0, scenarioTab.getLength());
				//entityTab.removeFullLines(0, entityTab.getLength());

				entityBlockArray.forEach((block) => {
					if (block.type == "modelblock") {
						scenarioArray = addBlocksToArray(block.getDescendants());
					}
				})

				scenarioBlockArray.forEach((block) => {
					if (block.type == "modelUsingBlock") {
						entityArray = addBlocksToArray(block.getDescendants());
					}
				})

				scenarioTab.insertFullLines(0, scenarioArray);
				entityTab.insertFullLines(0, entityArray);

				if (scenarioWorkspace != undefined)
					Blockly.svgResize(scenarioWorkspace);
          
				if (entityWorkspace != undefined)
					Blockly.svgResize(entityWorkspace);

				var scenarioTabElement = document.getElementById('scenario-tab')

				if (entityWorkspace.getAllBlocks().length > 0) {
					setEnabled(scenarioTabElement);
					enabledByCodeBlocks = true;
				}
				else if (!enabledByText) {
					setDisabled(scenarioTabElement);
					enabledByCodeBlocks = false;
				}

				runCodeForEntity(element);
				runCodeForScenario(element);
			}

			if (!skipAddingBlocks || element === entitiesTab)
			{
				document.getElementById('blockly-editor2').style.display = "none"
			}
			else 
			{
				document.getElementById('blockly-editor').style.display = "none"
			}

      		if (entityWorkspace != undefined)
			  entityWorkspace.addChangeListener(onchange);

      		if (scenarioWorkspace != undefined)
			  scenarioWorkspace.addChangeListener(onchange);

			window.addEventListener('click', onClick, false);

			onchange();
			//console.log(response)
			onEntityEditorChange();
		})
}

function filterCategories(element, contents) {
	if (element === entitiesTab) {
		let categories = ["Scenario Definitions", "Imperative Scenarios"];
		return contents.filter(item => !categories.includes(item.name));
	}
	else if (element === scenarioTab) {
		let categories = ["Declarative Entities and Definitions", "Imperative Entities and Definitions"];
		return contents.filter(item => !categories.includes(item.name));
	}
}
