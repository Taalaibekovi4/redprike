import React from "react";
import s from "./page.module.scss";
import { BsExclamationCircleFill } from "react-icons/bs";
import Link from "next/link";

export default function BrandCard({ item }) {
  return (
    <div className={s.cart}>
      {item.logo ? (
        <img src={item.logo} className={s.img} alt="" />
      ) : (
        <svg
          className={s.logo}
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="40" fill="#F0F0F0" />
          <path
            d="M38.3333 27.2658C39.2667 26.4791 40.7733 26.4791 41.68 27.2658L43.7867 29.0658C44.1867 29.3991 44.9467 29.6791 45.48 29.6791H47.7467C49.16 29.6791 50.32 30.8391 50.32 32.2524V34.5191C50.32 35.0524 50.6 35.7991 50.9333 36.1991L52.7333 38.3058C53.52 39.2391 53.52 40.7458 52.7333 41.6524L50.9333 43.7591C50.6 44.1591 50.32 44.9058 50.32 45.4391V47.7058C50.32 49.1191 49.16 50.2791 47.7467 50.2791H45.48C44.9467 50.2791 44.2 50.5591 43.8 50.8924L41.6933 52.6924C40.76 53.4791 39.2533 53.4791 38.3467 52.6924L36.24 50.8924C35.84 50.5591 35.08 50.2791 34.56 50.2791H32.2267C30.8133 50.2791 29.6533 49.1191 29.6533 47.7058V45.4258C29.6533 44.9058 29.3867 44.1458 29.0533 43.7591L27.2533 41.6391C26.48 40.7191 26.48 39.2258 27.2533 38.3058L29.0533 36.1858C29.3867 35.7858 29.6533 35.0391 29.6533 34.5191V32.2658C29.6533 30.8524 30.8133 29.6924 32.2267 29.6924H34.5333C35.0667 29.6924 35.8133 29.4124 36.2133 29.0791L38.3333 27.2658Z"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M40 34.8398V41.2798"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M39.9927 45.334H40.0047"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
      <h3> {item.title}</h3>
    </div>
  );
}
