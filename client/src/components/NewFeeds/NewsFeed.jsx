import NewsList from "./NewsList";

const NewsFeed = () => {
    return (
        <div className="max-w-[1200px] mx-auto my-8">
            <h2 className="text-2xl font-bold text-center mb-6">Newsfeed</h2>
            <NewsList />
            <div className="flex justify-center mt-6">
                <button className="bg-white text-blue-600 border border-blue-600 font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:text-white hover:scale-105">
                    Xem tất cả Tin Tức
                </button>
            </div>
        </div>
    );
};

export default NewsFeed;
