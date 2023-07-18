import {FC, InputHTMLAttributes} from "react";
import {Button} from "./Button";
import {JacDevice} from "jaculus-tools/dist/src/device/jacDevice.js";
import {useDevice} from "../context/JaculusContext";
export interface buttonProps extends InputHTMLAttributes<HTMLInputElement> {
    // device: JacDevice | null;
    // setDevice: (device: JacDevice | null) => void;
}

const ConnectionButton: FC<buttonProps> = ({}) => {
    const {setConnected, connected} = useDevice();
    const connect = () => {
        console.log("connect")
        setConnected(!connected);
    }

    return (
        <div>
            <Button text="Connect" onClick={connect}/>
            {connected ? <p>Connected</p> : <p>Not connected</p>}
        </div>
    );
}

export default ConnectionButton;