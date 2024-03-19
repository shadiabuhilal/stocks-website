import classNames from "classnames";
import { IoCloseSharp } from "react-icons/io5"

interface ButtonDeleteProps {
    className?: string;
    onClick: () => void;
}

export default function ButtonDelete({ className, onClick }: ButtonDeleteProps) {
    return <button type="button" className={classNames(className, 'bg-action-color p-2')} onClick={onClick}><IoCloseSharp className="text-remove-btn-color" /></button>
}
