Blockly.defineBlocksWithJsonArray([
    	{
			  "type": "entityRef",
			  "message0": "%1",
			  "args0": [
	          {
	          "type": "field_input",
	          "name": "ENTITY",
	          }
	          ],
			  "output": "entity",
			  "colour": 45,
        	  "extensions": ["not_editable_extension"]
			},
			{
			  "type": "entityActionRef",
			  "message0": "%1",
			  "args0": [
	          {
	          "type": "field_input",
	          "name": "ENTITYACTION",
	          }
	          ],
			  "output": "entityaction",
			  "colour": 90,
        	  "extensions": ["not_editable_extension"]
			},
			{
			  "type": "entityStateRef",
			  "message0": "%1",
			  "args0": [
	          {
	          "type": "field_input",
	          "name": "ENTITYSTATE",
	          }
	          ],
			  "output": "entitystate",
			  "colour": 135,
        	  "extensions": ["not_editable_extension"]
			},
			{
			  "type": "entityPropertyRef",
			  "message0": "%1",
			  "args0": [
	          {
	          "type": "field_input",
	          "name": "ENTITYPROPERTY",
	          }
	          ],
			  "output": "entityproperty",
			  "colour": 180,
        	  "extensions": ["not_editable_extension"]
			},
			{
		  "type": "modelRef",
		  "message0": "%1",
		  "args0": [
	          {
	          "type": "field_input",
	          "name": "MODEL",
	          }
	          ],
			  "output": "model",
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
		  "type": "modelUsingBlock",
		  "message0": "Model %1 using %2",
		  "args0": [
		    {
		      "type": "input_value",
		      "name": "NAME",
		      "check": "String"
		    },
		    {
            "type": "input_value",
            "name": "modelinput",
            "check": "model"
          },
		  ],
		  "inputsInline": true,
		  "nextStatement": "modelUsing",
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
        "previousStatement": "modelUsing",
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
            "name": "entitystateinput",
            "check": "entitystate"
          },
        ],
        "inputsInline": true,
        "previousStatement": "given",
        "nextStatement": ["whichmean", "when", "andGiven"],
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
            "check": "entityproperty"
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
	        [ "with", "with" ],
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
        "nextStatement": ["whichmean", "when", "andGiven"],
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
            "check": "entityaction"
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
	        [ "with", "with" ],
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
        "nextStatement": ["then", "whichmean", "andWhen"],
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
            "check": "entityaction"
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
	        [ "with", "with" ],
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
        "nextStatement": ["then", "whichmean", "andWhen"],
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
            "name": "entitystateinput",
            "check": "entitystate"
          },
        ],
        "inputsInline": true,
        "previousStatement": "then",
        "nextStatement": ["whichmean", "andThen"],
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
            "check": "entityproperty"
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
	        [ "with", "with" ],
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
        "nextStatement": ["whichmean", "andThen"],
        "colour": 135,
        "tooltip": "Then the ",
        "helpUrl": ""
      },
      {
        "type": "andEntityBlock",
        "message0": "And %1 %2 %3 not %4 %5",
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
            "name": "entitystateinput",
            "check": "entitystate"
          },
        ],
        "inputsInline": true,
        "previousStatement": "andGiven",
        "nextStatement": ["whichmean", "when", "andGiven"],
        "colour": 45,
        "tooltip": "And ",
        "helpUrl": ""
      },
      {
        "type": "andEntityPropertyBlock",
        "message0": "And the %1 %2 the %3 %4 %5 not %6 %7",
        "args0": [
          {
            "type": "input_value",
            "name": "entitypropertyinput",
            "check": "entityproperty"
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
	        [ "with", "with" ],
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
        "previousStatement": "andGiven",
        "nextStatement": ["whichmean", "when", "andGiven"],
        "colour": 45,
        "tooltip": "And the ",
        "helpUrl": ""
      },
      {
        "type": "andActionBlock",
        "message0": "And I do not %1 %2  %3 the %4 %5",
        "args0": [
		  {
	        "type": "field_checkbox",
	        "name": "not",
	        "checked": false
	      },
          {
            "type": "input_value",
            "name": "whenAction",
            "check": "entityaction"
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
	        [ "with", "with" ],
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
        "previousStatement": "andWhen",
        "nextStatement": ["then", "whichmean", "andWhen"],
        "colour": 90,
        "tooltip": "And I ",
        "helpUrl": ""
      },
      {
        "type": "andMultipleEntitiesBlock",
        "message0": "And I do not %1 %2  %3 the %4 %5 %6 the %7 %8",
        "args0": [
		  {
	        "type": "field_checkbox",
	        "name": "not",
	        "checked": false
	      },
          {
            "type": "input_value",
            "name": "whenAction",
            "check": "entityaction"
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
	        [ "with", "with" ],
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
        "previousStatement": "andWhen",
        "nextStatement": ["then", "whichmean", "andWhen"],
        "colour": 90,
        "tooltip": "And I ",
        "helpUrl": ""
      },
      {
        "type": "andThenEntityBlock",
        "message0": "And the %1 %2 %3 not %4 %5",
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
            "name": "entitystateinput",
            "check": "entitystate"
          },
        ],
        "inputsInline": true,
        "previousStatement": "andThen",
        "nextStatement": ["whichmean", "andThen"],
        "colour": 135,
        "tooltip": "And the ",
        "helpUrl": ""
      },
      {
        "type": "andThenEntityPropertyBlock",
        "message0": "And the %1 %2 the %3 %4 %5 not %6 %7",
        "args0": [
          {
            "type": "input_value",
            "name": "entitypropertyinput",
            "check": "entityproperty"
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
	        [ "with", "with" ],
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
        "previousStatement": "andThen",
        "nextStatement": ["whichmean", "andThen"],
        "colour": 135,
        "tooltip": "And the ",
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
 

var entityToolbox = {
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

var scenarioToolbox = {
  "kind": "categoryToolbox",
  "contents": [
      {
      "kind": "category",
      "name": "Model",
	  "custom": "getModel"
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
      "name": "And blocks",
      "contents": [
        {
          "kind": "block",
          "type": "andEntityBlock"
        },
        {
		  "kind": "block",
		  "type": "andEntityPropertyBlock"
		},
        {
          "kind": "block",
          "type": "andActionBlock"
        },
        {
          "kind": "block",
          "type": "andMultipleEntitiesBlock"
        },
        {
          "kind": "block",
          "type": "andThenEntityBlock"
        },
        {
          "kind": "block",
          "type": "andThenEntityPropertyBlock"
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

function getText(a){
	let s = ""
	a.forEach((element) => {
	if (element.type == "textblock"){
		s = s + element.getFieldValue("TEXT") + " ";
	} else if (element.type == "entityRef"){
		s = s + element.getFieldValue("ENTITY") + " ";
	}
	})
	return s;
}

function printNestedChildren(a, e){
	let s = "";
	a.forEach((element) => {
		if (element.getSurroundParent() != null){
			if (element.getSurroundParent().id == e.id){
			console.log("fieldvalue: " + element.getFieldValue("TEXT2"))
			console.log("parent: " + e.type)
			if (element.getNextBlock() != null && element.getFieldValue("TEXT2") != null) {
			s = s + element.getFieldValue("TEXT2") + ", "
			} else {
				s = s + element.getFieldValue("TEXT2")
				return s
			}
		}
		}
	})
	return s
}

function addNestedBlocks(a, e){
	a.forEach((element) => {
		if (element.getSurroundParent() != null && element.getSurroundParent().id == e.id) {
			typeArray.push("      " + element.getTooltip() + createString(element))
	}
	})
}

function createString(e){
	var s = ""
	var i = 0
	switch (e.type) {
		case "givenEntityblock": case "thenEntityblock": case "andEntityBlock": case "andThenEntityBlock":
			console.log(e.type)
			if (e.getChildren().length >= 2){
				e.getChildren().forEach((element) => {
						if (element.type == "entityRef") {
							if (element.getFieldValue("ENTITY") != null) {
								s1 = element.getFieldValue("ENTITY")
							}
						} else if (element.type == "entityStateRef") {
							if (element.getFieldValue("ENTITYSTATE") != null) {
								s2 = element.getFieldValue("ENTITYSTATE")
							}
						}
				})
			
			s = s + s1 +
			"\"" + e.getFieldValue("TEXT") + "\"" + " " +
			e.getFieldValue("FIELDNAME") + " "
			
			if (e.getFieldValue("not") == "TRUE"){
				s = s + "not" + " "
			}
			s = s + s2
			}
			break;
		
		case "givenEntityPropertyblock": case "thenEntityPropertyblock": case "andEntityPropertyBlock": case "andThenEntityPropertyBlock":
			if (e.getChildren().length >= 2) {
				e.getChildren().forEach((element) => {
						if (element.type == "entityRef") {
							if (element.getFieldValue("ENTITY") != null) {
								s2 = element.getFieldValue("ENTITY")
							}
						} else if (element.type == "entityPropertyRef") {
							if (element.getFieldValue("ENTITYPROPERTY") != null) {
								s1 = element.getFieldValue("ENTITYPROPERTY") + " "
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
			
		case "whenActionBlock": case "andActionBlock":
			if (e.getChildren().length >= 2) {
				e.getChildren().forEach((element) => {
						if (element.type == "entityRef") {
							if (element.getFieldValue("ENTITY") != null) {
								s2 = element.getFieldValue("ENTITY")
							}
						} else if (element.type == "entityActionRef") {
							if (element.getFieldValue("ENTITYACTION") != null) {
								s1 = element.getFieldValue("ENTITYACTION")
							}
						}
				})
				
				if (e.getFieldValue("not") == "TRUE"){
					s = s + "do not" + " "
				}
				s = s + s1 + " " +
				e.getFieldValue("prep") + " " + 
				"the " + 
				s2 + 
				"\"" + e.getFieldValue("entitypropertyname") + "\""
			}
			break;
			
		case "whenMultipleEntitiesBlock": case "andMultipleEntitiesBlock": 
			check = false
			if (e.getChildren().length > 2) {
				e.getChildren().forEach((element) => {
						if (element.type == "entityRef") {
							if (element.getFieldValue("ENTITY") != null) {
								if (check == false){
									s2 = element.getFieldValue("ENTITY")
									check = true
								} else if (check == true) {
									s3 = element.getFieldValue("ENTITY")
								}
							}
						} else if (element.type == "entityActionRef") {
							if (element.getFieldValue("ENTITYACTION") != null) {
								s1 = element.getFieldValue("ENTITYACTION")
							}
						}
				})
				
				if (e.getFieldValue("not") == "TRUE"){
					s = s + "do not" + " "
				}
				s = s + s1 + " " +
				e.getFieldValue("prep") + " " +
				"the " + 
				s2 + 
				"\"" + e.getFieldValue("entitypropertyname") + "\"" +
				e.getFieldValue("prep2") + " " + 
				"the " + 
				s3 + 
				"\"" + e.getFieldValue("entitypropertyname2") + "\" "
			}
			break;
			
		case "modelUsingBlock":
			if (e.getChildren().length > 1) {
				e.getChildren().forEach((element) => {
					if (element.type == "textblock"){
						s1 = element.getFieldValue("TEXT")
					} else if (element.type == "modelRef"){
						s2 = element.getFieldValue("MODEL")
					}
				})
			s = s1 + " using " + s2
			}
			break;
			
	}
	
	return s
}

function addBlocksToArray(a){
	typeArray = [];
	a.forEach((element) => {
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
				if (element.getFieldValue("not") != null || element.type == "modelUsingBlock"){
					typeArray.push(element.getTooltip() + createString(element))
				} else if (element.type == "entityblock") {
					typeArray.push(element.getTooltip() + getText(element.getChildren()) + "{")
				} else {
					typeArray.push(element.getTooltip() + getText(element.getChildren()));
					typeArray.push("")
				}
			}
	})
	return typeArray
}

Blockly.Extensions.register("not_editable_extension",
  function() {
    this.setEditable(false);
  });

function createModelBlock() {
	var a = entityWorkspace.getAllBlocks()
	var blockList = [];
	a.forEach((element) => {
	if (element.type == "modelblock"){
			blockList.push({  
		      "kind": "block",
		      "type": "modelUsingBlock"
			});
			blockList.push({  
		      "kind": "block",
		      "type": "modelRef",
		      "fields": {
		        "MODEL": getText(element.getChildren())
		      }
			});
		}
		})
		return blockList
}

function createEntityBlocks() {
	var a = entityWorkspace.getAllBlocks()
	var blockList = [];
	a.forEach((element) => {
		if (element.type == "entityblock"){
			blockList.push({  
		      "kind": "block",
		      "type": "entityRef",
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
					switch (element2.getSurroundParent().type) {
						case "entityactionsblock":
							blockList.push({  
						    "kind": "block",
						    "type": "entityActionRef",
						    "fields": {
						    "ENTITYACTION": element2.getFieldValue("TEXT2")
						    },
							});
							break;
						
						case "entitystatesblock":
							blockList.push({  
						    "kind": "block",
						    "type": "entityStateRef",
						    "fields": {
						    "ENTITYSTATE": element2.getFieldValue("TEXT2")
						    },
							});
							break;
							
						case "entitypropertiesblock":
							blockList.push({  
						    "kind": "block",
						    "type": "entityPropertyRef",
						    "fields": {
						    "ENTITYPROPERTY": element2.getFieldValue("TEXT2")
						    },
							});
							break;
					}
				}
			})
		}
	})
	  return blockList;
};

var entityWorkspace = Blockly.inject("blockly-editor", {toolbox: entityToolbox});
var scenarioWorkspace = Blockly.inject("blockly-editor2", {toolbox: scenarioToolbox});

	scenarioWorkspace.registerToolboxCategoryCallback(
    "getEntities", createEntityBlocks);
    
    scenarioWorkspace.registerToolboxCategoryCallback(
    "getModel", createModelBlock);

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
	
	scenarioTab.removeFullLines(0, scenarioTab.getLength());
	entityTab.removeFullLines(0, entityTab.getLength());
	
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

onResize();
