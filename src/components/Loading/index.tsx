import classNames from "classnames";
import { PulseLoader } from "react-spinners";

interface LoadingProps {
    className?: string;
}

export default function Loading({ className }: LoadingProps) {
    return <PulseLoader className={classNames(className, 'inline-block mt-2')} color="#36d7b7" />
}
