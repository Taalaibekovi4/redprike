"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import Image from "next/image";
import { InputMask } from "@react-input/mask";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { handleModal, handleTabClick } from "@/app/store/slice/modalSlice";
import { userSendCode } from "@/app/store/slice/sendCodeSlice";
import Spiner from "@/components/Spiner/Spiner";
import { MdClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthCode, { AuthCodeRef } from "react-auth-code-input";

import {
  phoneVerifyError2,
  userPhoneVerify2,
} from "@/app/store/slice/phoneVerifySlice2";

export default function ResetPassword2() {
  const [remainingTime, setRemainingTime] = useState(60);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const { modal } = useSelector((state) => state.modal);
  const { phone } = useSelector((state) => state.recover);
  const { sendCode } = useSelector((state) => state.sendCode);
  const { loading, error } = useSelector((state) => state.phoneVerify2);
  const [result, setResult] = useState({
    phone: "",
    code: "",
  });

  const handleOnChange = (res) => {
    setResult((prevState) => ({
      ...prevState,
      code: res,
      phone: phone,
    }));
  };

  console.log(result);

  const requestAgain = () => {
    dispatch(userSendCode(phone.data));
    setRemainingTime(60);
  };

  const confirmationClickSend = (event) => {
    event.preventDefault();
    if (result.code.length === 6) {
      dispatch(userPhoneVerify2(result));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      <form className={s.recover}>
        <div onClick={() => dispatch(handleModal(!modal))} className={s.close}>
          <MdClose className={s.logo} />
        </div>
        <div className={s.img}>
          <Image src={"/img/password.svg"} alt="" width={221} height={154} />
        </div>
        <h3>Подтверждение кода</h3>
        <div className={s.title}>
          <p>
          Введите код подтверждения, который был отправлен на ваш номер телефона
          </p>
        </div>
        <div className={s.cont}>
          <AuthCode
            length={6}
            allowedCharacters="numeric"
            containerClassName={s.contai}
            onChange={handleOnChange}
          />
        </div>
        {remainingTime === 0 ? (
          <div
            onClick={requestAgain}
            className={s.request_btn}
            disabled={remainingTime > 0}
          >
            Запросить повторно
          </div>
        ) : (
          <p className={s.request}>
            Запросить повторно через
            <span className="mx-2">{`${Math.floor(remainingTime / 60)
              .toString()
              .padStart(2, "0")}:${(remainingTime % 60)
              .toString()
              .padStart(2, "0")}`}</span>
          </p>
        )}

        <div className={s.btns}>
          <div
            className={s.cansel}
            onClick={() => dispatch(handleModal(!modal))}
          >
            Отмена
          </div>
          <button
            style={{
              opacity: result.code.length === 6 ? "1" : "0.5",
            }}
            onClick={(event) => confirmationClickSend(event)}
          >
            Изменить пароль
          </button>
        </div>
      </form>
    </>
  );
}
