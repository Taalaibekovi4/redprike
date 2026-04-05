
import React from "react";
import s from "./page.module.scss";
import Image from "next/image";
import { BsExclamationCircleFill } from "react-icons/bs";

export default function CategoryCard({ item }) {
  return (
    <div className={`${s.category_card}`}>
      {item.image ? (
        <img src={item.image} width={40} height={40} alt="phone" />
      ) : (
        <div className={s.card_logo}>
          <BsExclamationCircleFill className={s.logo} />
        </div>
      )}
      <div className={s.title}>
        <h5>
          {item.title.length > 10
            ? item.title.substring(0, 10) + "..."
            : item.title}
        </h5>
        <p>{item.product_count} товар</p>
      </div>
    </div>
  );
}
