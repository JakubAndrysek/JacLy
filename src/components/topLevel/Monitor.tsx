import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { useDevice } from "../../context/JaculusContext";
import Button from "../buttons/Button";
import { Input } from "blockly";
import { ValueInput } from "blockly/core/inputs";
import Label from "../labels/Label";

export interface HeaderProps extends InputHTMLAttributes<HTMLInputElement> { }

const Monitor: FC<HeaderProps> = ({ }) => {
    const { device } = useDevice();

    const [text, setText] = useState("");
    const [max_rows, set_rows] = useState("");
    const appendText = (t: string) => setText(text + t);

    const max_lines = 12;

    useEffect(() => {
        if (!device) {
            return;
        }

        device.programOutput.onData((data) => {
            let local_text = text + data.toString();
            let list_text = local_text.split("\n");
            list_text.pop();

            while (list_text.length > max_lines) {
                for (let index = 0; index < list_text.length - 1; index++) {
                    list_text[index] = list_text[index + 1];
                }
                list_text.pop();
            }

            setText(list_text.join("\n") + "\n");
        });
        device.programError.onData((data) => {
            let local_text = text + data.toString();
            let list_text = local_text.split("\n");
            list_text.pop();

            while (list_text.length > max_lines) {
                for (let index = 0; index < list_text.length - 1; index++) {
                    list_text[index] = list_text[index + 1];
                }
                list_text.pop();
            }
            setText(list_text.join("\n") + "\n");
        });
    }, [device, setText, text]);

    return (
        <div className="monitor h-full flex flex-col m-0 p-0">
            <div className="white_text flex flex-row">
                <Button text="Clear" classNames="" onClick={() => setText("")} />
                <Label text={"Showing " + max_lines + " lines"}></Label>
            </div>

            <div className="white_text flex w-full overflow-y-scroll bg-gray-700 m-2 p-2 font-mono rounded">
                <pre className="inline-block">{text}</pre>
            </div>
        </div>
    );
};

export default Monitor;