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
			  "output": "entity",
			  "colour": 0,
        	  "extensions": ["not_editable_extension"]
			},
			{
			  "type": "entityChildrenref",
			  "message0": "%1",
			  "args0": [
	          {
	          "type": "field_input",
	          "name": "ENTITYCHILDREN",
	          }
	          ],
			  "output": "entitychild",
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
		  "nextStatement": ["entity", "entity1"],
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
		  "previousStatement": "entity1",
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
            "name": "NAME",
            "check": "String"
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
            "name": "entityinput",
            "check": "entity"
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
            "name": "entitystate",
            "check": "entitychild"
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
        "message0": "Given the %1 %2 the %3 %4 %5 not %6 %7",
        "args0": [
          {
            "type": "input_value",
            "name": "entitypropertyinput",
            "check": "entitychild"
          },
          {
	      "type": "field_dropdown",
	      "name": "prep",
	      "options": [
	        [ "on", "on" ],
	        [ "from", "from" ],
	        [ "in", "in" ],
	        [ "to", "to" ],
	        [ "into", "into" ],
	        [ "for", "for" ],
	        [ "of", "of" ],
	      ]
         },
         {
            "type": "input_value",
            "name": "entitypropertyinput",
            "check": "entity"
          },
          {
          "type": "field_input",
          "name": "entityname",
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
          "type": "field_input",
          "name": "entitypropertyname",
          "text": "name",
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
        "type": "whenActionBlock",
        "message0": "When I do not %1 %2  %3 the %4 %5",
        "args0": [
		  {
	        "type": "field_checkbox",
	        "name": "not",
	        "checked": false
	      },
          {
            "type": "input_value",
            "name": "whenAction",
            "check": "entitychild"
          },
          {
	      "type": "field_dropdown",
	      "name": "prep",
	      "options": [
			["", ""],
	        [ "on", "on" ],
	        [ "from", "from" ],
	        [ "in", "in" ],
	        [ "to", "to" ],
	        [ "into", "into" ],
	        [ "for", "for" ],
	        [ "of", "of" ],
	      ]
         },
         {
            "type": "input_value",
            "name": "whenAction",
            "check": "entity"
          },
          {
          "type": "field_input",
          "name": "entitypropertyname",
          "text": "name",
        },
        ],
        "inputsInline": true,
        "previousStatement": "when",
        "nextStatement": ["then", "whichmean"],
        "colour": 90,
        "tooltip": "When I ",
        "helpUrl": ""
      },
      {
        "type": "whenMultipleEntitiesBlock",
        "message0": "When I do not %1 %2  %3 the %4 %5 %6 the %7 %8",
        "args0": [
		  {
	        "type": "field_checkbox",
	        "name": "not",
	        "checked": false
	      },
          {
            "type": "input_value",
            "name": "whenAction",
            "check": "entitychild"
          },
          {
	      "type": "field_dropdown",
	      "name": "prep",
	      "options": [
		    ["", ""],
	        [ "on", "on" ],
	        [ "from", "from" ],
	        [ "in", "in" ],
	        [ "to", "to" ],
	        [ "into", "into" ],
	        [ "for", "for" ],
	        [ "of", "of" ],
	      ]
         },
         {
            "type": "input_value",
            "name": "whenAction",
            "check": "entity"
          },
          {
          "type": "field_input",
          "name": "entitypropertyname",
          "text": "name",
        },
        {
	      "type": "field_dropdown",
	      "name": "prep2",
	      "options": [
			["", ""],
	        [ "on", "on" ],
	        [ "from", "from" ],
	        [ "in", "in" ],
	        [ "to", "to" ],
	        [ "into", "into" ],
	        [ "for", "for" ],
	        [ "of", "of" ],
	      ]
         },
         {
            "type": "input_value",
            "name": "whenAction",
            "check": "entity"
          },
         {
          "type": "field_input",
          "name": "entitypropertyname2",
          "text": "name",
        },
        ],
        "inputsInline": true,
        "previousStatement": "when",
        "nextStatement": ["then", "whichmean"],
        "colour": 90,
        "tooltip": "When I ",
        "helpUrl": ""
      },
      {
        "type": "thenEntityblock",
        "message0": "Then the %1 %2 %3 not %4 %5",
        "args0": [
          {
            "type": "input_value",
            "name": "entityinput",
            "check": "entity"
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
            "name": "entitystate",
            "check": "entitychild"
          },
        ],
        "inputsInline": true,
        "previousStatement": "then",
        "nextStatement": "whichmean",
        "colour": 135,
        "tooltip": "Then the ",
        "helpUrl": ""
      },
      {
        "type": "thenEntityPropertyblock",
        "message0": "Then the %1 %2 the %3 %4 %5 not %6 %7",
        "args0": [
          {
            "type": "input_value",
            "name": "entitypropertyinput",
            "check": "entitychild"
          },
          {
	      "type": "field_dropdown",
	      "name": "prep",
	      "options": [
	        [ "on", "on" ],
	        [ "from", "from" ],
	        [ "in", "in" ],
	        [ "to", "to" ],
	        [ "into", "into" ],
	        [ "for", "for" ],
	        [ "of", "of" ],
	      ]
         },
         {
            "type": "input_value",
            "name": "entitypropertyinput",
            "check": "entity"
          },
          {
          "type": "field_input",
          "name": "entityname",
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
          "type": "field_input",
          "name": "entitypropertyname",
          "text": "name",
        },
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
          "check": "String"
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
          "check": "String"
        }
      ],
        "previousStatement": "text2",
        "nextStatement": "text2",
        "colour": 345,
      }
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
		  "type": "givenEntityPropertyblock"
		},
        {
          "kind": "block",
          "type": "whenActionBlock"
        },
        {
          "kind": "block",
          "type": "whenMultipleEntitiesBlock"
        },
        {
          "kind": "block",
          "type": "thenEntityblock"
        },
        {
		  "kind": "block",
		  "type": "thenEntityPropertyblock"
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
    "getEntities", createEntityBlocks);

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

	switch (e.type) {
		case "givenEntityblock":
			if (e.getChildren().length > 1){
				e.getChildren().forEach((element) => {
					i++
						if (element.type == "entityref") {
							if (element.getFieldValue("ENTITY") != null) {
								s1 = element.getFieldValue("ENTITY")
							}
						} else if (element.type == "entityChildrenref") {
							if (element.getFieldValue("ENTITYCHILDREN") != null) {
								s2 = element.getFieldValue("ENTITYCHILDREN")
							}
						}
				})
			
			s = s + s1 +
			"\"" + e.getFieldValue("TEXT") + "\"" + " " +
			e.getFieldValue("FIELDNAME") + " "
			i++
			if (e.getFieldValue("not") == "TRUE"){
				s = s + "not" + " "
			}
			s = s + s2
			}
			break;
		
		case "givenEntityPropertyblock":
			if (e.getChildren().length > 1) {
				e.getChildren().forEach((element) => {
					i++
						if (element.type == "entityref") {
							if (element.getFieldValue("ENTITY") != null) {
								s2 = element.getFieldValue("ENTITY")
							}
						} else if (element.type == "entityChildrenref") {
							if (element.getFieldValue("ENTITYCHILDREN") != null) {
								s1 = element.getFieldValue("ENTITYCHILDREN") + " "
							}
						}
				})
				
				s = s1 + 
				e.getFieldValue("prep") + " " +
				"the " +
				s2 +
				"\"" + e.getFieldValue("entityname") + "\"" + " "
				if (e.getFieldValue("not") == "TRUE"){
					s = s + "not" + " "
				}
				s = s + e.getFieldValue("FIELDNAME") + " " + 
				"\"" + e.getFieldValue("entitypropertyname") + "\"" + " "
			}
			break;
			
		case "whenActionBlock":
			if (e.getChildren().length > 1) {
				e.getChildren().forEach((element) => {
					i++
						if (element.type == "entityref") {
							if (element.getFieldValue("ENTITY") != null) {
								s2 = element.getFieldValue("ENTITY")
							}
						} else if (element.type == "entityChildrenref") {
							if (element.getFieldValue("ENTITYCHILDREN") != null) {
								s1 = element.getFieldValue("ENTITYCHILDREN")
							}
						}
				})
				
				if (e.getFieldValue("not") == "TRUE"){
					s = s + "do not" + " "
				}
				s = s + s1 +
				e.getFieldValue("prep") + " " + 
				"the " + 
				s2 + 
				"\"" + e.getFieldValue("entitypropertyname") + "\""
			}
			break;
			
		case "whenMultipleEntitiesBlock":
			check = false
			if (e.getChildren().length > 2) {
				e.getChildren().forEach((element) => {
						if (element.type == "entityref") {
							if (element.getFieldValue("ENTITY") != null) {
								if (check == false){
									s2 = element.getFieldValue("ENTITY")
									check = true
								} else if (check == true) {
									s3 = element.getFieldValue("ENTITY")
								}
							}
						} else if (element.type == "entityChildrenref") {
							if (element.getFieldValue("ENTITYCHILDREN") != null) {
								s1 = element.getFieldValue("ENTITYCHILDREN")
							}
						}
				})
				
				if (e.getFieldValue("not") == "TRUE"){
					s = s + "do not" + " "
				}
				s = s + s1 + " " +
				e.getFieldValue("prep") + 
				"the " + 
				s2 + 
				"\"" + e.getFieldValue("entitypropertyname") + "\" " +
				e.getFieldValue("prep2") + " " + 
				"the " + 
				s3 + 
				"\"" + e.getFieldValue("entitypropertyname2") + "\" "
			}
			break;
			
		case "thenEntityblock":
			if (e.getChildren().length > 1){
				e.getChildren().forEach((element) => {
					console.log(element.type + "   i value  " + i)
					i++
						if (element.type == "entityref") {
							if (element.getFieldValue("ENTITY") != null) {
								s1 = element.getFieldValue("ENTITY")
							}
						} else if (element.type == "entityChildrenref") {
							if (element.getFieldValue("ENTITYCHILDREN") != null) {
								s2 = element.getFieldValue("ENTITYCHILDREN")
							}
						}
				})
			
			s = s + s1 +
			"\"" + e.getFieldValue("TEXT") + "\"" + " " +
			e.getFieldValue("FIELDNAME") + " "
			i++
			if (e.getFieldValue("not") == "TRUE"){
				s = s + "not" + " "
			}
			s = s + s2
			}
			break;
			
		case "thenEntityPropertyblock":
			if (e.getChildren().length > 1) {
				e.getChildren().forEach((element) => {
					i++
						if (element.type == "entityref") {
							if (element.getFieldValue("ENTITY") != null) {
								s1 = element.getFieldValue("ENTITY")
							}
						} else if (element.type == "entityChildrenref") {
							if (element.getFieldValue("ENTITYCHILDREN") != null) {
								s2 = element.getFieldValue("ENTITYCHILDREN") + " "
							}
						}
				})
				
				s = s1 + 
				e.getFieldValue("prep") + " " +
				"the " +
				s2 +
				"\"" + e.getFieldValue("entityname") + "\"" + " "
				if (e.getFieldValue("not") == "TRUE"){
					s = s + "not" + " "
				}
				s = s + e.getFieldValue("FIELDNAME") + " " + 
				"\"" + e.getFieldValue("entitypropertyname") + "\"" + " "
			}
			break;
			
	}
	
	return s
}

