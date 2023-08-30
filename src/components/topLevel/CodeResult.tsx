import {FC, InputHTMLAttributes} from "react";
import {useGenerateCode} from "../../context/GenerateCodeContext";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { dark, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// @ts-expect-error
import {INITIAL_TOOLBOX_JSON} from "../../blockly-config";

export interface CodeResultProps extends InputHTMLAttributes<HTMLInputElement> {
}


const CodeResult: FC<CodeResultProps> = ({}) => {
    const {code} = useGenerateCode();


    return (
        <div className="flex-1 w-full h-full overflow-auto m-1 p-1 font-mono rounded">
            <SyntaxHighlighter language="javascript" style={oneDark} showLineNumbers >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeResult;