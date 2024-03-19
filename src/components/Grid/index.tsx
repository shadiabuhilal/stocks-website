import classNames from "classnames"

interface GridProps {
    children: React.ReactNode | Array<React.ReactNode>;
}

export default function Grid({ children }: GridProps) {
    return <div role="table">{children}</div>
}

interface GridRowProps {
    className: string;
    children: React.ReactNode | Array<React.ReactNode>;
    isHeader?: boolean;
    isLoading?: boolean;
}

Grid.Row = function Row({ className, children, isHeader, isLoading }: GridRowProps) {

    return <div role={isHeader ? 'rowheader' : 'row'} className={
        classNames(
            className,
            "grid border-b border-b-grid-border-color",
            {
                "bg-grid-header-color": isHeader,
                "animate-pulse": isLoading
            })
    }>{children}</div>
}

interface GridCellProps {
    className?: string;
    children: React.ReactNode | Array<React.ReactNode>;
    isHeader?: boolean;
    isLoading?: boolean;
}

Grid.Cell = function Cell({ className, children, isHeader, isLoading }: GridCellProps) {
    return <div role={isHeader ? 'columnheader' : 'cell'} className={classNames(
        className,
        "py-4 align-middle text-center",
        "border-s border-s-grid-border-color",
        "last:border-e last:border-e-grid-border-color",
        {
            "font-bold": isHeader
        })}>
        {isLoading && <span className="inline-block rounded-full w-1/4 h-6 bg-gradient-to-r from-loading-from-color to-loading-to-color animate-pulse"></span>}
        {!isLoading && children}
    </div>
}