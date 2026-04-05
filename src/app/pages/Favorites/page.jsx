"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/Cards/Card/Card";
import { fetchFavoritesData } from "@/app/store/slice/favoritesSlice";
import NothingFound from "@/components/NothingFound/NothingFound";
import cm from "classnames";
import { BiChevronUp } from "react-icons/bi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa6";
import Navigation from "@/components/Nav/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NothingFound2 from "@/components/NothingFound2/NothingFound2";

export default function page() {
  const [categoryIds, setCategoryIds] = useState(null);
  const [categoryId, setCategoryId] = useState(2);
  const [idSord, setIdSord] = useState(1);
  const [isAccordion, setIsAccordion] = useState(false);

  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    dispatch(fetchFavoritesData());
  }, []);
  useEffect(() => {
    setCardData(favorites);
  }, [favorites]);

  return (
    <>
      <ToastContainer
        className={""}
        autoClose={1000}
        limit={10}
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
        <div className={s.favorites}>
          <h2>Избранные товары</h2>
          <div className={s.favorites_wrap}>
            {favorites?.length > 0 ? (
              <>
                {cardData?.map((item) => {
                  return <Card item={item} />;
                })}
              </>
            ) : (
              <></>
            )}
          </div>
          {favorites?.length === 0 && (
            <div>
              <NothingFound2 />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
