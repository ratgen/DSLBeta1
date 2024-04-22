let blockDefinitions;
let previousBlock;

function generateBlocksFromAst(ast, workspace, blockArray, tabName) {
    if (!workspace || !blockArray || !ast || !ast._children)
        return;
    
    if (blockArray)
        blockDefinitions = blockArray;
    
    workspace.clear();
    previousBlock = null;

    if (tabName === 'entities' && ast._children.length > 0)
    {
        generateBlocks(ast._children[ast._children.length - 1], workspace, null); // entities are here
    }

    if (tabName === 'scenarios' && ast._children.length > 1)
    {
        generateBlocks(ast._children[0], workspace, null); // scenarios are here
    }

    workspace.render();
}

function generateBlocks(root, workspace, parentBlock)
{
    if (!root || !root._children)
        return;

    var childrenIsArray = Array.isArray(root._children);

    // sometimes we need to reverse the order.
    if (childrenIsArray && (parentBlock.type === 'Model' 
        || parentBlock.type === 'DeclarativeEntityDef')) {
        root._children.reverse();
    }

    for (var i = 0; i < (childrenIsArray ? root._children.length : 1); i++) {
        var current = childrenIsArray ? root._children[i]._children : root._children;
        if (!current)
            continue;

        var currentParentBlock = null;

        if (current.value) {
            console.log('Current value: ' + current.value._value);

            var parsedObj = parseValueString(current.value._value);    
            if (parsedObj && parsedObj.type) {
                var addedBlock = addBlockToWorkspace(parsedObj, workspace, parentBlock); 
                currentParentBlock = addedBlock ? addedBlock : parentBlock;
            }
            else
            {
                currentParentBlock = parentBlock;
            }
        }

        if (current.nodes) {
            generateBlocks(current.nodes, workspace, currentParentBlock);
        }
    }
}

