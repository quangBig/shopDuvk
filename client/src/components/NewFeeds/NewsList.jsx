import NewsItem from "./NewsItem";

const NewsList = () => {
    const articles = [
        {
            title: "TOP 3 SẢN PHẨM SIÊU HOT TẠI SHOPDUNK",
            image: "nf1.jpeg",
            date: "06/03/2025",
        },
        {
            title: "Dùng iPad như thế nào để nâng cao hiệu quả học tập?",
            image: "nf2.jpeg",
            date: "04/03/2025",
        },
        {
            title: "02 Cách giảm đến 128GB bộ nhớ trên iPhone đơn giản ai cũng có thể thực hiện",
            image: "nf3.png",
            date: "04/03/2025",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
                <NewsItem key={index} article={article} />
            ))}
        </div>
    );
};

export default NewsList;
