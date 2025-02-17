export const Badge = ({ children, type = "default" }) => {
    const colorMap = {
        default: "bg-casal/10 text-casal",
        success: "bg-green-100 text-green-700",
        warning: "bg-yellow-100 text-yellow-700",
        error: "bg-red-100 text-red-700",
    };

    return (
        <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${colorMap[type]}`}
        >
            {children}
        </span>
    );
};
