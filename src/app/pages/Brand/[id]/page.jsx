"use client";
import React, { useEffect, useRef, useState } from "react";
import s from "./page.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandFilterData,
  fetchBrandsData,
  fetchProduktData,
} from "@/app/store/slice/brandsSlice";
import BrandCard from "@/components/Cards/BrandCard/BrandCard";
import Card from "@/components/Cards/Card/Card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cm from "classnames";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { getCategoryListBrandSlice } from "@/app/store/slice/categoryListBrandSlice";
import CategoriesCard from "@/components/Cards/CategoriesCard/CategoriesCard";

import SwiperCore, { Navigation } from "swiper";

import "swiper/css/navigation";
import { fetchBanerFilterData } from "@/app/store/slice/banerFIlterData";

import { BsExclamationCircleFill } from "react-icons/bs";
// install Swiper modules
SwiperCore.use([Navigation]);
export default function page({ params: { id } }) {
  const dispatch = useDispatch();
  const page = usePathname();
  const [pageBase, setPageBase] = useState(null);
  const [pages, setPages] = useState(1);
  const dataBulid = useSelector((state) => state.categoryListBrandSlice);

  const [datas, setDatas] = useState([]);
  useEffect(() => {
    dispatch(getCategoryListBrandSlice());
    const data = {
      page: pages,
      categoryId: id,
      brand: pageBase,
    };
    dispatch(fetchBanerFilterData(data));
  }, [pages]);
  const refs = useRef([]);
  const customPaginationClass = "custom_pagination";
  const filterPageBase = (ids) => {
    const data = {
      page: pages,
      categoryId: id,
      brand: ids,
    };
    setPageBase(ids);
    setDatas([]);
    setPages(1);
    dispatch(fetchBanerFilterData(data));
  };
  const handlePaginationRef = (pagination) => {
    if (pagination && pagination.el) {
      pagination.el.classList.add(customPaginationClass);
    }
  };
  const dataCa = dataBulid?.data?.filter((item) => item.id === Number(id));
  const { satus, error, data } = useSelector((state) => state.banerSlice);
  const indexData = data?.countl;

  useEffect(() => {
    if (satus === "succeeded") {
      setDatas((prevData) => {
        return [...prevData, ...(data?.results ?? [])];
      });
    }
  }, [data]);

  useEffect(() => {
    setDatas([]);
    setPages(1);
  }, [id]);
  const resultsIndex = Math.ceil(data?.count / 15);

  return (
    <div className={s.brand}>
      <div className="container">
        <div className={s.wrapper}>
          <div className={s.letf}>
            <h2 className={s.title}>Категории</h2>
            <div className={s.categoryMobile}>
              {dataBulid?.data?.map((item, index) => {
                return (
                  <Link
                    className={cm(s.categoryMobileCard, {
                      [s.categoryMobileCardAcc]:
                        page === `/pages/Brand/${item.id}`,
                    })}
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
                    href={`/pages/Brand/${item.id}`}
                  >
                    {item.image !== null ? (
                      <img
                        src={item.image}
                        alt=""
                        style={{ height: "30px", width: "30px" }}
                      />
                    ) : (
                      <div className={s.card_logo123}>
                        <BsExclamationCircleFill
                          className={s.logo123}
                          style={{ height: "30px", width: "30px" }}
                        />
                      </div>
                    )}
                    <span>
                      <p>{item.title}</p>
                      <h5>{item.product_count} видов</h5>
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className={s.left_wrapper}>
              {dataBulid?.data?.map((item) => {
                return (
                  <Link
                    className={`${s.cart} ${
                      page === `/pages/Brand/${item.id}` ? s.active : ""
                    }`}
                    href={`/pages/Brand/${item.id}`}
                  >
                    <CategoriesCard item={item} />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={s.rigth_wrapper}>
            <div>
              <>
                <>
                  {dataCa?.length > 0 && (
                    <>
                      <h2 className={s.title}>Бренды</h2>
                      <div className={s.category}>
                        <Swiper
                          slidesPerView={5.5}
                          breakpoints={{
                            0: {
                              slidesPerView: 1.9,
                            },

                            379: {
                              slidesPerView: 2.1,
                            },
                            450: {
                              slidesPerView: 2.5,
                            },
                            639: {
                              slidesPerView: 3.5,
                            },
                            693: {
                              slidesPerView: 1.5,
                            },
                            724: {
                              slidesPerView: 2.1,
                            },
                            811: {
                              slidesPerView: 2.5,
                            },
                            995: {
                              slidesPerView: 3.5,
                            },
                            1006: {
                              slidesPerView: 3.5,
                            },
                            1382: {
                              slidesPerView: 4.5,
                            },
                          }}
                          spaceBetween={20}
                        >
                          <SwiperSlide
                            className={cm(s.sasdasdas, {
                              [s.active]: pageBase === null,
                            })}
                            onClick={() => filterPageBase(null)}
                          >
                            Все
                          </SwiperSlide>
                          {dataCa[0]?.shops?.map((item, index) => {
                            return (
                              <SwiperSlide
                                key={index}
                                className={cm(s.sasdasdas, {
                                  [s.active]: pageBase === item.id,
                                })}
                                onClick={() => filterPageBase(item.id)}
                              >
                                <img src={item?.logo} alt="asdasdasd" />
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </div>
                    </>
                  )}
                </>
              </>
              <div className={s.rigth}>
                {satus === "succeeded" &&
                  datas?.length > 0 &&
                  datas?.map((item) => (
                    <div key={item.id}>
                      <Card item={item} />
                    </div>
                  ))}
              </div>

              {satus === "loading" && (
                <Box className={s.btn_all}>
                  <CircularProgress />
                </Box>
              )}
              {satus !== "loading" && datas?.length === 0 && (
                <div className={s.brandNone}>
                  <img src="/img/brandNone.svg" alt="" />
                  <h4>Ничего не найдено</h4>
                  <p>
                    По вашему запросу ничего не найдено, вы можете повторить
                    поиск с другими словами.
                  </p>
                </div>
              )}
            </div>
            {satus === "succeeded" && resultsIndex > pages && (
              <div className={s.btn_all}>
                <button
                  onClick={() => setPages(pages + 1)}
                  className={s.button}
                >
                  Показать все
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// <h2 className={s.title}>Категории</h2>
// <Link
//   className={cm(s.btn, s.s, {
//     [s.active]: page === `/pages/Brand/all`,
//   })}
//   href={`/pages/Brand/all`}
// >
//   Все
// </Link>

// {filter?.map((item) => {
//   return (
//     <div key={item.id}>
//       <Card item={item} />
//     </div>
//   );
// })}
