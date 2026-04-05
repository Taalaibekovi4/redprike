"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import Image from "next/image";
import { InputMask } from "@react-input/mask";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { handleTabClick } from "@/app/store/slice/modalSlice";
import { fetchRecover, recoverError } from "@/app/store/slice/recoverSlice";
import Spiner from "@/components/Spiner/Spiner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Recover() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const { loading, error } = useSelector((state) => state.recover);

  const submitRegister = (data) => {
    dispatch(fetchRecover(data));
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(recoverError(null));
      }, 5000);
    }
  }, [error]);
  return (
    <>
      <ToastContainer
        stacked
        className={"alert"}
        autoClose={1000}
        limit={100}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {loading ? <Spiner /> : null}
      <form className={s.recover} onSubmit={handleSubmit(submitRegister)}>
        <div className={s.img}>
          <Image src={"/img/password.svg"} alt="" width={221} height={154} />
        </div>
        <h3>Востановить пароль</h3>
        <p>
          Мы вышлем вам на номер телефона код подтверждения.  
        </p>
        <div className={s.inputs}>
          <label htmlFor="">Номер телефона</label>
          <div>
            <InputMask
              className={s.tel}
              {...register("phone", {
                required: "Поле обязателно к заполнина",
              })}
              mask="+996 (___) ___-___"
              placeholder="+996-###-###"
              replacement={{ _: /\d/ }}
              formatCharacters={{
                9: "[0-9]",
              }}
            />
            {errors && (
              <p style={{ color: "red", textAlign: "left" }} className="error">
                {errors?.phone?.message}
              </p>
            )}
          </div>
        </div>
        <div className={s.btns}>
          <div className={s.cansel} onClick={() => dispatch(handleTabClick(1))}>
            Отмена
          </div>
          <button
          
            style={{
              width:'200px',
              opacity: isValid ? "1" : "0.6",
            }}
          >
            Сбросить пароль
          </button>
        </div>
      </form>
    </>
  );
}
