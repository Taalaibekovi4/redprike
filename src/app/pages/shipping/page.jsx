"use client";

import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import s from "./page.module.scss";
import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation/Navigation";
const Shipping = () => {
  return (
    <>
      <div className={s.Navigations}>
        <Navigation />
      </div>
      <div className={s.shipping}>
        <h2 className={s.h1}>Условия доставки</h2>
        <div className={s.block1}>
          {/* <h2>Доставка осуществляется по всему Кыргызстану.</h2> */}
          {/* <p>
          Наши возможности доставки охватывают всю территорию Кыргызстана, и мы работаем с проверенными курьерскими службами. За услуги доставки клиентам предоставляется удобная система оплаты, регулируемая установленными тарифами наших партнеров по доставке.

          </p> */}
        </div>
        <div className={s.block2}>
          {/* <img src="/img/imag1.webp" alt="/" /> */}
          <div className={s.blockInfo}>
            {/* <h2>Средне рыночные расценки за услугу доставки по г.Бишкек :</h2>
            <p>
            В частности, в городе Бишкек  мы предлагаем услуги доставки, начиная от 150 сом, при этом время доставки составляет всего 2 часа. Для клиентов в регионах, стоимость начинается от 250 сомов, а время доставки варьируется в пределах 24-48 часов. 
            <b>
            *Важно отметить, что указанные расценки являются приблизительными, и окончательная стоимость будет уточнена после оформления заказа и указания конкретного адреса доставки</b>
            </p> */}
          </div>
        </div>
        <div className={s.block3}>
          <div className={s.blockInfo3}>
            {/* <h2>Мы работаем с проверенными курьерскими службами таким как:</h2> */}
            <div>
              {/* <p>
              Наша цель - предоставить клиентам не только широкий выбор товаров, но и удобные условия получения заказов, чтобы каждый клиент мог наслаждаться своими покупками, получая их оперативно и без лишних хлопот.
              </p> */}

            </div>
          </div>
          {/* <img src="/img/image2.webp" alt="/" /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
