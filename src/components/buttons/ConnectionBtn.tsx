import {FC, InputHTMLAttributes} from "react";
import {JacDevice} from "jaculus-tools/dist/src/device/jacDevice.js";
import {useDevice} from "../../context/JaculusContext";
import {WebSerialStream} from "../../jac-glue";
import Button from "./Button";

export interface ConnectionBtnProps extends InputHTMLAttributes<HTMLInputElement> {
}

const ConnectionBtn: FC<ConnectionBtnProps> = ({}) => {
    const {setNewDevice, disconnectDevice, device} = useDevice();

    const connectDevice = () => {
        navigator.serial.requestPort()
            .then(async port => {
                await port.open({baudRate: 921600});
                let stream = new WebSerialStream(port);
                setNewDevice(new JacDevice(stream))
            })
            .catch((e) => {
                alert(e.toString());
                disconnectDevice();
            })
    }

    let whenDisconnected = () => {
        return <>
            <span className="px-2 text-orange-500">Not connected</span>
            <Button text="Connect" onClick={connectDevice}/>
        </>;
    }

    let whenConnected = () => {
        return <>
            <span className="px-2 text-green-500">Connected</span>
            <Button text="Disconnect" onClick={disconnectDevice}/>
        </>;
    }

    return (
        <>
            {device ? whenConnected() : whenDisconnected()}
        </>
    );
}

export default ConnectionBtn;