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
    }
  ]
 }
  
var workspace = Blockly.inject('blockly-editor', {toolbox: toolbox});

window.onload = () => {
  editor.env.document.doc.insert(0, "model tjd\n\nScenario:")
}

