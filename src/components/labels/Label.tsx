import classNamesOriginal, {Argument} from "classnames";
import {overrideTailwindClasses} from "tailwind-override";
import {FC, InputHTMLAttributes} from "react";

export const classNamesOverride = (...args: Argument[]) =>
    overrideTailwindClasses(classNamesOriginal(...args));


export interface LabelProps extends InputHTMLAttributes<HTMLInputElement> {
    text: string,
    classNames?: string,
}


const Label: FC<LabelProps> = ({text, classNames}) => {
    return <label
        className={classNamesOverride(
             "p2", "m-2", "bg-blue-500", "label" ,
        )}>
        {text}
    </label>
}

export default Label;
