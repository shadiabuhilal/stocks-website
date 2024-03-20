interface ShowOnHoverProps {
    children: React.ReactNode;
}

export default function ShowOnHover({ children }: ShowOnHoverProps) {
    return <div className="w-full h-full opacity-0 hover:opacity-100 focus:opacity-100">
        {children}
    </div>
}
