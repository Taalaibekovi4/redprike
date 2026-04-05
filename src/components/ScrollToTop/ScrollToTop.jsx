"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import Image from "next/image";

export default function scrollToTop() {
  const [showToTopButton, setShowToTopButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowToTopButton(true);
    } else {
      setShowToTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={s.scrollToTop}>
      {showToTopButton && (
        <button onClick={scrollToTop}>
          <Image width={50} height={50} src="/img/top.svg" alt="" />
        </button>
      )}
    </div>
  );
}
