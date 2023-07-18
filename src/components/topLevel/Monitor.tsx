import {FC, InputHTMLAttributes, useEffect, useState} from "react";
import {useDevice} from "../../context/JaculusContext";
import Button from "../buttons/Button";

export interface HeaderProps extends InputHTMLAttributes<HTMLInputElement> {
}

const Monitor: FC<HeaderProps> = ({}) => {
    const {device} = useDevice();

    const [text, setText] = useState("");
    const appendText = (t: string) => setText(text + t);

    useEffect(() => {
        if (!device) {
            return;
        }
        device.programOutput.onData((data) => {
            appendText(data.toString());
        });
        device.programError.onData((data) => {
            appendText(data.toString());
        });
    }, [device, setText, text]);

    return (
        <div className="h-full flex flex-col m-0 p-0">
            <div className='w-full m-0'>
                <Button text="Clear"
                        classNames='bg-blue-300 m- w-full '
                        onClick={() => setText("")}/>
            </div>
            <div className='flex-1 w-full h-full overflow-y-scroll bg-gray-700 m-2 p-2 font-mono rounded'>
                <pre className='inline-block '>
                    {text}
                </pre>
            </div>
        </div>
    );
}

export default Monitor;