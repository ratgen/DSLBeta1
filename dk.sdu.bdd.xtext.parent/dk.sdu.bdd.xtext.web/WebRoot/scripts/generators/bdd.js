const Order = {
    ATOMIC: 0,
};

bddGenerator = new Blockly.Generator('bdd');

// Terminals
bddGenerator.forBlock['STRING'] = function(block) {
    const textValue = block.getFieldValue('TEXT_INPUT');
    const code = `"${textValue}"`;
    return [code, Order.ATOMIC];
};

bddGenerator.forBlock['ID'] = function(block) {
    const textValue = block.getFieldValue('TEXT_INPUT');
    const code = `${textValue}`;
    return [code, Order.ATOMIC];
};

bddGenerator.scrub_ = function(block, code, thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
      return '\n' + code + '\n' + bddGenerator.blockToCode(nextBlock);
    }    
    return code;
};

function getBddGenerator(blockArray)
{
    blockArray.forEach(registerRuleForBlock);
    return bddGenerator;
}

function registerRuleForBlock(blockArrayElement)
{
    bddGenerator.forBlock[blockArrayElement.type] = function(block, generator) {        
        var code = blockArrayElement.message0;
        for (var i = 0; i < blockArrayElement.args0.length; i++) {
            var argument = blockArrayElement.args0[i];
            var argumentValue = getArgumentValue(argument.type, argument.name, block, generator);

            code = code.replace(`%${i+1}`, argumentValue); // starts from %1
        }
        
        if (!blockArrayElement.output)
            return code;
        else
            return [code, Order.ATOMIC];
    };
}

function getArgumentValue(argumentType, argumentName, block, generator) {
    if (argumentType === "input_value") {
        return generator.valueToCode(block, argumentName, Order.ATOMIC);
    }
    else if (argumentType === "input_statement") {
        return generator.statementToCode(block, argumentName);
    }
    else if (argumentType === "field_dropdown" || argumentType === "field_input") {
        return block.getFieldValue(argumentName);
    }
}