import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandsData } from "@/app/store/slice/brandsSlice";
import BrandCard from "../Cards/BrandCard/BrandCard";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ToastContainer } from "react-toastify";

export default function Brands() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.brand);
  const [indexAcc, setIndexAcc] = useState(0);
  const [search, setSearch] = useState(10);
  useEffect(() => {
    dispatch(fetchBrandsData(1));
  }, []);
  const cartData = data?.results;

  useEffect(() => {
    const screenWidth = window?.innerWidth;

    if (screenWidth <= 1023) {
      setSearch(cartData?.length - 3);
    } else {
      setSearch(cartData?.length - 5);
    }
  }, [cartData]);
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", () => {
        const newIndex = swiper.activeIndex;
        const newNumberOfSlides = swiper.snapGrid.length;
        setIndexAcc(newIndex);
        setSearch(newNumberOfSlides);
      });
    }
  }, [swiper]);

  return (
    <>
      <ToastContainer
        className={s.ToastContainer}
        autoClose={1000}
        limit={5}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className={`${s.brands}`}>
        <div className="">
          <div className={s.wrapper}>
            <div className={s.title}>
              <h2>Бренды</h2>
              <div className={s.buttons}>
                <button
                  className={s.slidePrev}
                  onClick={() =>
                    swiper &&
                    swiper.slideTo(
                      swiper.activeIndex - swiper.params.slidesPerView
                    )
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
                    swiper.slideTo(
                      swiper.activeIndex + swiper.params.slidesPerView
                    )
                  }
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
            <Swiper
              slidesPerView={3}
              spaceBetween={16}
              freeMode={true}
              onSwiper={(s) => {
                setSwiper(s);
              }}
              breakpoints={{
                0: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                458: {
                  slidesPerView: 3.5,
                  spaceBetween: 20,
                },
                677: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
              }}
              modules={[FreeMode, Pagination]}
              className={s.mySwiper}
            >
              {cartData?.map((item) => {
                return (
                  <SwiperSlide className={s.card} key={item.id}>
                    <Link href={`/pages/Brands/${item.id}`}>
                      <BrandCard item={item} />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
