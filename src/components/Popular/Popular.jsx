"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import s from "./page.module.scss";
import { CiStar } from "react-icons/ci";
import Card from "../Cards/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularData } from "@/app/store/slice/popularSlice";
import NothingFound from "../NothingFound/NothingFound";
import { Loader } from "../Loader/Loader";
import { fetchBasketData } from "@/app/store/slice/basketSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Popular() {
  const { popular, status } = useSelector((state) => state.popular);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(fetchPopularData(1));
  }, []);

  const cartData = popular?.results;
  useEffect(() => {
    dispatch(fetchBasketData());
  }, []);

  return (
    <div className={s.popular}>
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
      <div className={s.title}>
        <h3>Популярные</h3>
        <Link href="/pages/catalog" className={s.btn_white}>
          Показать все
        </Link>
      </div>
      <div className={s.products}>
        {status === "succeeded" &&
          cartData?.map((item, index) => {
            return (
              <Card key={index} item={item} onFavoriteChanged={() => {}} />
            );
          })}
      </div>
      {status === "succeeded" && (
        <div className={s.title2}>
          <Link href="/pages/catalog" className={s.btn_white}>
            Показать все товары
          </Link>
        </div>
      )}
      {status === "loading" && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      )}
      {status === "error" && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NothingFound />
        </div>
      )}
      {status === "succeeded" && cartData?.length === 0 && <NothingFound />}
    </div>
  );
}