function addBlockToWorkspace(parsedObj, workspace, parentBlock) {
    // we have special cases: DeclarativeEntityRef, ActionRef, PropertyRef etc.
    // they require special blocks to be connected.
    if (parsedObj.type === 'DeclarativeEntityRef') {
        addIdBlock(parsedObj.id, parentBlock, workspace, false);
        addValueBlock(parsedObj.entityValue, parentBlock, workspace);
        return parentBlock;
    }
    else if (parsedObj.type === 'PropertyRef' 
        && (parentBlock.tooltip === 'DeclarativeEntityPropertyAction' || parentBlock.tooltip === 'DeclarativeEntityStatePhraseWithProperty')) {
        addIdBlock(parsedObj.id, parentBlock, workspace, false);
        addValueBlock(parsedObj.propertyValue, parentBlock, workspace);
        return parentBlock;
    }
    else if (parsedObj.type === 'ActionRef') {
        addIdBlock(parsedObj.id, parentBlock, workspace, false);
        return parentBlock;
    }    

    var blockDefinition = blockDefinitions.find(function(b) {
        return b.type === parsedObj.type;
    });

    var blockToAdd = null;
    if (blockDefinition) { // good. we know this block
        blockToAdd = workspace.newBlock(parsedObj.type);
    }
    else { // blocks that should be handled separately
        var substringToSearch = null;

        switch (parsedObj.type)
        {
            case 'PropertyDef':
            case 'ImperativePropertyDef':              
                substringToSearch = "properties";
                break;
            case 'ActionDef':
            case 'ImperativeActionDef':
                substringToSearch = "actions";
                break;
            case 'StateName':
            case 'ImperativeStateName':
                substringToSearch = "states";
                break;
            default:
                console.log("Can't add the block with type: " + parsedObj.type);
                return null;
        }

        if (!substringToSearch)
            return null;

        var parentBlockDefinition = blockDefinitions.find(function(b) {
            return b.type === parentBlock.type;
        });
        
        try { // try to add the input to the correct place
            var previousBlockDefinition = null;  
            var inputArgument = null;  

            if (previousBlock) // connect as a subblock
            {
                previousBlockDefinition = blockDefinitions.find(function(b) {
                    return b.type === previousBlock.type;
                });

                inputArgument = previousBlockDefinition.args0.find(function(a) {
                    return a.check && a.check.some(function(checkItem) {
                        return (checkItem.includes(substringToSearch) && 
                            !checkItem.startsWith("subBlock_subBlock_subBlock"));
                    }) && a.type === 'input_statement';
                });

                if (!inputArgument) { // try going to the outer level
                    previousBlock = previousBlock.getPreviousBlock();

                    previousBlockDefinition = blockDefinitions.find(function(b) {
                        return b.type === previousBlock.type;
                    });
    
                    inputArgument = previousBlockDefinition.args0.find(function(a) {
                        return a.check && a.check.some(function(checkItem) {
                            return (checkItem.includes(substringToSearch) && 
                                !checkItem.startsWith("subBlock_subBlock_subBlock"));
                        }) && a.type === 'input_statement';
                    });
                }
            }

            if (inputArgument) // means we are connecting to the previous block as subblock
            {
                parentBlock = previousBlock;
            }
            else // means we have to connect to the parent instead
            {
                inputArgument = parentBlockDefinition.args0.find(function(a) {
                    return a.check && a.check.some(function(checkItem) {
                        return checkItem.includes(substringToSearch);
                    }) && a.type === 'input_statement';
                });
            }
            
            var blockType = inputArgument.check.find(function(c) {
                return (c.includes(substringToSearch));
            });

            // manual intervention for wrong types
            if (blockType === `subBlock_subBlock_DeclarativeEntityDef_${substringToSearch}:`)
            {
                blockType = `subBlock_subBlock_DeclarativeEntityDef_${substringToSearch}:_,`;
            }

            if (blockType === `subBlock_subBlock_ImperativeEntityDef_${substringToSearch}:` ||
                blockType === `subBlock_subBlock_ImperativeEntityDef_${substringToSearch}:_/` ||
                blockType === `subBlock_subBlock_ImperativeEntityDef_${substringToSearch}:_[_]`)
            {
                blockType = `subBlock_subBlock_ImperativeEntityDef_${substringToSearch}:_,`;   
            }

            blockToAdd = workspace.newBlock(blockType);
        }
        catch(e) {
            console.log(e);
        }
    }

    if (!blockToAdd)
        return null;

    if (parsedObj.reference === 'StateName' && parsedObj.type === 'DeclarativeEntityStatePhraseWithProperty') // fix the order manually
        addIdBlock(parsedObj.id, blockToAdd, workspace, true);
    else if (parsedObj.id)
        addIdBlock(parsedObj.id, blockToAdd, workspace, false);

    if (parsedObj.scenarioName)
        addStringBlock(parsedObj.scenarioName, blockToAdd, workspace);

    if (parsedObj.strValue)
        addStringBlock(parsedObj.strValue, blockToAdd, workspace);

    if (parsedObj.preposition)
        setDropdownValue(parsedObj.preposition, blockToAdd, workspace, false);

    if (parsedObj.preposition2)
        setDropdownValue(parsedObj.preposition2, blockToAdd, workspace, true);

    if (parsedObj.toBeWord)
        setDropdownValue(parsedObj.preposition3, blockToAdd, workspace, false);

    if (parsedObj.preposition3)
        setDropdownValue(parsedObj.preposition3, blockToAdd, workspace, false); 

    if (parentBlock)
        addParentBlock(parentBlock, blockToAdd, workspace);

    previousBlock = blockToAdd;

    workspace.getBlockById(blockToAdd.id).initSvg();
    return blockToAdd;
}

function addParentBlock(parentBlock, blockToAdd, workspace)
{
    var parentBlockDefinition = blockDefinitions.find(function(b) {
        return b.type === parentBlock.type;
    });

    var inputArgument = null;

    outerLoop: for (var i = 0; i < parentBlockDefinition.args0.length; i++) {
        var a = parentBlockDefinition.args0[i];

        if (a.check && (a.type === 'input_statement' || a.type === 'input_value')) {    
            for (var j = 0; j < a.check.length; j++) {
                if (a.check[j].includes(blockToAdd.type)) {
                    if (a.type === 'input_value') {
                        var input = parentBlock.getInput(a.name);
                        if (!input || !input.connection.isConnected()) {
                            inputArgument = a;
                            break outerLoop;
                        }
                    }
                    else {
                        inputArgument = a;
                        break outerLoop;
                    }
                }                    
            }            
        }
    }

    var targetBlock = workspace.getBlockById(parentBlock.id);

    if (inputArgument && targetBlock.inputList) // connect as an input
    {
        var input = targetBlock.inputList.find(function(i) {
            return i.name === inputArgument.name;
        });

        if (inputArgument.type === 'input_statement') {
            targetBlock.inputList.forEach(function(existingInput) {
                var connection = existingInput.connection;
        
                // if a previous block exists, form a connection
                if (connection && connection.targetBlock()) {
                    var previousConnection = connection.targetBlock().previousConnection;
                    if (previousConnection) {
                        blockToAdd.setNextStatement(true);
                        blockToAdd.nextConnection.connect(previousConnection);
                    }
                }
            });
    
            input.connection.connect(blockToAdd.previousConnection);
        }
        else if (inputArgument.type === 'input_value') {
            var inputConnection = parentBlock.getInput(inputArgument.name).connection;
            blockToAdd.outputConnection.connect(inputConnection);
        }
    }
}

