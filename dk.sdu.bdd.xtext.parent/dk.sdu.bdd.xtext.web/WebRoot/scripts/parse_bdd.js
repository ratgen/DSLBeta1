function parsebdd() {
  let fullText = editors[0].getValue().split('\n');

  let parsed = {
    entities: [],
    scenarios: []
  }
  
  for (i in fullText) {
    fullText[i] = fullText[i].replace(/\t/g, '')
  }

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
            values[val] = values[val].replace(/ *(.*) */g, '$1')
          }
        } else {
          values = properties[1] 
        }
        newEntity[properties[0]] = values
      }
      parsed.entities.push(newEntity)
    }
  }
  console.log(parsed)

  console.log(fullText)
}

let parsed;
let parseBtn = document.getElementById("parse-bdd");
parseBtn.onclick = () => {
  parsed = parsebdd()
}

