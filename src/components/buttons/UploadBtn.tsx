import {FC, InputHTMLAttributes} from "react";
import {useDevice} from "../../context/JaculusContext";
import {Buffer} from "buffer";
import Button from "./Button";
import {useGenerateCode} from "../../context/GenerateCodeContext";

export interface UploadBtnProps extends InputHTMLAttributes<HTMLInputElement> {
}

const UploadBtn: FC<UploadBtnProps> = ({}) => {
    const {setNewDevice, disconnectDevice, device} = useDevice();
    const {code} = useGenerateCode();

    let path: string = "code/index.js";
    // let str: string = "console.log(\"Hello World!\");";

    async function upload() {
        if (!device)
            return;

        await device.controller.lock().catch((err) => {
            console.error("Error locking device: " + err);
            throw 1;
        });

        await device.controller.stop().catch((err) => {
            console.error("Error stopping device: " + err);
        });

        let buff = Buffer.from(code, "utf-8")
        const cmd = await device.uploader.writeFile(path, buff).catch((err) => {
            console.error("Error: " + err + "\n");
            throw 1;
        });
        console.log(cmd.toString() + "\n");

        await device.controller.start("index.js").catch((err) => {
            console.error("Error starting program: " + err + "\n");
            throw 1;
        });

        await device.controller.unlock().catch((err) => {
            console.log("Error unlocking device: " + err);
            throw 1;
        });
    }

    let whenDisconnected = () => {
        return <>
            <Button text="Upload" active={false}/>
        </>;
    }

    let whenConnected = () => {
        return <>
            <Button text="Upload" active={true} onClick={upload}/>
        </>;
    }

    return (
        <>
            {device ? whenConnected() : whenDisconnected()}
        </>
    );
}

export default UploadBtn;