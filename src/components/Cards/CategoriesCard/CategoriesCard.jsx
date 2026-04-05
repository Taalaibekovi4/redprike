import React from "react";
import s from "./page.module.scss";
import Image from "next/image";
import { BsExclamationCircleFill } from "react-icons/bs";

function CategoriesCard(data) {
  const res = data?.item;

  return (
    <div className={s.Card}>
      {res.image !== null ? (
        <img src={res.image} layout="fill" alt="ASDDAS" />
      ) : (
        <div className={s.card_logo1}>
          <BsExclamationCircleFill
            className={s.logo1}
            style={{ height: "30px", width: "30px" }}
          />
        </div>
      )}

      <div className={s.info}>
        <h3> {res.title}</h3>

        <p>{res.product_count} видов</p>
      </div>
    </div>
  );
}

export default CategoriesCard;
