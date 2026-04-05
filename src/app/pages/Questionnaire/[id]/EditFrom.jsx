import {
  getQuestionnaire,
  putDataQuestionnaire,
} from "@/app/store/slice/questionnaire-get";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import s from "./page.module.scss";
import { InputMask } from "@react-input/mask";
import { ToastContainer, toast } from "react-toastify";
import cm from "classnames";

import "react-toastify/dist/ReactToastify.css";
export function EditFrom({ data, id }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    data.id = id;
    dispatch(putDataQuestionnaire(data));
    toast.success("Успешно отправлено ", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const fromData = [
    {
      name: "full_name",
      title: "Ф.И.О.",
      maxLength: 255,
      xNullable: true,
      value: data?.full_name,
    },
    {
      name: "actual_residence",
      title: "Место фактического проживания",
      maxLength: 255,
      xNullable: true,
      value: data?.actual_residence,
    },
    {
      name: "phone",
      title: "Номер телефона",
      maxLength: 255,
      xNullable: true,
      value: data?.phone,
    },
    {
      name: "work_address",
      title: "Место работы",
      maxLength: 255,
      xNullable: true,
      value: data?.work_address,
    },
    {
      name: "position",
      title: "Должность",
      maxLength: 255,
      xNullable: true,
      value: data?.position,
    },
    {
      name: "avg_salary",
      title: "Средний заработок ",
      type: "number",
      placeholder: "Средний заработок",
      maxLength: 255,
      xNullable: true,
      value: data?.avg_salary,
    },
    {
      name: "whatsapp",

      title: "Whatsapp",
      maxLength: 255,
      xNullable: true,
      value: data?.whatsapp,
    },
    {
      name: "instagram",
      title: "Instagram",
      maxLength: 255,
      xNullable: true,
      value: data?.instagram,
    },
  ];
  const fromData2 = [
    {
      name: "guarantor_full_name_1",
      title: "Ф.И.О.",
      maxLength: 255,
      xNullable: true,
      value: data?.guarantor_full_name_1,
    },
    {
      name: "guarantor_related_1",
      title: "Кем приходится ",
      maxLength: 255,
      xNullable: true,
      value: data?.guarantor_related_1,
    },
    {
      name: "guarantor_address_1",
      title: "Адрес проживания ",
      maxLength: 255,
      xNullable: true,
      value: data?.guarantor_address_1,
    },
    {
      name: "guarantor_phone_1",
      title: "Номер телефона ",
      maxLength: 255,
      xNullable: true,
      value: data?.guarantor_phone_1,
    },
    {
      name: "guarantor_full_name_2",
      title: "Ф.И.О.",
      maxLength: 255,
      xNullable: true,
      value: data?.guarantor_full_name_2,
    },
    {
      name: "guarantor_related_2",
      title: "Кем приходится ",
      maxLength: 255,
      xNullable: true,
      value: data?.guarantor_related_2,
    },
    {
      name: "guarantor_address_2",
      title: "Адрес проживания ",
      maxLength: 255,
      xNullable: true,
      value: data?.guarantor_address_2,
    },
    {
      name: "guarantor_phone_2",
      title: "Номер телефона №2",
      maxLength: 255,
      xNullable: true,
      value: data?.guarantor_phone_2,
    },
  ];
  return (
    <>
      <ToastContainer
        className={s.ToastContainer}
        autoClose={1000}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className={`${s.Blocks} container`}>
        <form
          className={s.block}
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <h2>Анкета заявителя</h2>
          {fromData.map((item, i) => (
            <div className={s.anketa} key={i}>
              <label htmlFor="">{item.title}</label>

              {item.name === "guarantor_phone_1" ||
              item.name === "guarantor_phone_2" ||
              item.name === "phone" ? (
                // <InputMask
                //   {...register(item.name ,{
                //     required: 'Поле обязательно к заполнению',
                //     maxLength: {
                //       value: item.maxLength,
                //       message: `Максимальная длина ${item.maxLength} символов`,
                //     }
                //   })}
                //   mask="+7 (999) 999-99-99"
                //   placeholder={item.title}
                // />
                <InputMask
                  placeholder="+996(ХХХ) ХХ-ХХ-ХХ"
                  mask="+996 (___) __-__-__"
                  {...register(item.name, {
                    maxLength: {
                      value: item.maxLength,
                      message: `Максимальная длина ${item.maxLength} символов`,
                    },
                  })}
                  value={item.value}
                  replacement={{ _: /\d/ }}
                />
              ) : (
                <input
                  {...register(item.name, {
                    maxLength: {
                      value: item.maxLength,
                      message: `Максимальная длина ${item.maxLength} символов`,
                    },
                  })}
                  type={item.type}
                  placeholder={item.placeholder || item.title}
                  defaultValue={item.value}
                />
              )}
              {errors[item.name] && (
                <p className={s.error}>{errors[item.name].message}</p>
              )}
            </div>
          ))}

          <h2>Контактные данные родных</h2>

          {fromData2.map((item, i) => (
            <div className={s.anketa} key={i}>
              <label htmlFor="">{item.title}</label>
              {item.name === "guarantor_phone_1" ||
              item.name === "guarantor_phone_2" ? (
                <InputMask
                  placeholder="+996(ХХХ) ХХ-ХХ-ХХ"
                  mask="+996 (___) __-__-__"
                  {...register(item.name, {
                    maxLength: {
                      value: item.maxLength,
                      message: `Максимальная длина ${item.maxLength} символов`,
                    },
                  })}
                  replacement={{ _: /\d/ }}
                  value={item.value}
                />
              ) : (
                <input
                  {...register(item.name, {
                    maxLength: {
                      value: item.maxLength,
                      message: `Максимальная длина ${item.maxLength} символов`,
                    },
                  })}
                  placeholder={item.title}
                  defaultValue={item.value}
                />
              )}
              {errors[item.name] && (
                <p className={s.error}>{errors[item.name].message}</p>
              )}
            </div>
          ))}
          <button
            disabled={!isDirty}
            className={cm(s.button, isDirty && s.btn_orange)}
          >
            Сохранить изменения
          </button>
        </form>
      </div>
    </>
  );
}
