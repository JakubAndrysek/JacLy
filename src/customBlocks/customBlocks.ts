import Blockly from "blockly";
import 'blockly/javascript';

// Blockly.Blocks['console_log'] = {
//     init: function() {
//         this.appendValueInput("MESSAGE")
//             .setCheck(null)
//             .appendField("Console.log");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(230);
//         this.setTooltip("dd");
//         this.setHelpUrl("");
//     }
// };

Blockly.Blocks['string_length'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('String')
            .appendField('length of');
        this.setOutput(true, 'Number');
        this.setColour(160);
        this.setTooltip('Returns number of letters in the provided text.');
        this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
    }
};



// // @ts-ignore
// Blockly.JavaScript['console_log'] = function(block) {
//     var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
//     return 'console.log(' + value_message + ');\n';
// }