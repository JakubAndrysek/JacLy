import {FC, InputHTMLAttributes} from "react";

export interface HeaderProps extends InputHTMLAttributes<HTMLInputElement> {
}

const Header: FC<HeaderProps> = ({}) => {

    return (
        <div className='w-full text-xl p-2'>
            JacLy
        </div>
    );
}

export default Header;