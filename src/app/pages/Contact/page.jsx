"use client"
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { YandexMap } from "@/components/maps/yandexMap";
import s from "../pages.module.scss";
import Navigation from "@/components/Navigation/Navigation";
import axios from "axios";
import Link from "next/link";


const API = 'https://api.cheberel.kg/auth/social_networks/'
const api = 'https://api.cheberel.kg/auth/contacts/'

function page() {


  const [dataDom, setDataDom] = useState([])
  const [dataDay, setDataDay] = useState([])
  const [res, setRes] = useState(678)


  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        setDataDom(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }, [])


  useEffect(() => {
    axios
      .get(api)
      .then((response) => {
        setDataDay(response.data)
        console.log(response.data);

      }).catch((error) => {
        console.log(error)
      })
  }, [])


  return (
    <>
      <div className="container">
        <Navigation />
        <div className={s.contacts}>
          <div className={s.contact}>
            <h3>Контакты</h3>

            <div className={s.mapes}>
              <YandexMap el={dataDay[1]} />
            </div>

            <div className={`flex ${s.kontact}`}>

              {dataDom?.map((el) => (
                <div>
                  <Link className={`${s.kontact_img} center`}
                     href={el.link}
                    target="_blank" 
                   > 
                    <Image className="center"
                      src={el.icon} alt=""
                      width={40}
                      height={40}
                    />
                  </Link>
                </div>
              ))
              }

            </div>
            <div>
              {dataDay.map((el) => (
                <div className={s.ofice}>
                  <h4>{el.title}</h4>
                  <div className="between">
                    <div
                      className="flex"
                      style={{ padding: "8px 0", gap: "8px" }}
                    >
                      <Image src='/img/mesto.svg' alt="" width={15} height={15} />
                      <h6>{el.address}</h6>
                    </div>
                    <a href={`tel:${el.phone}`}>{el.phone}</a>
                  </div>
                  <div className="flex" style={{ gap: "10px" }}>
                    <p>{el.time_from} - {el.time_to}</p>
                    <p>{el.working_days_from} - {el.working_days_to}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={s.contact_card}>
              <h4>Красная Цена</h4>
              <div className={s.contact_card_row}>
                <Image src="/img/mesto.svg" alt="" width={15} height={15} />
                <span>г.Бишкек Улица Дордой, - 17</span>
              </div>
              <p className={s.contact_card_hours}>
                09:00:00 - 21:00:00 ПН - ВС
              </p>
            </div>
          </div>
          <div className={s.kart}>
            <YandexMap
              el={dataDay[1]}
              className={s.kart_bottom}
              variant="kart"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
