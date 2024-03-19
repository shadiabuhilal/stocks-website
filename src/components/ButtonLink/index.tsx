import classNames from "classnames";

interface ButtonLinkProps {
    className?: string;
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export default function ButtonLink({ className, children, onClick, disabled }: ButtonLinkProps) {
    return <button type="button" className={classNames(className, "text-link-color")} onClick={onClick} disabled={disabled}>{children}</button>
}
