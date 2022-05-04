Blockly.defineBlocksWithJsonArray([
    	{
			  "type": "entityref",
			  "message0": "%1",
			  "args0": [
	          {
	          "type": "field_input",
	          "name": "ENTITY",
	          }
	          ],
			  "output": "String",
			  "colour": 0,
        	  "extensions": ["not_editable_extension"]
			},
			{
			  "type": "entityChildrenref",
			  "message0": "%1",
			  "args0": [
	          {
	          "type": "field_input",
	          "name": "ENTITY",
	          }
	          ],
			  "output": "String",
			  "colour": 0,
        	  "extensions": ["not_editable_extension"]
			},
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
		  "tooltip": "model ",
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
		  "previousStatement": ["model", "entity", "property"],
		  "nextStatement": "entity",
		  "colour": 45,
		  "tooltip": "entity ",
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
		  "tooltip": "actions: ",
		  "helpUrl": "entityThings"
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
		      "name": "NAME",
		      "check": "text2"
		    }
		  ],
		  "previousStatement": ["entity", "action"],
		  "nextStatement": ["entity", "state"],
		  "colour": 135,
		  "tooltip": "states: ",
		  "helpUrl": "entityThings"
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
		      "name": "NAME",
		      "check": "text2"
		    }
		  ],
		  "previousStatement": ["entity", "action", "state"],
		  "nextStatement": "property",
		  "colour": 180,
		  "tooltip": "properties: ",
		  "helpUrl": "entityThings"
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
        "nextStatement": "given",
        "colour": 0,
        "tooltip": "Scenario: ",
        "helpUrl": ""
      },
      {
        "type": "givenEntityblock",
        "message0": "Given the %1 %2 %3 not %4 %5",
        "args0": [
          {
            "type": "input_value",
            "name": "entityinput"
          },
          {
          "type": "field_input",
          "name": "TEXT",
          "text": "name",
        },
        {
	      "type": "field_dropdown",
	      "name": "FIELDNAME",
	      "options": [
	        [ "is", "is" ],
	        [ "are", "are" ]
	      ]
        },
        {
	      "type": "field_checkbox",
	      "name": "not",
	      "checked": false
	    },
	    {
            "type": "input_value",
            "name": "entitystate"
          },
        ],
        "inputsInline": true,
        "previousStatement": "given",
        "nextStatement": ["whichmean", "when"],
        "colour": 45,
        "tooltip": "Given the ",
        "helpUrl": ""
      },
      {
        "type": "givenEntityPropertyblock",
        "message0": "Given the %1 %2",
        "args0": [
          {
            "type": "input_value",
            "name": "entitypropertyinput"
          },
          {
          "type": "field_input",
          "name": "TEXT",
          "text": "name",
        }
        ],
        "inputsInline": true,
        "previousStatement": "given",
        "nextStatement": ["whichmean", "when"],
        "colour": 45,
        "tooltip": "Given the ",
        "helpUrl": ""
      },
      {
        "type": "whenblock",
        "message0": "When I %1",
        "args0": [
          {
            "type": "input_value",
            "name": "giveninput"
          }
        ],
        "inputsInline": true,
        "previousStatement": "when",
        "nextStatement": ["then", "whichmean"],
        "colour": 90,
        "tooltip": "When I ",
        "helpUrl": ""
      },
      {
        "type": "thenblock",
        "message0": "Then the%1",
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
        "tooltip": "Then the ",
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
        "tooltip": "which means",
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
        "type": "textblock2",
        "message0": "%1",
        "args0": [
          {
          "type": "field_input",
          "name": "TEXT2",
        }
      ],
        "previousStatement": "text2",
        "nextStatement": "text2",
        "colour": 345,
      },
      {
	    "type": "specialblock",
	    "message0": "%1 %2 %3",
	    "args0": [
	      {
	        "type": "input_dummy",
      		"name": "ENTITIES"
	      },
      	{
	      "type": "field_dropdown",
	      "name": "FIELDNAME",
	      "options": [
	        [ "is", "is" ],
	        [ "are", "are" ]
	      ]
      },
      {
        "type": "input_dummy",
      	"name": "ENTITYSTATES"
      },
    ],
    "inputsInline": true,
    "previousstatement": "special",
    "nextstatement": "special",
    "style": "text_blocks",
    "output": "String",
    "helpUrl": "something"
  },
  ]);
 

var modelToolbox = {
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

var bddToolbox = {
  "kind": "categoryToolbox",
  "contents": [
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
          "type": "givenEntityblock"
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
        }
      ]
    },
     {
	  "kind": "category",
	  "name": "Entities",
	  "custom": "getEntities"
	}
  ]
}

var modelWorkspace = Blockly.inject("blockly-editor", {toolbox: modelToolbox});

var bddWorkspace = Blockly.inject("blockly-editor2", {toolbox: bddToolbox});

bddWorkspace.registerToolboxCategoryCallback(
    "getEntities", coloursFlyoutCallback);

function getText(a){
	let s = ""
	a.forEach((element) => {
	if (element.type == "textblock"){
		s = s + element.getFieldValue("TEXT") + " ";
	} else if (element.type == "entityref"){
		s = s + element.getFieldValue("ENTITY") + " ";
	}
	})
	return s;
}

