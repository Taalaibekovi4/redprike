"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import s from "./page.module.scss";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerData } from "@/app/store/slice/bannerSlice";
import Image from "next/image";
import Link from "next/link";

export default function NewSlider() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.banner);

  const banner = data?.results;

  useEffect(() => {
    dispatch(fetchBannerData());
  }, []);

  const customPaginationClass = "custom_pagination";

  const handlePaginationRef = (pagination) => {
    if (pagination && pagination.el) {
      pagination.el.classList.add(customPaginationClass);
    }
  };
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class=${className}>
            <div class='border'></div>
            </span>`;
          },
          bulletClass: "bullet",
          bulletActiveClass: "swiperactive",
        }}
        modules={[Autoplay, Pagination]}
        className={s.mySwiper}
        onSwiper={(swiper) => {
          handlePaginationRef(swiper.pagination);
        }}
      >
        {banner?.map((e) => {
          return (
            <SwiperSlide key={e.id} className={s.new_slide}>
              <Link target="_blank" href={e.url}>
                <Image
                  height={396}
                  width={1280}
                  src={e.banner}
                  objectFit="cover"
                  alt=""
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
