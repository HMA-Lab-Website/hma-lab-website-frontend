// src/components/admin/AdminCard.jsx
export const AdminCard = ({ title, count, icon }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-iron/10">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold text-firefly">
                        {count}
                    </h3>
                    <p className="text-nevada mt-1">{title}</p>
                </div>
                <div className="text-casal text-2xl">
                    <i className={icon}></i>
                </div>
            </div>
        </div>
    );
};
