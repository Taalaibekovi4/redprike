"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Card from "@/components/Cards/Card/Card";
import { Loader } from "@/components/Loader/Loader";
import NothingFound from "@/components/NothingFound/NothingFound";
import { getCategoryPopularData } from "@/app/store/slice/categorySlice";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
export default function page({ params: { id } }) {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const { categoryId, loading, status, error } = useSelector(
    (state) => state.category
  );
  console.log(categoryId, "data");
  useEffect(() => {
    dispatch(getCategoryPopularData([1, id]));
  }, [id]);

  const handleScroll = () => {
    const indexProgress = Math.round(categoryId?.count / 15);
    if (status === "loading" || indexProgress < page) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
    dispatch(getCategoryPopularData([page + 1, id]));
  };
  useEffect(() => {
    if (status === "succeeded") {
      setData((prevData) => {
        return [...prevData, ...(categoryId?.results ?? [])];
      });
    }
  }, [categoryId]);

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
      <div>
        <div className="container">
          <Navigation />
          {data.length === 0 ? (
            <NothingFound />
          ) : (
            <InfiniteScroll
              dataLength={data?.length}
              next={handleScroll}
              hasMore={hasMore}
              loader={""}
              endMessage={
                <p style={{ textAlign: "center", paddingBottom: "10px" }}>
                  <b>Больше нет товаров</b>
                </p>
              }
            >
              <div className={s.brands}>
                {data?.map((res, index) => (
                  <Card item={res} />
                ))}
              </div>
              {status === "loading" && <Loader />}
            </InfiniteScroll>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}