function addIdBlock(idValue, blockToAdd, workspace, skipFirst) 
{
    var blockDefinition = blockDefinitions.find(function(b) {
        return b.type === blockToAdd.type;
    });

    var idBlock = workspace.newBlock('ID');
    idBlock.setFieldValue(idValue, 'TEXT_INPUT');
    
    var inputArgument = null;

    outerLoop: for (var i = 0; i < blockDefinition.args0.length; i++) {
        var a = blockDefinition.args0[i];

        if (a.check && a.type === 'input_value') {   
            if (skipFirst) {
                skipFirst = false;
            }
            else { 
                for (var j = 0; j < a.check.length; j++) {
                    if (a.check[j] === 'ID') {                    
                        var input = blockToAdd.getInput(a.name);
                        if (!input || !input.connection.isConnected()) {
                            inputArgument = a;
                            break outerLoop;
                        }
                    }
                }  
            }          
        }
    }

    var inputConnection = blockToAdd.getInput(inputArgument.name).connection;
    idBlock.outputConnection.connect(inputConnection);

    workspace.getBlockById(idBlock.id).initSvg();
}

function addStringBlock(stringValue, blockToAdd, workspace)
{
    if (stringValue === "null")
        return;

    var blockDefinition = blockDefinitions.find(function(b) {
        return b.type === blockToAdd.type;
    });

    var stringBlock = workspace.newBlock('STRING');
    stringBlock.setFieldValue(stringValue, 'TEXT_INPUT');
    
    var inputArgument = blockDefinition.args0.find(function(a) {
        return a.check && a.check.includes('STRING') && a.type === 'input_value';
    });

    var inputConnection = blockToAdd.getInput(inputArgument.name).connection;
    stringBlock.outputConnection.connect(inputConnection);

    workspace.getBlockById(stringBlock.id).initSvg();
}

function addValueBlock(valueString, parentBlock, workspace) {
    var blockToAdd = workspace.newBlock('ENTITY_IDENTITY');
    addParentBlock(parentBlock, blockToAdd, workspace);
    addStringBlock(valueString, blockToAdd, workspace);
    workspace.getBlockById(blockToAdd.id).initSvg();
}

function setDropdownValue(dropdownValue, blockToAdd, workspace, skip) {
    var block = workspace.getBlockById(blockToAdd.id); // Get the block by its ID
    var blockDefinition = blockDefinitions.find(function(b) {
        return b.type === blockToAdd.type;
    });
    
    var dropdownInputName = null;    
    for (var i = 0; i < blockDefinition.args0.length; i++) {
        var a = blockDefinition.args0[i];

        if (a.options && a.type === 'field_dropdown') {    
            if (a.options.find(element => element.includes(dropdownValue))) {
                if (skip) {
                    skip = false;
                    continue;
                }
                else {
                    dropdownInputName = a.name;
                    break;
                }
            }
        }
    }

    if (dropdownInputName)
        block.setFieldValue(dropdownValue, dropdownInputName)
}

function parseValueString(str) {
    var regex = /(\w+)\s*(?:\(preposition:\s+(\w+))?(?:,\s*preposition2:\s+(\w+))?(?:,\s*toBeWord:\s+(\w+))?(?:,\s*value:\s*(\w+(?:\s+\w+)*))?\)?(?:\(scenarioName:\s*(\w+(?:\s+\w+)*)\))?(?:\(entityValue:\s*(\w+(?:\s+\w+)*)\))?(?:\(propertyValue:\s*(\w+(?:\s+\w+)*)\))?(?:->\s*(\w+))?\s*(?:\(name:\s+(\w+))?(?:,\s*preposition:\s+(\w+))?(?:,\s*argument:\s+(\w+))?\)?/;
    var matches = str.match(regex);

    if (matches) {
        var type = matches[1];
        var preposition = matches[2] || null;
        var preposition2 = matches[3] || null;
        var toBeWord = matches[4] || null;
        var strValue = matches[5] || null;
        var scenarioName = matches[6] || null;
        var entityValue = matches[7] || null;
        var propertyValue = matches[8] || null;
        var reference = matches[9] || null;
        var id = matches[10] || null;
        var preposition3 = matches[11] || null;
        var argument = matches[12] || null;

        return {
            type: type,
            scenarioName: scenarioName,
            entityValue: entityValue,
            propertyValue: propertyValue,
            reference: reference, 
            id: id,
            strValue: strValue,
            preposition: preposition,
            preposition2: preposition2,
            preposition3: preposition3,
            argument: argument,
            toBeWord: toBeWord
        };
    } 
    else {
        console.log("This string could not be parsed: " + str);
        return {
            type: str
        };
    }
}