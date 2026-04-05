"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import ReactInstaStories from "react-insta-stories";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoriesViemData } from "@/app/store/slice/storiesSlice";

export default function Story({ startIndex, onClose }) {
  const [swiper, setSwiper] = useState(null);
  const { stories, viem } = useSelector((state) => state.stories);
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window?.screen.width);

  const lastIndex = stories?.length - 1;

  return (
    <div className={s.story__wrapper}>
      <div className={s.story}>
        <Swiper
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={50}
          modules={[]}
          onSwiper={(swip) => {
            setSwiper(swip);
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 100,
            },
          }}
          className={s.mySwiper}
          initialSlide={startIndex}
        >
          {stories?.map((el, index) => {
            return (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <>
                        {screenWidth > 600 ? (
                          <div className={s.wrapper}>
                            <ReactInstaStories
                              className={s.insta}
                              storyStyles={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              width={"400px"}
                              height={"700px"}
                              defaultInterval={el.defaultInterval}
                              stories={el.storis}
                              // onStoryStart={() =>
                              //   dispatch(
                              //     fetchStoriesViemData(el.stories[0].id)
                              //   )
                              // }
                              onStoryEnd={() => {
                                if (index === lastIndex) {
                                  onClose();
                                } else {
                                  swiper.slideNext();
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className={s.mobile_wrapper}>
                            <ReactInstaStories
                              className={s.insta}
                              width={"100%"}
                              height={"100vh"}
                              defaultInterval={el.defaultInterval}
                              stories={el.storis}
                              // onStoryStart={() =>
                              //   dispatch(
                              //     fetchStoriesViemData(el.stories[0].id)
                              //   )
                              // }
                              onStoryEnd={() => {
                                if (index === lastIndex) {
                                  onClose();
                                } else {
                                  swiper.slideNext();
                                }
                              }}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        onClick={() => swiper?.slideTo(index)}
                        className={s.card}
                      >
                        <img
                          style={{
                            border: viem
                              ? "3px solid #C4C4C4"
                              : "3px solid #EE5922",
                          }}
                          src={el.shop_logo}
                          alt=""
                        />
                      </div>
                    )}
                  </>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button onClick={() => onClose()} className={s.close}>
          <MdClose className={s.logo} />
        </button>
      </div>
    </div>
  );
}
