export const NewsCard = ({ date, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-iron/10">
        <div className="text-sm text-casal font-medium mb-2">{date}</div>
        <h3 className="text-firefly text-xl font-semibold mb-3 hover:text-casal transition-colors duration-200">
            {title}
        </h3>
        <p className="text-nevada leading-relaxed">{description}</p>
    </div>
);
