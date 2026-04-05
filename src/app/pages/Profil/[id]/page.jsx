"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import Masonry from "react-smart-masonry";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPurchaseRequestList,
  fetchPurchaseRequestListById,
} from "@/app/store/slice/purchaseRequestList";
import { Loader } from "@/components/Loader/Loader";
import ApplicationCard from "@/components/Cards/ApplicationCard/ApplicationCard";
import cm from "classnames";

function page() {
  const [dataProduct, setDataProduct] = useState([]);
  const params = useParams();
  const { search } = useSelector((state) => state.modal);

  const id = params?.id;
  const [tap, setTap] = useState(1);
  const PurchaseRequestList = useSelector(
    (state) => state.purchaseRequestListSlice
  );
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const dispatch = useDispatch();
  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(fetchPurchaseRequestList());
  }, []);
  useEffect(() => {
    setDataProduct(PurchaseRequestList?.data?.results);
  }, [PurchaseRequestList?.data?.results]);
  const getExpectation = () => {
    dispatch(fetchPurchaseRequestListById());
    dispatch(handleSearchModal(2));
  };
  const getApplications = () => {
    dispatch(fetchPurchaseRequestList());
    setDataProduct(PurchaseRequestList.data?.results);
    dispatch(handleSearchModal(1));
  };
  return (
    <div className={s.Blcoks}>
      <div className={s.info}>
        <h2>История заявок</h2>
        <div className={s.btn}>
          <button
            onClick={() => getApplications()}
            className={cm(s.isSearch, {
              [s.isSearchAcc]: search === 1,
            })}
          >
            Заявки
          </button>
          <button
            onClick={() => getExpectation()}
            className={cm(s.isSearch, {
              [s.isSearchAcc]: search === 2,
            })}
          >
            В ожидании ({PurchaseRequestList?.data?.count})
          </button>
        </div>
      </div>
      <Masonry columns={screenWidth < 800 ? 1 : 2} gap={20}>
        {PurchaseRequestList.status === "loading" && <Loader />}
        {PurchaseRequestList.status === "succeeded" &&
          1 === 1 &&
          dataProduct?.map((item, index) => {
            return (
              <div className="" key={index}>
                <ApplicationCard item={item} />
              </div>
            );
          })}
      </Masonry>
    </div>
  ); // Assuming there is an 'id' property in the params object
}

export default page;
