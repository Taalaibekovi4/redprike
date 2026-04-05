"use client";
import React from "react";
import s from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { handleModal, handleTabClick } from "@/app/store/slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function ApplicationModal() {
  const pathname = usePathname();
  console.log(pathname);
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.modal);
  return (
    <div className={s.applicationModal}>
      <div onClick={() => dispatch(handleTabClick(0))} className={s.gray}></div>
      <div className={s.modal_content}>
        <Image src={"/img/UIDesigner.png"} width={200} height={200} alt={""} />
        <p>
          Заполните анкету, если у вас нет акаунта. Заполняя анкету вы
          автоматически проходите регистрацию.
        </p>
        <Link
          onClick={() => dispatch(handleModal(!modal))}
          href={{
            pathname: "/pages/Questionnaire",
            query: { name: `${pathname}` },
          }}
        >
          Заполнить анкету
        </Link>
        <button onClick={() => dispatch(handleTabClick(1))}>Войти</button>
      </div>
    </div>
  );
}