function addBlocksToArray(a){
	var i = 0;
	a.forEach((element) => {
		console.log(element.type)
			if (element.type == "entityactionsblock" || element.type == "entitystatesblock" || element.type == "entitypropertiesblock") {
				typeArray.push(element.getTooltip() + printNestedChildren(element.getDescendants(), element));
				if (element.getNextBlock() == null || element.getNextBlock().type == "entityblock") {
					typeArray.push("}")
					typeArray.push("")
				}
			} else if (element.type == "whichmeansblock") {
				typeArray.push(element.getTooltip());
				addNestedBlocks(element.getDescendants().slice(1), element);
			} else if (element.getSurroundParent() == null){
				if (element.getFieldValue("not") != null){
					typeArray.push(element.getTooltip() + createString(element))
				} else if (element.type == "entityblock") {
					typeArray.push(element.getTooltip() + getText(element.getChildren()) + "{")
				} else {
					typeArray.push(element.getTooltip() + getText(element.getChildren()));
					typeArray.push("")
				}
			}
	})
}

Blockly.Extensions.register("not_editable_extension",
  function() {
    this.setEditable(false);
  });

function createEntityBlocks() {
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
				        "ENTITYCHILDREN": element2.getFieldValue("TEXT2")
				      },
				      "output": "entity"
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
		}
	})
	
	d.insertFullLines(0, typeArray);
}

modelWorkspace.addChangeListener(onchange);
bddWorkspace.addChangeListener(onchange);

onchange();