export const ResearchArea = ({ title, description, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-lg font-semibold text-san-juan">{title}</h3>
        <p className="text-nevada mt-2">{description}</p>
    </div>
);
