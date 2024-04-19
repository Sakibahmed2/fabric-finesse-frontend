"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import banner1 from "@/assets/mensPolo.jpg";
import banner2 from "@/assets/womensKurti.jpg";
import banner3 from "@/assets/kidsTshairt.jpg";
import banner4 from "@/assets/womanDress.webp";

import Image from "next/image";

const Carousel = () => {
  const settings = {
    className: "center mx-4",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    centerPadding: "60px",
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto slider-container">
      <Slider {...settings}>
        <div className="border-black border w-[200px] rounded-md ">
          <Image
            className="mx-auto"
            src={banner1}
            width={300}
            height={300}
            alt="banner1"
          />
        </div>
        <div className="border-black border w-[200px] rounded-md ">
          <Image
            className="mx-auto"
            src={banner2}
            width={300}
            height={300}
            alt="banner2"
          />
        </div>
        <div className="border-black border w-[200px] rounded-md ">
          <Image
            className="mx-auto"
            src={banner3}
            width={300}
            height={300}
            alt="banner3"
          />
        </div>
        <div className="border-black border w-[200px] rounded-md ">
          <Image
            className="mx-auto"
            src={banner4}
            width={300}
            height={300}
            alt="banner4"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
