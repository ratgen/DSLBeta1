function parsebdd() {
  let fullText = editors[0].getValue().split('\n');

  let parsed = {
    entities: [],
    scenarios: []
  }
  
  for (i in fullText) {
    fullText[i] = fullText[i].replace(/\t/g, '')
  }

  parsed.entities = parseEntities(fullText)
  parsed.scenarios = parseScenarios(fullText)


  console.log(fullText)
}

function removeSpaces(string) {
  return string.replace(/ *(.*) */g, '$1')
}

function parseEntities (fullText) {
  let entities = [] 
  for (i in fullText) {
    if (fullText[i].replace(/(entity) .*/g,'$1') == 'entity') {
      let newEntity = {};
      newEntity.name = fullText[i].replace(/entity[ ]*(\w*) .*/g,'$1')

      let condition = parseInt(i) + 4
      let j = parseInt(i) + 1
      loop2: for (j; j < condition; j++) {
        if (fullText[j].includes('}')) {
          break loop2
        }
        let properties = fullText[j].split(':')
        let values;
        if (fullText[j].includes(',')) {
          values = properties[1].split(',')
          for(val in values) {
            values[val] = removeSpaces(values[val])
          }
        } else {
          values = [removeSpaces(properties[1])]
        }
        newEntity[properties[0]] = values
      }
      entities.push(newEntity)
    }
  }
  return entities
}

function parseScenarios(fullText) {
  scenarios = []
  
  for ( i in fullText) {
    //start of scenario block
    if (fullText[i].contains('Scenario')) {
      let newScenario = {};
      newScenario.name = fullText[i]

        
    }
  }
}


let parsed;
let parseBtn = document.getElementById("parse-bdd");
parseBtn.onclick = () => {
  parsed = parsebdd()
}

