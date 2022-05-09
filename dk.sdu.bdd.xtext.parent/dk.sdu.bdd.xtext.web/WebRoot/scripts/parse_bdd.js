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


  return parsed
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

//Get an entire block (eg. an entire top-level given/when/then section)
function getSection(fullText, start, searchString) {
  let sec = {}

  if (fullText[start].includes(searchString)) {
    let section = sliceSection(fullText, parseInt(start))

    sec = {
      name: section.content[0],
      given: section.content[1],
      when: section.content[2],
      then: section.content[3],
      lines: section.lines
    }
  }
  return sec
}

//slice a section from the text into a sub-array
function sliceSection(array, start) {
  let end = parseInt(start)

  for (end; end < array.length; end++) {
    //concat And section to the correct lower section
    if (array[end].includes("And")) {
      array[end - 1] = array[end - 1] + " " + array[end]
      array.splice(end, 1)
      end--
    }
    // stop searching if a then block is encounteres (if not top level)
    if (array[end].includes("Then") && end - start + 1 > 1)
      break 
  }

  array = array.slice(start, end + 1) //slice the sub-array
  array.splice(1, 1) //splice out "which means"
  return { content: array, lines:  end - start + 1}
}

function parseScenarios(fullText) {
  scenarios = []
  
  for (i in fullText) {
    //start of scenario block
    if (fullText[i].includes('Scenario')) {
      let newScenario = {
        name: '',
        given: {},
        when: {},
        then: {}
      };
      newScenario.name = fullText[i].split(':')[1].replace(/ *(.*)/g, '$1')

      let j = parseInt(i) + 1


      outerDef: for (j; j < fullText.length; j++) {
        newScenario.given = getSection(fullText, j, "Given");
        if ("lines" in newScenario.given)
          j = j + newScenario.given.lines
        newScenario.when = getSection(fullText, j, "When")
        if ("lines" in newScenario.when)
          j = j + newScenario.when.lines
        let thi = getSection(fullText, j , "Then")
        if (thi != undefined && "then" in thi && thi.then != '') {
            newScenario.then = thi
            break outerDef
        }
      }
      scenarios.push(newScenario)
    }
  }

  return scenarios
}


let parsed;
let parseBtn = document.getElementById("parse-bdd");
parseBtn.onclick = () => {
  parsed = parsebdd()
}

