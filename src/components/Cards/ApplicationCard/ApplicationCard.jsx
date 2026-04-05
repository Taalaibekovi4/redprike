import React from "react";
import s from "./page.module.scss";

export default function ApplicationCard({ item }) {
  const timestamp = item.sent_at;
  const dateObject = new Date(timestamp);
  const formattedDate = dateObject.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",

    hour: "2-digit",

    minute: "2-digit",
  });
  const timestamp1 = item.response_received_at;
  const dateObject1 = new Date(timestamp1);
  const formattedDate1 = dateObject1.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div>
      <div className={s.applicationCard}>
        <h3>
          <span>Заявка {item.full_name}</span>

          {item.response_status === "В ожидании" && (
            <span style={{ color: "orange" }}>{item.response_status}</span>
          )}
          {item.response_status === "Одобрено" && (
            <span style={{ color: "#00D608" }}>{item.response_status}</span>
          )}
          {item.response_status === "Отклонено" && (
            <span style={{ color: "red" }}>{item.response_status}</span>
          )}
        </h3>
        <div className={s.wrapper}>
          <div className={s.flex}>
            <p>Название товара:</p>
            <p>Цена:</p>
          </div>
          {item?.products?.map((res) => {
            return (
              <div className={s.flex}>
                <p>
                  {res.product} ({res.product_count} )
                </p>
                <p className={s.price}>{res.price} с</p>
              </div>
            );
          })}
        </div>
        <div className={s.quantity}>
          <p>Количество: {item.product_count}</p>
          <p>Общая Цена: {item.total_price} c</p>
        </div>
        <div className={s.sent}>
          <p>Отправлено: {formattedDate}</p>
          {item.response_status === "Одобрено" && (
            <p style={{ color: "#00D608" }}>Одобрено: {formattedDate1}</p>
          )}
          {item.response_status === "Отклонено" && (
            <p style={{ color: "red" }}>Отклонено: {formattedDate1}</p>
          )}
        </div>
      </div>
    </div>
  );
}