function getText2(a){
	let s = ""
	a.forEach((element) => {
	if (element.type == "textblock"){
		s = element.getFieldValue("TEXT2");
	} else if (element.type == "entityref"){
		s = element.getFieldValue("ENTITY");
	}
	})
	return s;
}

function printNestedChildren(a, e){
	let s = "";
	a.forEach((element) => {
	if (element.getFieldValue("TEXT2") != null && element.getSurroundParent().id == e.id) {
		if (element.getFieldValue("TEXT2") == a[a.length-1].getFieldValue("TEXT2")) {
			s = s + element.getFieldValue("TEXT2");
		} else {
			s = s + element.getFieldValue("TEXT2") + ", ";
		}
	}
	})
	return s;
}

function addNestedBlocks(a, e){
	a.forEach((element) => {
		if (element.getSurroundParent() != null && element.getSurroundParent().id == e.id) {
			typeArray.push("      " + element.getTooltip() + getText(element.getChildren()));
	}
	})
}

function createString(e){
	var s = ""
	var i = 0

	if (e.getChildren().length > 1){
		s1 = e.getChildren()[i].getFieldValue("ENTITY") + ""
		i++
		s2 = e.getChildren()[i].getFieldValue("ENTITY") + " "
		
		s = s + s1
		s = s + "\"" + e.getFieldValue("TEXT") + "\"" + " "
		s = s + e.getFieldValue("FIELDNAME") + " "
		i++
		if (e.getFieldValue("not") == "TRUE"){
			console.log(e.getFieldValue("not"))
			s = s + "not" + " "
		}
		s = s + s2
	}
	
	return s
}

function addBlocksToArray(a){
	var i = 0;
	a.forEach((element) => {
			if (element.type == "entityactionsblock") {
				typeArray.push("{");
				typeArray.push(element.getTooltip() + printNestedChildren(element.getDescendants(), element));
			} else if (element.type == "entitystatesblock"){
				typeArray.push(element.getTooltip() + printNestedChildren(element.getDescendants(), element));
			} else if (element.type == "entitypropertiesblock"){
				typeArray.push(element.getTooltip() + printNestedChildren(element.getDescendants(), element));
				typeArray.push("}");
				typeArray.push("");
			} else if (element.type == "whichmeansblock") {
				typeArray.push(element.getTooltip());
				addNestedBlocks(element.getDescendants().slice(1), element);
			} else if (element.getSurroundParent() == null){
				if (element.type == "givenEntityblock"){
					typeArray.push(element.getTooltip() + createString(element))
					console.log("test")
				} else {
				typeArray.push(element.getTooltip() + getText(element.getChildren()));
				console.log(element.getChildren())
				}
			}
	})
}

function findEntity(a){
	let entities = [["entity", "entity"]];
	a.forEach((element) => {
		if (element.type == "entityblock"){
			entities.push([getText(element.getChildren()), getText(element.getChildren())]);
		}
	})
	return entities;
}

function findStates(a, parentEntity){
	let states = [["entitystate", "entitystate"]];
	
	a.forEach((element) => {
		if (getText(element.getChildren()) == parentEntity){
			let b = element.getDescendants();
			
			b.forEach((element) => {
				if (element.getSurroundParent().type == "entitystatesblock"){
					states.push(element.getFieldValue("TEXT2"), element.getFieldValue("TEXT2"));
				}
			})
		}
	})
	return states;
}

/*
  function special(block) {
	console.log("123")
	
	bDEntities = new Blockly.FieldDropdown(findEntity(modelWorkspace.getAllBlocks()), "bde")
	
	if (block.getInput("ENTITIES").fieldRow.length != 0) {
		block.getInput("ENTITIES").removeField("entities")
	}
	
	block.getInput("ENTITIES").appendField(bDEntities, "entities")
  };
*/

Blockly.Extensions.register("not_editable_extension",
  function() {
    this.setEditable(false);
  });

function coloursFlyoutCallback() {
	var a = modelWorkspace.getAllBlocks()
	var blockList = [];
	a.forEach((element) => {
		if (element.type == "entityblock"){
			blockList.push({  
		      "kind": "block",
		      "type": "entityref",
		      "fields": {
		        "ENTITY": getText(element.getChildren())
		      }
			});
			var b = element.getDescendants()
			
			b.forEach((element2) => {
				if (element2.type == "entityblock"){
					console.log("breaking")
					return;
				} else if (element2.type == "textblock2"){
					blockList.push({  
				      "kind": "block",
				      "type": "entityChildrenref",
				      "fields": {
				        "ENTITY": element2.getFieldValue("TEXT2")
				      }
					});
				}
			})
		}
	})
	  return blockList;
};

function onchange(event){	
	let modelBlockArray = modelWorkspace.getAllBlocks();
	let bddBlockArray = bddWorkspace.getAllBlocks();
	
	let d = editors[0].env.document.doc;
	
	typeArray = [];
	
	d.removeFullLines(0, d.getLength());
	
	modelBlockArray.forEach((block) => {
		if (block.type == "modelblock"){
			addBlocksToArray(block.getDescendants());
			}
	})
	
	bddBlockArray.forEach((block) => {
		if (block.type == "scenarioblock"){
			addBlocksToArray(block.getDescendants());
		} /*else if(block.type == "specialblock"){
			special(block)
		}*/
	})
	
	d.insertFullLines(0, typeArray);
}

modelWorkspace.addChangeListener(onchange);
bddWorkspace.addChangeListener(onchange);

onchange();