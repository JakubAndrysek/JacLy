import classNamesOriginal, {Argument} from "classnames";
import {overrideTailwindClasses} from "tailwind-override";
import {FC, InputHTMLAttributes} from "react";

export const classNamesOverride = (...args: Argument[]) =>
    overrideTailwindClasses(classNamesOriginal(...args));


export interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    text: string,
    classNames?: string,
    onClick?: () => void,
    active?: boolean,

}


const Button: FC<ButtonProps> = ({text, classNames, onClick, active = true}) => {
    return <button
        onClick={onClick}
        className={classNamesOverride(
            "rounded", "p2", "m-1", active ? "bg-blue-300 hover:bg-blue-400" : "bg-gray-300", "focus:outline-none",
        )}>
        {text}
    </button>
}

export default Button;
