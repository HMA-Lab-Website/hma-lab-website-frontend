import React from "react";
import { Badge } from "./Badge";

export const NewsCard = ({ news }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-casal font-medium">
                    {news.date}
                </span>
                <Badge>{news.type}</Badge>
            </div>
            <h4 className="text-xl font-semibold text-firefly mb-2">
                {news.title}
            </h4>
            {news.speaker && (
                <p className="text-nevada font-medium mb-2">
                    Speaker: {news.speaker}
                </p>
            )}
            <p className="text-nevada">{news.description}</p>
        </div>
    );
};
