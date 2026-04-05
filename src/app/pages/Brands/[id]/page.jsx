"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import { useSelector } from "react-redux";
import { fetchBrandFilterData } from "@/app/store/slice/brandsSlice";
import { useDispatch } from "react-redux";
import Card from "@/components/Cards/Card/Card";
import { Loader } from "@/components/Loader/Loader";
import NothingFound from "@/components/NothingFound/NothingFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";

export default function page({ params: { id } }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);
  const { brandId, loading, error } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(fetchBrandFilterData(id));
  }, [id]);

  useEffect(() => {
    if (brandId?.results) {
      setItems((prev) => [...prev, ...brandId.results]);
    }
  }, [brandId]);

  const fetchMoreData = () => {
    if (items.length >= (brandId?.count || 0)) {
      setHasMore(false);
      return;
    }
    setPage((prev) => prev + 1);
    dispatch(fetchBrandFilterData(id, page + 1));
  };

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
          {loading && items.length === 0 ? (
            <Loader />
          ) : (
            <>
              {items.length > 0 ? (
                <InfiniteScroll
                  dataLength={items.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={<Loader />}
                  endMessage={
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                      <b>Больше нет товаров</b>
                    </p>
                  }
                >
                  <div className={s.brands}>
                    {items.map((item) => (
                      <div key={item.id}>
                        <Card item={item} />
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              ) : (
                <NothingFound />
              )}
              {error && <NothingFound />}
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}