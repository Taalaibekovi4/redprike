"use client";
import React from "react";
import s from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { MdSmartphone } from "react-icons/md";

const ADDRESSES = [
  {
    title: "Улица Дордой",
    detail: "17",
    hours: "9:00–21:00",
  },
];

const PHONES = [
  { tel: "+996552233900", display: "0552233900", whatsapp: true },
  { tel: "+996554141407", display: "0554141407", whatsapp: false },
];

export default function Footer() {
  return (
    <div className={s.footer}>
      <div className={s.footer_container}>
        <div className={s.wrapper}>
          <div className={s.number}>
            <div>
              <Link href="/">
                <Image
                  className={s.logo}
                  src={"/img/servis.png"}
                  width={90}
                  height={80}
                  alt=""
                />
              </Link>
              <p className={`${s.c} flex`}>
                {new Date().getFullYear()} Red price All rights reserved.
              </p>
            </div>
          </div>

          <div className={s.nav}>
            <div className={s.menu_link}>
              <Link className={s.menu_item} href={"/"}>
                Главная
              </Link>
              <Link className={s.menu_item} href={"/pages/AboutUs"}>
                Наша миссия
              </Link>
              <Link className={s.menu_item} href={"/pages/terms-of-purchase"}>
                Условия покупки
              </Link>
              <Link className={s.menu_item} href={"/pages/shipping"}>
                Условия доставки
              </Link>
              {/* <Link className={s.menu_item} href={"/pages/Questionnaire"}>
                Анкета
              </Link> */}
              <Link className={s.menu_item} href={"/pages/Contact"}>
                Контакты
              </Link>
            </div>

            <div className={s.footer_info}>
              <section className={s.info_section} aria-labelledby="footer-addresses">
                <h3 className={s.info_heading} id="footer-addresses">
                  Наш адрес
                </h3>
                <ul className={s.address_list}>
                  {ADDRESSES.map((item, i) => (
                    <li key={i} className={s.address_item}>
                      <p className={s.address_line}>
                        <strong className={s.address_name}>{item.title}</strong>
                        {item.detail ? (
                          <>
                            {" "}
                            — {item.detail}
                          </>
                        ) : null}
                      </p>
                      <p className={s.address_hours}>
                        Время работы: {item.hours}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={s.info_section} aria-labelledby="footer-phones">
                <h3 className={s.info_heading} id="footer-phones">
                  Телефоны
                </h3>
                <ul className={s.phone_list}>
                  {PHONES.map((p, i) => (
                    <li key={i} className={s.phone_row}>
                      <MdSmartphone className={s.phone_icon} aria-hidden />
                      <span className={s.phone_text}>
                        <a className={s.phone_link} href={`tel:${p.tel}`}>
                          {p.display}
                        </a>
                        {p.whatsapp ? (
                          <>
                            {" "}
                            <a
                              className={s.whatsapp}
                              href="https://wa.me/996552233900"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              (WhatsApp)
                            </a>
                          </>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
