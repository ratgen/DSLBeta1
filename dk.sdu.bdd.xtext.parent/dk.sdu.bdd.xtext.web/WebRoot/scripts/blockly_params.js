Blockly.defineBlocksWithJsonArray([
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
		"nextStatement": "",
        "nextConnection": "givenblock",
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
        "previousStatement: "",
        "previousConnection": "scenarioblock",
        "nextStatement": null,
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
        "previousConnection": "scenarioblock",
        "nextStatement": null,
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
        "previousStatement": "scenarioblock",
        "nextStatement": null,
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
            "name": "NAME"
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
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
      }
  ]);
 

var toolbox = {
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
          "type": "givenblock"
        },
        {
          "kind": "block",
          "type": "whichmeansblock"
        },
        {
          "kind": "block",
          "type": "whenblock"
        },
        {
          "kind": "block",
          "type": "thenblock"
        }
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
    }
  ]
}


var workspace = Blockly.inject('blockly-editor', {toolbox: toolbox});