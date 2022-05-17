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
