import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannnerProduct = () => {
    const images = ["1.png", "3.png", "4.png", "5.png", "6.png"];

    return (
        <div className="relative w-full max-w-[1400px] mx-auto mt-24 ">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000, // Chờ 4s mới đổi slide
                    disableOnInteraction: false // Vẫn autoplay khi người dùng tương tác
                }}
                speed={1000} // Làm chậm tốc độ chuyển đổi slide (mặc định là 300)
                effect="slide" // Làm mềm mượt hơn
                loop={true}
                grabCursor={true}
                className="rounded-xl"
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex justify-center">
                            <img src={src} alt={`Slide ${index + 1}`} className=" transition-all duration-700 ease-in-out" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannnerProduct;
