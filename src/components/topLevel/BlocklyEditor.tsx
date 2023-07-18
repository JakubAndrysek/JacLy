import {FC, InputHTMLAttributes, useRef, useState} from "react";
import {useGenerateCode} from "../../context/GenerateCodeContext";
import Blockly from "blockly";
import {javascriptGenerator} from "blockly/javascript";
import {BlocklyWorkspace} from "react-blockly";
import "./../../customBlocks/customBlocks";

// @ts-expect-error
import {INITIAL_TOOLBOX_JSON} from "../../blockly-config";

export interface HeaderProps extends InputHTMLAttributes<HTMLInputElement> {
}

const defaultJson = "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"variables_set\",\"id\":\"}1_p%V(HNyTe5C:mf~e1\",\"x\":197,\"y\":56,\"fields\":{\"VAR\":{\"id\":\"C(8;cYCF}~vSgkxzJ+{O\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"math_number\",\"id\":\"VDY%P}5af(~Ez)TOfngK\",\"fields\":{\"NUM\":0}}}},\"next\":{\"block\":{\"type\":\"set_interval\",\"id\":\"jVN+X=B5Nj$QTT4^T/Rm\",\"inputs\":{\"INTERVAL\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"|:7NXb@w|PQMij.0B!CL\",\"fields\":{\"NUM\":500}},\"block\":{\"type\":\"math_number\",\"id\":\"{ma][[.bDXk{1b$1:{wv\",\"fields\":{\"NUM\":500}}},\"CODE\":{\"block\":{\"type\":\"console\",\"id\":\"vd{u/{gQGNX@10O?0^`e\",\"fields\":{\"TYPE\":\"log\"},\"inputs\":{\"TEXT\":{\"shadow\":{\"type\":\"text\",\"id\":\"3B;mEtby0w@V..@F-z{H\",\"fields\":{\"TEXT\":\"abc\"}},\"block\":{\"type\":\"text_join\",\"id\":\"pI68/n|TwP?+.HW!m)~D\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"wrtNHiKtON%B38gE^o=y\",\"fields\":{\"TEXT\":\"JacLy - index: \"}}},\"ADD1\":{\"block\":{\"type\":\"variables_get\",\"id\":\"X94KpDGK,zGh]#o]ZIFH\",\"fields\":{\"VAR\":{\"id\":\"C(8;cYCF}~vSgkxzJ+{O\"}}}}}}}},\"next\":{\"block\":{\"type\":\"math_change\",\"id\":\"1/U093lt?YL?,dR6^I^z\",\"fields\":{\"VAR\":{\"id\":\"C(8;cYCF}~vSgkxzJ+{O\"}},\"inputs\":{\"DELTA\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"uL[6zYZsdx%2#+v[CWI!\",\"fields\":{\"NUM\":1}},\"block\":{\"type\":\"math_number\",\"id\":\"RZTdhlLJtqGkDu$Pp}VO\",\"fields\":{\"NUM\":1}}}}}}}}}}}}]},\"variables\":[{\"name\":\"i\",\"id\":\"C(8;cYCF}~vSgkxzJ+{O\"}]}"

const BlocklyEditor: FC<HeaderProps> = ({}) => {

    const {setCode} = useGenerateCode();
    const [json, setJson] = useState<object>(JSON.parse(localStorage.getItem("blockly") || defaultJson));
    const handleWorkspaceChange = (newWorkspace: Blockly.WorkspaceSvg) => {
        console.log("Workspace changed")
        try {
            let jsCode = javascriptGenerator.workspaceToCode(newWorkspace);

            // window.alert to console.log
            // jsCode = jsCode.replaceAll("window.alert", "await sleep(1000);console.log");
            // jsCode = jsCode.replaceAll("function", "async function");
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