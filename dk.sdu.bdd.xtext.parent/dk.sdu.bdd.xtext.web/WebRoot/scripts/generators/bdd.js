const Order = {
    ATOMIC: 0,
};

bddGenerator = new Blockly.Generator('bdd');

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

function getBddGenerator()
{
    return bddGenerator;
}