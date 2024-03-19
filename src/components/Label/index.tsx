import classNames from "classnames";

interface LabelProps {
    className?: string;
    children: React.ReactNode;
    htmlFor?: string;
}

export default function Label({ htmlFor, className, children }: LabelProps) {
    return <label htmlFor={htmlFor} className={classNames(className, "me-2")}>{children}</label>
}
