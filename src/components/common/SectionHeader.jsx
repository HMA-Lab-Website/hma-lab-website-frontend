export const SectionHeader = ({ title, subtitle }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-firefly mb-4">{title}</h2>
        {subtitle && (
            <p className="text-nevada text-lg max-w-2xl mx-auto">{subtitle}</p>
        )}
    </div>
);
