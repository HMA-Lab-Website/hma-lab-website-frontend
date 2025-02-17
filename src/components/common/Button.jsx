export const Button = ({
    children,
    variant = "primary",
    className = "",
    ...props
}) => {
    const variants = {
        primary:
            "bg-firefly hover:bg-san-juan text-iron border border-transparent",
        secondary:
            "bg-casal hover:bg-gothic text-white border border-transparent",
        outline:
            "bg-transparent border-2 border-iron text-iron hover:bg-iron/10",
        outline1:
            "bg-gray-400 border-2 border-gray-500 text-iron hover:bg-iron/10",
    };

    return (
        <button
            className={`px-8 py-3 rounded-lg font-medium inline-flex items-center 
                     transition-all duration-200 shadow-md hover:shadow-lg 
                     transform hover:-translate-y-0.5 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
