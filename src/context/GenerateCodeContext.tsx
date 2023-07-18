import {createContext, FC, InputHTMLAttributes, useContext, useState} from "react";

export const GenerateCodeContext = createContext({
    code: "",
    setCode: (code: string) => {
    },
});

interface GenerateCodeProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const GenerateCodeProvider: FC<GenerateCodeProps> = ({children}) => {
    const [code, setCode] = useState<string>("");

    return (
        <GenerateCodeContext.Provider
            value={{
                code: code,
                setCode: setCode,
            }}
        >
            {children}
        </GenerateCodeContext.Provider>
    );
};

export default GenerateCodeProvider;

export function useGenerateCode() {
    return useContext(GenerateCodeContext);
}