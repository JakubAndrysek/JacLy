import {FC, InputHTMLAttributes} from "react";
import ConnectionBtn from "../buttons/ConnectionBtn";
import UploadBtn from "../buttons/UploadBtn";
export interface buttonProps extends InputHTMLAttributes<HTMLInputElement> {
}

const ConnectionBar: FC<buttonProps> = ({}) => {

    return (
        <div className={"w-full bg-gray-200 rounded p-2 mb-2"}>
            <ConnectionBtn/>
            <UploadBtn/>
        </div>
    );
}

export default ConnectionBar;