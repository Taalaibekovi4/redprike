"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import Slider from "@/components/Slider/CardSlider/CardSlider";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "@/app/store/slice/productSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  fetchBasketData,
  fetchBasketPostData,
  fetchBasketUpdate,
} from "@/app/store/slice/basketSlice";
import { fetchFavoritesPatchData } from "@/app/store/slice/favoritesSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import { BiPlus, BiMinus } from "react-icons/bi";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Masonry from "react-smart-masonry";
export default function page({ params: { id } }) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [index, setIndex] = useState(0);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const { data, error } = useSelector((state) => state.basket);
  const { product, loading } = useSelector((state) => state.product);
  const { dataId, favorites } = useSelector((state) => state.favorites);

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    dispatch(fetchProductData(id));
  }, []);

  useEffect(() => {
    dispatch(fetchBasketData());
  }, [index]);

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery_1']", {});
  }, []);

  const checkFav = (id) => {
    return favorites?.findIndex((e) => e.id === id) !== -1;
  };
  const checkBasket = (id) => {
    return data?.findIndex((e) => e.product_variations.id === id) !== -1;
  };

  const selectByFav = (valIfFav, valIfNotFav) =>
    isFavorited ? valIfFav : valIfNotFav;

  const [isFavorited, setIsFavorited] = useState(checkFav(product?.id));

  const { userInfo } = useSelector((state) => state.signIn);

  useEffect(() => {
    setIsAdded(checkBasket(product?.product_variation[index]?.id));
  }, [data]);

  useEffect(() => {
    setIsFavorited(checkFav(product?.id));
  }, [favorites]);

  const handleFavorites = (id) => {
    if (isFavoriteLoading) {
      return;
    }
    setIsFavorited(!isFavorited);
    setIsFavoriteLoading(true);
    dispatch(fetchFavoritesPatchData(id));
    setIsFavoriteLoading(false);
  };

  const addToHandleBasket = (id) => {
    if (!isAdded) {
      dispatch(fetchBasketPostData(id));
    }
  };

  console.log(product);

  return (
    <>
      <div className={s.nav}>
        <div className={s.new}>Новинка</div>
        <Nav />
      </div>
      <div className={s.blog}>
        <ToastContainer
          stacked
          className={""}
          autoClose={1000}
          limit={100}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="container">
          {loading ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "50px 0",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <div className={s.gap}>
              <div className={s.link}>
                {userInfo !== null && (
                  <button
                    className={s.btn}
                    onClick={() => handleFavorites(product?.id)}
                  >
                    <FaStar className={s.logo} />

                    <span>
                      {isFavorited
                        ? "Убрать из избранного"
                        : "Добавить в избранное"}
                    </span>
                  </button>
                )}
              </div>
              <div className={s.wrapper}>
                <>
                  {product?.product_variation[index]?.images.length > 0 ? (
                    <Slider item={product?.product_variation[index]} />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src="/img/image-none.svg" />
                    </div>
                  )}
                </>
                <div className={s.info}>
                  <h3>
                    {product?.title}
                    <span>
                      {product?.product_variation[index]?.product_price}
                      {
                        product?.product_variation[index]?.currency_unit
                          ?.currency
                      }
                    </span>
                  </h3>
                  <p>{product?.description}</p>
                  <ul className={s.ul}>
                    {product?.product_variation?.map((el, ind) => {
                      return (
                        <li
                          style={{
                            backgroundColor: el?.color?.color_code,
                          }}
                          onClick={() => setIndex(ind)}
                          key={ind}
                        >
                          {ind === index && <span></span>}
                        </li>
                      );
                    })}
                  </ul>
                  <div className={s.title}>
                    <p>
                      <span>Koд товара:</span>
                      <span className={s.bold}>
                        {product?.product_variation[index]?.product_code}
                      </span>
                    </p>
                    <p>
                      <span>Цвет:</span>
                      <span className={s.bold}>
                        {product?.product_variation[index]?.color?.title}
                      </span>
                    </p>
                    <p>
                      <span>Наличие:</span>
                      {product?.product_variation[index]?.color_amount > 0 ? (
                        <span className={s.bold}>Есть в наличии</span>
                      ) : (
                        <span className={s.bold}>Нет в наличии</span>
                      )}
                    </p>
                  </div>
                  <div className={s.text}>
                    <span className={s.bold}>Комплектация:</span>
                    <p>Описание комплектации товара</p>
                  </div>
                  <div className={s.button}>
                    {isAdded ? (
                      <div className={s.check}>
                        <button
                          onClick={() =>
                            dispatch(
                              fetchBasketUpdate({
                                plus: false,
                                product_id: data?.find(
                                  (e) =>
                                    e.product_variations.id ===
                                    product?.product_variation[index].id
                                )?.id,
                                product_count: data?.find(
                                  (e) =>
                                    e.product_variations.id ===
                                    product?.product_variation[index].id
                                )?.product_count,
                              })
                            )
                          }
                        >
                          <BiMinus className={s.logo} />
                        </button>
                        <span>
                          {
                            data?.find(
                              (e) =>
                                e.product_variations.id ===
                                product?.product_variation[index].id
                            )?.product_count
                          }
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              fetchBasketUpdate({
                                plus: true,
                                product_id: data?.find(
                                  (e) =>
                                    e.product_variations.id ===
                                    product?.product_variation[index].id
                                )?.id,
                                product_count: data?.find(
                                  (e) =>
                                    e.product_variations.id ===
                                    product?.product_variation[index].id
                                )?.product_count,
                              })
                            )
                          }
                        >
                          <BiPlus className={s.logo} />
                        </button>
                      </div>
                    ) : (
                      <>
                        {product?.product_variation[index]?.color_amount > 0 ? (
                          <button
                            onClick={() =>
                              addToHandleBasket(
                                product?.product_variation[index]?.id
                              )
                            }
                            className={s.btn}
                          >
                            В КОРЗИНУ
                          </button>
                        ) : (
                          <button
                            style={{
                              opacity: 0.5,
                            }}
                            className={s.btn}
                          >
                            В КОРЗИНУ
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={s.characteristics}>
                <h3>Характеристики</h3>
                <ul>
                  <li className={s.left}>
                    <p>
                      <span>Koд товара:</span>
                      <span className={s.bold}>
                        {product?.product_variation[index]?.product_code}
                      </span>
                    </p>
                    <p>
                      <span>Цвет:</span>
                      <span className={s.bold}>
                        {product?.product_variation?.[index]?.color?.title}
                      </span>
                    </p>
                  </li>
                  <li className={s.center}>
                    <p>
                      <span>Количество:</span>
                      <span className={s.bold}>
                        {product?.product_variation[index]?.color_amount}
                      </span>
                    </p>
                    <p>
                      <span>Наличие:</span>
                      {product?.product_variation[index]?.color_amount > 0 ? (
                        <span className={s.bold}>Есть в наличии</span>
                      ) : (
                        <span className={s.bold}>Нет в наличии</span>
                      )}
                    </p>
                  </li>
                </ul>
              </div>
              <div className={s.blog}>
                <>
                  {product?.product_variation[index]?.images.length > 0 ? (
                    <>
                      <img
                        className={s.img_blog}
                        src={
                          product?.product_variation[index]?.images[0]?.image
                        }
                        alt=""
                      />
                    </>
                  ) : (
                    <div className={s.img}>
                      <img src="/img/image-none.svg" />
                    </div>
                  )}
                </>
                {product?.description !== "" && (
                  <div className={s.text}>
                    <h3>Описание</h3>
                    <p>{product?.description}</p>
                  </div>
                )}
              </div>
              {product?.product_variation?.[index]?.images?.length > 0 && (
                <div>
                  <Masonry
                    className={s.image}
                    columns={
                      screenWidth <= 390 ? 1 : screenWidth <= 868 ? 3 : 4
                    }
                    gap={16}
                  >
                    {product?.product_variation[index].images?.map((e) => {
                      return (
                        <div key={e}>
                          <a href={e.image} data-fancybox="gallery_1">
                            <img className={s.img} src={e.image} alt="" />
                          </a>
                        </div>
                      );
                    })}
                  </Masonry>
                </div>
              )}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
