"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import cm from "classnames";
import { usePathname } from "next/navigation";
import { BurgerMenu } from "../Menu/page";
import { RxHamburgerMenu } from "react-icons/rx";
import { handleModal } from "@/app/store/slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "@/app/store/slice/signInSlice";
import { fetchFavoritesData } from "@/app/store/slice/favoritesSlice";
import axios from "axios";

const api = 'https://api.cheberel.kg/auth/contacts_header_footer/'


export default function Header() {
  const page = usePathname();
  const [time, setTime] = useState(false);
  const [randomToken, setrandomToken] = useState();
  const [data, setData] = useState([]);



  useEffect(() => {
    axios.get(api).then((response) => {
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])


  useEffect(() => {
    if (typeof window !== "undefined") {
      setrandomToken(
        JSON.parse(window.localStorage.getItem("randomToken") || null)
      );
    }
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = JSON?.parse(localStorage.getItem("userToken"));
    if (id !== null) {
      dispatch(userProfile(id));
    }
  }, []);

  function generateRandomToken(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  if (randomToken === null) {
    const token = generateRandomToken(100);
    localStorage.setItem("randomToken", JSON.stringify(token));
  }

  useEffect(() => {
    if (time) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [time]);

  useEffect(() => {
    dispatch(fetchFavoritesData());
  }, []);

  return (
    <>
      {time && <BurgerMenu setTime={setTime} time={time} />}
      <div className={`${s.header} `}>
        <div className="container">
          <div className={s.nav}>
            <div className={s.wrapper}>
              <Link href={"/"}>
                <Image
                  src={"/img/servis.png"}
                  className={s.logo}
                  alt=""
                  width={90}
                  height={80}
                />
              </Link>
              <nav className={s.nav_bar}>
                <Link
                  href={"/"}
                  className={cm(s.s, {
                    [s.active]: page === "/",
                  })}
                >
                  Главная
                </Link>
                <Link
                  href={"/pages/AboutUs"}
                  className={cm(s.s, {
                    [s.active]: page === "/pages/AboutUs",
                  })}
                >
                  Наша миссия
                </Link>

                <Link
                  href={"/pages/terms-of-purchase"}
                  className={cm(s.s, {
                    [s.active]: page === "/pages/terms-of-purchase",
                  })}
                >
                  Условия покупки
                </Link>
                <Link
                  href={"/pages/shipping"}
                  className={cm(s.s, {
                    [s.active]: page === "/pages/shipping",
                  })}
                >Условия доставки</Link>
                {/* <Link
                  href={"/pages/Questionnaire"}
                  className={cm(s.s, {
                    [s.active]: page === "/pages/Questionnaire",
                  })}
                >
                  Анкета
                </Link> */}
                <Link
                  href={"/pages/Contact"}
                  className={cm(s.s, {
                    [s.active]: page === "/pages/Contact",
                  })}
                >
                  Контакты
                </Link>
              </nav>
            </div>
            <div className={s.phone}>
              <a className={s.link} href="tel:{data[1]?.phone}">
                {data[1]?.phone}
              </a>
            </div>
            <RxHamburgerMenu
              onClick={() => setTime(!time)}
              className={s.burger}
            />
          </div>
        </div>
      </div>
    </>
  );
}
