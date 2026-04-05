"use client";
import React, { useEffect, useState, useRef } from "react";
import s from "./page.module.scss";
import Image from "next/image";
import { fetchCategoryData } from "@/app/store/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../Cards/CategoryCard/CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { getCategoryPopularData } from "@/app/store/slice/popularSlice";

import { Inter } from "next/font/google";
import { getCategoryListBrandSlice } from "@/app/store/slice/categoryListBrandSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import {
  BsExclamationCircleFill,
  BsFillExclamationCircleFill,
} from "react-icons/bs";
export default function Categories() {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategoryListBrandSlice());
  }, []);
  const dataBulid = useSelector((state) => state.categoryListBrandSlice);
  useEffect(() => {
    dispatch(fetchCategoryData());
  }, []);

  const [indexAcc, setIndexAcc] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const [search, setSearch] = useState();

  useEffect(() => {
    const screenWidth = window?.innerWidth;

    setSearch(dataBulid?.data?.length - 3);
    if (screenWidth <= 1327) {
      setSearch(dataBulid?.data?.length - 2);
    }
    if (screenWidth <= 768) {
      setSearch(dataBulid?.data?.length - 1);
    }
  }, [dataBulid.data]);

  swiper?.on("slideChange", () => {
    const newIndex = swiper.activeIndex;
    const newNumberOfSlides = swiper.snapGrid.length;
    setIndexAcc(newIndex);
    setSearch(newNumberOfSlides);
  });
  return (
    <>
      <div className={`${s.categories}  `}>
        <div className={`between ${s.block}`}>
          <h3>Категории</h3>
          <div className={s.buttons}>
            <button
              className={s.slidePrev}
              onClick={() =>
                swiper &&
                swiper.slideTo(swiper.activeIndex - swiper.params.slidesPerView)
              }
            >
              <IoIosArrowBack />
            </button>
            <span>
              {indexAcc + 1}/ {search}
            </span>
            <button
              className={s.slideNext}
              onClick={() =>
                swiper &&
                swiper.slideTo(swiper.activeIndex + swiper.params.slidesPerView)
              }
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <div className={s.wrapper}>
          <Swiper
            slidesPerView={4}
            onSwiper={(s) => {
              setSwiper(s);
            }}
            breakpoints={{
              320: {
                slidesPerView: 2.1,
              },
              480: {
                slidesPerView: 2.3,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 3.3,
              },
              1327: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={0}
            className={s.mySwiper}
          >
            {dataBulid.data?.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                  <a href={`/pages/Category/${item.id}`} key={index}>
                    <CategoryCard item={item} />
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className={s.BlcokMobule}>
          {dataBulid.data?.map((item, index) => {
            return (
              <Link
                key={index}
                href={`/pages/Category/${item.id}`}
                className={s.BlcokMobuleCards}
                style={{
                  minWidth: `${
                    item.title.length *
                      (item.title.length <= 5
                        ? 15
                        : item.title.length > 17
                        ? 10
                        : item.title.length > 23
                        ? 8
                        : 12) +
                    30 +
                    10
                  }px`,
                }}
              >
                {item.image ? (
                  <img src={item.image} width={30} height={30} alt="phone" />
                ) : (
                  <div className={s.card_logo}>
                    <BsFillExclamationCircleFill className={s.logo} />
                  </div>
                )}
                <div className={s.title}>
                  <h5>{item.title}</h5>
                  <p>{item.product_count} товар</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
