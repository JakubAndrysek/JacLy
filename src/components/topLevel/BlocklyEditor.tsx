import {FC, InputHTMLAttributes, useRef, useState} from "react";
import {useGenerateCode} from "../../context/GenerateCodeContext";
import Blockly from "blockly";
import {javascriptGenerator} from "blockly/javascript";
import {BlocklyWorkspace} from "react-blockly";

// @ts-expect-error
import {INITIAL_TOOLBOX_JSON} from "../../blockly-config";

export interface HeaderProps extends InputHTMLAttributes<HTMLInputElement> {
}

const defaultJson = "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"Ivt8,LVq_l-s5f.({`(k\",\"x\":52,\"y\":17,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"main\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"controls_for\",\"id\":\"7;OG)Bl2+iDy/r3q4N1E\",\"fields\":{\"VAR\":{\"id\":\"C(8;cYCF}~vSgkxzJ+{O\"}},\"inputs\":{\"FROM\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"gZG?3tEBsD]z,{DvU44i\",\"fields\":{\"NUM\":1}}},\"TO\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"~pW_sGK`lH%rE9WPn`Yf\",\"fields\":{\"NUM\":100000}}},\"BY\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"l_BIM/*1/@+HfM@nCsYN\",\"fields\":{\"NUM\":2}}},\"DO\":{\"block\":{\"type\":\"text_print\",\"id\":\"/)N;JLV}zW}*,%([RUb_\",\"inputs\":{\"TEXT\":{\"shadow\":{\"type\":\"text\",\"id\":\"eys61uTN%nhQl$(@A09a\",\"fields\":{\"TEXT\":\"abc\"}},\"block\":{\"type\":\"text_join\",\"id\":\"pI68/n|TwP?+.HW!m)~D\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"wrtNHiKtON%B38gE^o=y\",\"fields\":{\"TEXT\":\"JacLy - index: \"}}},\"ADD1\":{\"block\":{\"type\":\"variables_get\",\"id\":\"X94KpDGK,zGh]#o]ZIFH\",\"fields\":{\"VAR\":{\"id\":\"C(8;cYCF}~vSgkxzJ+{O\"}}}}}}}}}}}}}}},{\"type\":\"procedures_callnoreturn\",\"id\":\"Fe%2$R3WXGA-omoqs~U#\",\"x\":51,\"y\":182,\"extraState\":{\"name\":\"main\"}}]},\"variables\":[{\"name\":\"i\",\"id\":\"C(8;cYCF}~vSgkxzJ+{O\"}]}"

const BlocklyEditor: FC<HeaderProps> = ({}) => {

    const {setCode} = useGenerateCode();
    const [json, setJson] = useState<object>(JSON.parse(localStorage.getItem("blockly") || defaultJson));
    const handleWorkspaceChange = (newWorkspace: Blockly.WorkspaceSvg) => {
        console.log("Workspace changed")
        try {
            let jsCode = javascriptGenerator.workspaceToCode(newWorkspace);

            // window.alert to console.log
            jsCode = jsCode.replaceAll("window.alert", "await sleep(1000);console.log");
            jsCode = jsCode.replaceAll("function", "async function");
            setCode(jsCode);
        } catch (e) {
            console.error("Error generating code: " + e);
        }
    };

    const onJsonChange = (newJson: object) => {
        setJson(newJson);
        // save to local storage
        localStorage.setItem("blockly", JSON.stringify(newJson));
    }

    return (
        <BlocklyWorkspace
            className="w-full h-full"
            toolboxConfiguration={INITIAL_TOOLBOX_JSON}
            onWorkspaceChange={handleWorkspaceChange}
            initialJson={json}
            onJsonChange={onJsonChange}
        />
    )
}

export default BlocklyEditor;