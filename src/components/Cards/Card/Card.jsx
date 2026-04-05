"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import { FaHeart } from "react-icons/fa6";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBasketPostData,
  fetchBasketUpdate,
} from "@/app/store/slice/basketSlice";
import { fetchFavoritesPatchData } from "@/app/store/slice/favoritesSlice";
import { handleModal, handleTabClick } from "@/app/store/slice/modalSlice";
import { BiPlus, BiMinus } from "react-icons/bi";

export default function Card({ item }) {
  const dispatch = useDispatch();
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const { dataId, favorites } = useSelector((state) => state.favorites);
  const [isAddedBasket, setIsAddedBasket] = useState(false);
  const { userInfo, userToken } = useSelector((state) => state.signIn);
  const { data, loading, error } = useSelector((state) => state.basket);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(data));
  }, [data]);

  const checkFav = (id) => {
    return favorites?.findIndex((e) => e.id === id) !== -1;
  };

  const checkBasket = (id) => {
    if (!data) return false;
    return data?.findIndex((e) => e.product_variations.id === id) !== -1;
  };

  useEffect(() => {
    setIsAddedBasket(checkBasket(item?.product_variation?.id));
  }, [data]);

  const selectByFav = (valIfFav, valIfNotFav) =>
    isFavorited ? valIfFav : valIfNotFav;

  const [isFavorited, setIsFavorited] = useState(checkFav(item?.id));

  useEffect(() => {
    setIsFavorited(checkFav(item?.id));
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
    if (!isAddedBasket) {
      dispatch(fetchBasketPostData(id));
    }
  };

  const handleQuestionnaire = () => {
    dispatch(handleModal(true));
    dispatch(handleTabClick(2));
  };

  return (
    <>
      <div className={s.Card}>
        <Link href={`/pages/${item.id}`} className={s.card_link}>
          {item?.product_variation?.images ? (
            <img src={item.product_variation.images} className={s.img} alt="" />
          ) : (
            <img src="/img/image-none.svg" className={s.img_none} alt="" />
          )}
          <div className={s.title}>
            <h2 className={s.name}>{item.title?.slice(0, 20)}...</h2>
            <h2 className={s.name_mobile}>{item.title?.slice(0, 13)}...</h2>
            <div>
              {item.product_variation?.color_amount > 0 ? (
                <p className={s.inStock}>
                  <span
                    className={s.roll}
                    style={{
                      backgroundColor:
                        item.product_variation?.color_amount > 0
                          ? "green"
                          : "red",
                    }}
                  />
                  <span className={s.color}> В наличии</span>
                </p>
              ) : (
                <p className={s.inStock}>
                  <span
                    style={{
                      backgroundColor:
                        item.product_variation?.color_amount > 0
                          ? "green"
                          : "red",
                    }}
                    className={s.roll}
                  />
                  Нет в наличии
                </p>
              )}
            </div>
            <div className={s.price}>
              <div className={s.prices}>
                <h5>
                  {item.product_variation?.product_price}

                  {item.product_variation?.currency_unit?.currency}
                </h5>
              </div>
            </div>
          </div>
        </Link>
        {item?.is_popular && <p className={s.Popular}>Популярные</p>}
        {userInfo ? (
          <span
            onClick={() =>
              isFavoriteLoading ? null : handleFavorites(item.id)
            }
            style={{
              backgroundColor: selectByFav("#f7e200", "#fff"),
            }}
            className={s.star}
          >
            <FaHeart
              style={{
                fill: selectByFav("#fff", "#f7e200"),
              }}
              className={s.stars}
            />
          </span>
        ) : (
          <div onClick={() => handleQuestionnaire()}>
            <span
              style={{
                backgroundColor: "#fff",
              }}
              className={s.star}
            >
              <FaHeart
                style={{
                  fill: "#f7e200",
                }}
                className={s.stars}
              />
            </span>
          </div>
        )}
        <div className={s.button}>
          {isAddedBasket ? (
            <div className={s.btn_added}>
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    fetchBasketUpdate({
                      plus: false,
                      product_id: data.find(
                        (e) =>
                          e.product_variations.id === item.product_variation.id
                      )?.id,
                      product_count: data.find(
                        (e) =>
                          e.product_variations.id === item.product_variation.id
                      )?.product_count,
                    })
                  )
                }
              >
                <BiMinus className={s.logo} />
              </button>
              <span>
                {
                  data.find(
                    (e) => e.product_variations.id === item.product_variation.id
                  )?.product_count
                }
              </span>
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    fetchBasketUpdate({
                      plus: true,
                      product_id: data.find(
                        (e) =>
                          e.product_variations.id === item.product_variation.id
                      )?.id,
                      product_count: data.find(
                        (e) =>
                          e.product_variations.id === item.product_variation.id
                      )?.product_count,
                    })
                  )
                }
              >
                <BiPlus className={s.logo} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={item.product_variation?.color_amount > 0 ? false : true}
              style={{
                opacity: item.product_variation?.color_amount > 0 ? 1 : 0.5,
              }}
              onClick={() => addToHandleBasket(item.product_variation?.id)}
              className={s.btn}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </>
  );
}
