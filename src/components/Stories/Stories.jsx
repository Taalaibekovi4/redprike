"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { GrNext, GrPrevious } from "react-icons/gr";

import { FreeMode, Navigation } from "swiper/modules";
import Story from "../Story/Story";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoriesData } from "@/app/store/slice/storiesSlice";
import Image from "next/image";
import axios from "axios";

export const Stories = () => {
  const [showStoriesModal, setShowStoriesModal] = useState(false);
  const [showStoryIndex, setShowStoryIndex] = useState(0);
  const dispatch = useDispatch();
  const { stories, viem } = useSelector((state) => state.stories);

  useEffect(() => {
    dispatch(fetchStoriesData());
  }, []);

  const handleClick = (item) => {
    setShowStoryIndex(stories.indexOf(item));
    setShowStoriesModal(!showStoriesModal);
  };

  return (
    <>
      {showStoriesModal && (
        <Story
          onClose={() => setShowStoriesModal(false)}
          startIndex={showStoryIndex}
        />
      )}
      {stories?.length > 0 && (
        
      <div className={s.stories}>
      <div className="">
        <h2>Истории</h2>
        <div className={s.wraper}>
          <Swiper
            slidesPerView={6}
            spaceBetween={8}
            freeMode={true}
            navigation={{
              prevEl: ".prev",
              nextEl: ".next",
            }}
            breakpoints={{
              768: {
                slidesPerView: 6,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 8,
                spaceBetween: 16,
              },
            }}
            modules={[Navigation, FreeMode]}
            className={s.mySwiper}
          >
            {stories?.map((e, index) => {
              return (
                
                  <SwiperSlide key={index}>
                    <div onClick={() => handleClick(e)} className={s.story}>
                      <div
                        className={viem ? `${s.activ_border}` : `${s.border}`}
                      >
                        {e.shop_logo ? (
                          <img src={e.shop_logo} alt="" />
                        ) : (
                          <Image
                            src={"/img/adam.svg"}
                            alt="/"
                            width={30}
                            height={30}
                          />
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
            })}
          </Swiper>
          <button className={"prev"}>
            <GrPrevious className={s.logo} />
          </button>
          <button className={"next"}>
            <GrNext className={s.logo} />
          </button>
        </div>
      </div>
    </div>
      )}
    </>
  );
};
