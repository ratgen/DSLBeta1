

def readFile():
    with open('sample.bdd') as f:
        fileWriter = open("features/tests.feature","w")
        content = f.readlines()
        disallowedStrings = ['actions','states', 'properties','}' ,'/*','*/', "which means", '//', 'declarative', 'imperative', 'model'  ]

        for i in range(0,len(content)):
            line = content[i]
            if any(x in line for x in disallowedStrings):
                pass
            elif(line.startswith('Scenario:')):
                
                scenario = line.replace('"',"").replace("Scenario: ","")
                s = "Feature: " + scenario
                fileWriter.write(s)
            elif(line.startswith('Given') |line.startswith('When') | line.startswith('Then') ):
            
                s = '\n'+'\tScenario: '+ line
                fileWriter.write(s)
            else:
                fileWriter.write(line)
        fileWriter.close()
