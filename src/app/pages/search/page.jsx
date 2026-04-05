"use client";
import Card from "@/components/Cards/Card/Card";
import Navigation from "@/components/Navigation/Navigation";
import NothingFound from "@/components/NothingFound/NothingFound";
import React from "react";
import { useSelector } from "react-redux";
import s from "./page.module.scss";
import { Loader } from "@/components/Loader/Loader";
function page() {
  const { data, status } = useSelector((state) => state.searchSlice);

  return (
    <div className="container">
      <Navigation />
      {status === "loading" && <Loader />}
      {status === "succeeded" && (
        <div className={s.Catds}>
          {data?.results?.map((item) => (
            <Card item={item} />
          ))}
        </div>
      )}

      {data?.results?.length === 0 && <NothingFound />}
      {data?.length === 0 && <NothingFound />}
    </div>
  );
}

export default page;
