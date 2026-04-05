import React from "react";
import s from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import cm from "classnames";
import { usePathname } from "next/navigation";

export const BurgerMenu = ({ time, setTime }) => {
  const page = usePathname();

  return (
    <div>
      <div
        className={s.burger_menu}
        onClick={() => setTime(!time)}
      >
        <div className={`${s.menu} `}>
          <div className="between" style={{ paddingBottom: "36px" }}>
            <Link href="/">
              <Image
                onClick={() => setTime(!time)}
                src={"/img/servis.png"}
                className={s.logo}
                alt=""
                width={60}
                height={50}
              />
            </Link>
            <Image
              onClick={() => setTime(!time)}
              style={{ cursor: "pointer" }}
              src={"/img/x.svg"}
              alt=""
              width={23}
              height={23}
            />
          </div>
          <nav className={s.nav_bar}>
            <Link
              onClick={() => setTime(!time)}
              href={"/"}
              className={cm(s.s, {
                [s.active]: page === "/",
              })}
            >
              Главная
            </Link>
            <Link
              onClick={() => setTime(!setTime)}
              href={"/pages/AboutUs"}
              className={cm(s.s, {
                [s.active]: page === "/pages/AboutUs",
              })}
            >
              Наша миссия
            </Link>
            <Link
              onClick={() => setTime(!time)}
              href={"/pages/terms-of-purchase"}
              className={cm(s.s, {
                [s.active]: page === "/pages/terms-of-purchase",
              })}
            >
              Условия покупки
            </Link>
            <Link
              onClick={() => setTime(!time)}
              href={"/pages/shipping"}
              className={cm(s.s, {
                [s.active]: page === "/pages/shipping",
              })}
            >
              Условия доставки
            </Link>
            {/* <Link
              onClick={() => setTime(!time)}
              href={"/pages/Questionnaire"}
              className={cm(s.s, {
                [s.active]: page === "/pages/Questionnaire",
              })}
            >
              Анкета
            </Link> */}
            <Link
              onClick={() => setTime(!time)}
              href={"/pages/Contact"}
              className={cm(s.s, {
                [s.active]: page === "/pages/Contact",
              })}
            >
              Контакты
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
