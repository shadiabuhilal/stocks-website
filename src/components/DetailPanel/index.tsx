import classNames from "classnames"
import Label from "../Label"

interface DetailPanelProps {
    panelTitle: string;
    KeyValuePairList: Array<{ key: string, value: any }>;
    className?: string;
}

export default function DetailPanel({ panelTitle, className, KeyValuePairList }: DetailPanelProps) {
    return <section className={classNames("border p-2 min-h-60", className)}>
        <h2 className="text-xl font-bold">{panelTitle}</h2>
        <dl>
            <div className="m-4 grid grid-cols-2 gap-4 max-w-96">
                {KeyValuePairList.map(({ key, value }) => {
                    return <div>
                        <Label>{key}:</Label><span>{value}</span>
                    </div>
                })}
            </div>
        </dl>
    </section>
}
