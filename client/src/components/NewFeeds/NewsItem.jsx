const NewsItem = ({ article }) => {
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="font-semibold text-lg">{article.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{article.date}</p>
            </div>
        </div>
    );
};

export default NewsItem;
