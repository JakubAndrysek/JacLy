import classNamesOriginal, { Argument } from "classnames";
import { overrideTailwindClasses } from "tailwind-override";

export const classNames = (...args: Argument[]) =>
    overrideTailwindClasses(classNamesOriginal(...args));

export function Button(props: {
    text: string,
    classNames?: string,
    onClick?: () => void
})
{
    return <button onClick={props.onClick}
        className={classNames(
            "rounded", "p2", props.classNames
        )}>{props.text}</button>
}
