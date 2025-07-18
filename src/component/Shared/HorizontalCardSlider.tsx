import Slider from "react-slick";
import type { HorizontalCardSliderProps } from "../../interface/HorizontalCardSliderProps";

const HorizontalCardSlider = ({ title, items }: HorizontalCardSliderProps) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="px-4 md:px-8 my-10 cursor-pointer">
      <h2 className="text-xl font-bold mb-4">
        {title} <span className="text-rose-500">›</span>
      </h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="pr-3">
            <div className="relative rounded-xl overflow-hidden">
              <img
                loading="lazy"
                src={item.image}
                alt={item.title}
                className="w-full h-45 object-cover rounded-2xl"
              />
              {/* <span className="absolute top-2 left-2 bg-white text-xs font-semibold rounded-full px-3 py-1 shadow">
                Guest favorite
              </span> */}
            </div>
            <div className="mt-2 text-sm">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-500">
                ج.م  {item.price} ل 2 ليالٍ  • ★  {item.rating}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HorizontalCardSlider;
