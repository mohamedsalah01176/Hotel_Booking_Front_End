import Slider from "react-slick";
import PropertyCard from "../PropertyCard";
import type { HorizontalCardSliderProps } from "../../interface/HorizontalCardSliderProps";

const HorizontalCardSlider = ({ title, items }: {title:string,items:HorizontalCardSliderProps[]}) => {
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
          <PropertyCard item={item}/>
        ))}
      </Slider>
    </div>
  );
};

export default HorizontalCardSlider;
