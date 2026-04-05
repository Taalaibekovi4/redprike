"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import s from "./page.module.scss";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function Slider({ item }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {});
  }, []);

  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={s.mySwiper2}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {item.images.map((el, index) => {
          return (
            <SwiperSlide>
              <a href={el.image} data-fancybox="gallery">
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={el.image}
                  alt=""
                />
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={s.mySwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {item.images.map((el, index) => {
          return (
            <SwiperSlide
              key={index}
              className={s.slide}
              style={{
                backgroundImage: `url(${el.image})`,
                opacity: index === activeIndex ? 1 : 0.3,
              }}
            ></SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
