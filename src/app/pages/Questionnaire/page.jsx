// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import s from "./page.module.scss";
// import { useForm } from "react-hook-form";
// import { InputMask } from "@react-input/mask";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   postDataQuestionnaire,
//   postDataQuestionnaireAgent,
//   postPhoneVerify,
//   postPhoneVerifyAgent,
// } from "@/app/store/slice/questionnaire-slice";
// import { Loader } from "@/components/Loader/Loader";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Box from "@mui/material/Box";
// import { Modal } from "@mui/material";
// import { EditFrom } from "./EditFrom";
// import { getQuestionnaire } from "@/app/store/slice/questionnaire-get";
// import { PiUserListFill } from "react-icons/pi";
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

// import {
//   getClientList,
//   getClientListSearch,
// } from "@/app/store/slice/client_list-slice";
// import Link from "next/link";
// import Footer from "@/components/Footer/Footer";
// import { BsX } from "react-icons/bs";
// import { useRouter } from "next/navigation";
// import AuthCode from "react-auth-code-input";
// import { postPhone } from "@/app/store/slice/test-slice";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90%",

//   bgcolor: "background.paper",
//   borderRadius: 3,
//   boxShadow: 24,
//   p: 4,
// };

// const fromData = [
//   { name: "full_name", title: "Ф.И.О.", maxLength: 255, xNullable: true },
//   {
//     name: "actual_residence",
//     title: "Место фактического проживания",
//     maxLength: 255,
//     xNullable: true,
//   },
//   { name: "phone", title: "Номер телефона", maxLength: 255, xNullable: true },
//   {
//     name: "work_address",
//     title: "Место работы",
//     maxLength: 255,
//     xNullable: true,
//   },
//   { name: "position", title: "Должность", maxLength: 255, xNullable: true },
//   {
//     name: "avg_salary",
//     title: "Средний заработок в месяц (в сомах)",
//     placeholder: "Средний заработок",
//     type: "number",
//     maxLength: 255,
//     xNullable: true,
//   },
//   { name: "whatsapp", title: "Whatsapp", maxLength: 255, xNullable: true },
//   { name: "instagram", title: "Instagram", maxLength: 255, xNullable: true },
// ];
// const fromData2 = [
//   {
//     name: "guarantor_related_1",
//     title: "Кем приходится № 1 ",
//     maxLength: 255,
//     xNullable: true,
//   },
//   {
//     name: "guarantor_full_name_1",
//     title: "Ф.И.О.",
//     maxLength: 255,
//     xNullable: true,
//   },

//   {
//     name: "guarantor_address_1",
//     title: "Адрес проживания ",
//     maxLength: 255,
//     xNullable: true,
//   },
//   {
//     name: "guarantor_phone_1",
//     title: "Номер телефона ",
//     maxLength: 255,
//     xNullable: true,
//   },
// ];
// const fromData3 = [
//   {
//     name: "guarantor_related_2",
//     title: "Кем приходится № 2 ",
//     maxLength: 255,
//     xNullable: true,
//   },
//   {
//     name: "guarantor_full_name_2",
//     title: "Ф.И.О.",
//     maxLength: 255,
//     xNullable: true,
//   },

//   {
//     name: "guarantor_address_2",
//     title: "Адрес проживания ",
//     maxLength: 255,
//     xNullable: true,
//   },
//   {
//     name: "guarantor_phone_2",
//     title: "Номер телефона №2",
//     maxLength: 255,
//     xNullable: true,
//   },
// ];
// const fromData4 = [
//   {
//     name: "password",
//     title: "Пароль",
//     minLength: 1,
//     xNullable: true,
//   },
//   {
//     name: "password2",
//     title: "Повторите пароль",
//     minLength: 1,
//     xNullable: true,
//   },
// ];

// const Questionnaire = ({ searchParams }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   console.log(searchParams.name, "query");

//   const linkRef = React.useRef();

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [phones, setPhone] = useState();
//   const dispatch = useDispatch();
//   const [code, setCode] = useState();
//   const { userInfo } = useSelector((state) => state.signIn);
//   const [inputValue, setInputValue] = useState(null);
//   const [isClientListModule, setIsClientListModule] = useState(false);
//   const [search, setSearch] = useState(null);
//   const [eye, setEye] = useState(false);
//   const [res, setRes] = useState(false);
//   const router = useRouter();
//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };
//   const handleDeleteFile = () => {
//     setInputValue(null);
//   };
//   const [inputValue1, setInputValue1] = useState(null);
//   const handleChange1 = (event) => {
//     setInputValue1(event.target.value);
//   };
//   const handleDeleteFile1 = () => {
//     setInputValue1(null);
//   };
//   const { status, error, data, sendCode, createUsers } = useSelector(
//     (state) => state.questionna
//   );
//   const dataPostPhones = useSelector((state) => state.questionnaireSliced);
//   const testSataus = useSelector((state) => state.testSlice);
//   console.log(testSataus, "testSataus");
//   useEffect(() => {
//     if (testSataus.status === "succeeded") {
//       linkRef.current.click(); // Программно нажимаем на ссылку
//     }
//   }, [testSataus.status]);
//   const phoneVerify = () => {
//     const datas = {
//       phone: phones,
//       code: code,
//     };
//     if (searchParams.name === "/pages/Basket") {
//       dispatch(postPhone(datas));
//       return null;
//     }
//     if (userInfo?.user_id?.role === "AGENT") {
//       dispatch(postPhoneVerifyAgent(datas));
//     } else {
//       dispatch(postPhoneVerify(datas));
//     }
//   };
//   useEffect(() => {
//     if (createUsers === true) {
//       setOpen(false);
//       reset();
//     }
//     if (status === "failed") {
//     }
//   }, [createUsers, status]);

//   const handleSearch = () => {
//     dispatch(getClientListSearch(search));
//   };

//   const onSubmit = (data) => {
//     if (userInfo === null && userInfo?.user_id?.role !== "AGENT") {
//       if (data.password !== data.password2) {
//         alert("Пароли не совпадают");
//       } else {
//         delete data.password2;
//         delete data.checkbox;
//         dispatch(postDataQuestionnaire(data));
//         setPhone(data.phone);
//       }
//     }
//     if (userInfo?.user_id?.role === "AGENT") {
//       delete data.password2;
//       delete data.checkbox;
//       dispatch(postDataQuestionnaireAgent(data));
//       setPhone(data.phone);
//     }
//   };
//   useEffect(() => {
//     dispatch(getQuestionnaire());
//   }, [userInfo !== null]);

//   useEffect(() => {
//     dispatch(getClientList());
//   }, []);

//   const dataclinet = useSelector((state) => state.clientListSlice);
//   useEffect(() => {
//     if (status === "succeeded") {
//       if (createUsers !== true) {
//         setOpen(true);
//       }
//     }
//   }, [status]);
//   const handleOnChange = (res) => {
//     setCode(res);
//   };

//   const eyeFuntion = (e) => {
//     e.preventDefault();
//     setEye(!eye);
//   };

//   const resFuntion = (e) => {
//     e.preventDefault();
//     setRes(!res);
//   };

//   return (
//     <>
//       <Link
//         ref={linkRef}
//         style={{ position: "absolute" }}
//         href={{ pathname: "/pages/Basket", query: { name: "userOk" } }}
//       ></Link>

//       <ToastContainer
//         className={s.ToastContainer}
//         autoClose={1000}
//         limit={5}
//         hideProgressBar
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />

//       <div
//         className={`${s.Blocks} container`}
//         style={{
//           display:
//             userInfo !== null && userInfo?.user_id?.role !== "AGENT"
//               ? "block"
//               : "grid",
//         }}
//       >
//         {userInfo?.user_id?.role === "AGENT" && (
//           <div className={s.user_idRole}>
//             <div className={s.user_idRoleDiv}>Зарегистрировать клиента</div>
//             <button
//               className={s.user_idRoleButton}
//               onClick={() => setIsClientListModule(!isClientListModule)}
//             >
//               <p>СПИСОК КЛИЕНТОВ</p>
//               <PiUserListFill className={s.isicon} />
//             </button>
//           </div>
//         )}

//         {userInfo !== null && userInfo?.user_id?.role !== "AGENT" ? (
//           <EditFrom />
//         ) : (
//           <>
//             <h2>Анкета заявителя</h2>
//             <form
//               className={s.block}
//               onSubmit={handleSubmit(onSubmit)}
//               encType="multipart/form-data"
//             >
//               {fromData.map((item, i) => (
//                 <div className={s.anketa} key={i}>
//                   <label htmlFor="">{item.title}</label>

//                   {item.name === "guarantor_phone_1" ||
//                   item.name === "guarantor_phone_2" ||
//                   item.name === "phone" ? (
//                     // <InputMask
//                     //   {...register(item.name ,{
//                     //     required: 'Поле обязательно к заполнению',
//                     //     maxLength: {
//                     //       value: item.maxLength,
//                     //       message: `Максимальная длина ${item.maxLength} символов`,
//                     //     }
//                     //   })}
//                     //   mask="+7 (999) 999-99-99"
//                     //   placeholder={item.title}
//                     // />
//                     <InputMask
//                       placeholder="+996(ХХХ) ХХ-ХХ-ХХ"
//                       mask="+996 (___) __-__-__"
//                       {...register(item.name, {
//                         required: "Поле обязательно к заполнению",
//                         maxLength: {
//                           value: item.maxLength,
//                           message: `Максимальная длина ${item.maxLength} символов`,
//                         },
//                       })}
//                       replacement={{ _: /\d/ }}
//                     />
//                   ) : (
//                     <input
//                       {...register(item.name, {
//                         required:
//                           item.name === "instagram"
//                             ? false
//                             : "Поле обязательно к заполнению",

//                         maxLength: {
//                           value: item.maxLength,
//                           message: `Максимальная длина ${item.maxLength} символов`,
//                         },
//                       })}
//                       type={item.type || "text"}
//                       placeholder={item.placeholder || item.title}
//                     />
//                   )}
//                   {errors[item.name] && (
//                     <p className={s.error}>{errors[item.name].message}</p>
//                   )}
//                 </div>
//               ))}
//               <div className={s.anketa}>
//                 <label>Фото паспорта(одна сторона)</label>
//                 <div className={s.csa}>
//                   <input
//                     id="password_face"
//                     {...register("password_face", {
//                       required: "Поле обязательно к заполнению",
//                     })}
//                     type="file"
//                     defaultValue={inputValue}
//                     className={s.asdsa}
//                     accept=".jpg, .jpeg, .png, .gif"
//                     onChange={handleChange}
//                   />

//                   {inputValue !== null ? (
//                     <div className={s.inputValue}>
//                       <p>
//                         Название:{" "}
//                         {inputValue.length > 15
//                           ? inputValue.substring(0, 15)
//                           : inputValue}{" "}
//                       </p>
//                       <svg
//                         onClick={() => handleDeleteFile()}
//                         width="21"
//                         height="24"
//                         viewBox="0 0 21 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         cursor={"pointer"}
//                       >
//                         <path
//                           d="M20.25 3.75C20.4688 3.75 20.6406 3.82813 20.7656 3.98438C20.9219 4.10938 21 4.28125 21 4.5V5.25C21 5.46875 20.9219 5.65625 20.7656 5.8125C20.6406 5.9375 20.4688 6 20.25 6H19.5L18.5156 21.8906C18.4844 22.4844 18.25 22.9844 17.8125 23.3906C17.375 23.7969 16.8594 24 16.2656 24H4.73438C4.14062 24 3.625 23.7969 3.1875 23.3906C2.75 22.9844 2.51562 22.4844 2.48438 21.8906L1.5 6H0.75C0.53125 6 0.34375 5.9375 0.1875 5.8125C0.0625 5.65625 0 5.46875 0 5.25V4.5C0 4.28125 0.0625 4.10938 0.1875 3.98438C0.34375 3.82813 0.53125 3.75 0.75 3.75H4.59375L6.1875 1.07812C6.625 0.359375 7.28125 0 8.15625 0H12.8438C13.7188 0 14.375 0.359375 14.8125 1.07812L16.4062 3.75H20.25ZM8.15625 2.25L7.21875 3.75H13.7812L12.8438 2.25H8.15625ZM16.2656 21.75L17.25 6H3.75L4.73438 21.75H16.2656Z"
//                           fill="#5A5A5A"
//                         />
//                       </svg>
//                     </div>
//                   ) : (
//                     <label
//                       style={{
//                         fontSize: "16px",
//                         width: "100%",
//                         cursor: "pointer",
//                       }}
//                       htmlFor="password_face"
//                       className="button"
//                     >
//                       <svg
//                         width="25"
//                         height="24"
//                         viewBox="0 0 25 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M23.8438 4.59375C24.2812 5.03125 24.5 5.5625 24.5 6.1875V21.75C24.5 22.375 24.2812 22.9062 23.8438 23.3438C23.4062 23.7812 22.875 24 22.25 24H8.75C8.125 24 7.59375 23.7812 7.15625 23.3438C6.71875 22.9062 6.5 22.375 6.5 21.75V16.875H8.75V21.75H22.25V8.25H17.375C17.0625 8.25 16.7969 8.14062 16.5781 7.92188C16.3594 7.70312 16.25 7.4375 16.25 7.125V2.25H8.75V12.375H14V10.0781C14 9.82812 14.1094 9.65625 14.3281 9.5625C14.5781 9.46875 14.7969 9.51562 14.9844 9.70312L18.3125 13.0781C18.5938 13.3594 18.5938 13.6406 18.3125 13.9219L14.9844 17.2969C14.7969 17.4844 14.5781 17.5312 14.3281 17.4375C14.1094 17.3438 14 17.1719 14 16.9219V14.625H1.0625C0.90625 14.625 0.765625 14.5781 0.640625 14.4844C0.546875 14.3594 0.5 14.2188 0.5 14.0625V12.9375C0.5 12.7812 0.546875 12.6562 0.640625 12.5625C0.765625 12.4375 0.90625 12.375 1.0625 12.375H6.5V2.25C6.5 1.84375 6.59375 1.46875 6.78125 1.125C7 0.78125 7.28125 0.515625 7.625 0.328125C7.96875 0.109375 8.34375 0 8.75 0H18.3125C18.9375 0 19.4688 0.21875 19.9062 0.65625L23.8438 4.59375ZM18.5 6H22.0625L18.5 2.4375V6Z"
//                           fill="#5A5A5A"
//                         />
//                       </svg>
//                       ЗАГРУЗИТЬ ФОТО
//                     </label>
//                   )}
//                 </div>
//                 {errors.password_face && (
//                   <p className={s.error}>{errors.password_face?.message}</p>
//                 )}
//               </div>
//               <div className={s.anketa}>
//                 <label>Фото паспорта(другая)</label>
//                 <div className={s.csa}>
//                   <input
//                     id="password_back"
//                     {...register("password_back", {
//                       required: "Поле обязательно к заполнению",
//                     })}
//                     type="file"
//                     defaultValue={inputValue1}
//                     className={s.asdsa}
//                     accept=".jpg, .jpeg, .png, .gif"
//                     onChange={handleChange1}
//                   />

//                   {inputValue1 !== null ? (
//                     <div className={s.inputValue}>
//                       <p>
//                         Название:{" "}
//                         {inputValue1.length > 15
//                           ? inputValue1.substring(0, 15)
//                           : inputValue1}{" "}
//                       </p>{" "}
//                       <svg
//                         onClick={() => handleDeleteFile1()}
//                         width="21"
//                         height="24"
//                         viewBox="0 0 21 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M20.25 3.75C20.4688 3.75 20.6406 3.82813 20.7656 3.98438C20.9219 4.10938 21 4.28125 21 4.5V5.25C21 5.46875 20.9219 5.65625 20.7656 5.8125C20.6406 5.9375 20.4688 6 20.25 6H19.5L18.5156 21.8906C18.4844 22.4844 18.25 22.9844 17.8125 23.3906C17.375 23.7969 16.8594 24 16.2656 24H4.73438C4.14062 24 3.625 23.7969 3.1875 23.3906C2.75 22.9844 2.51562 22.4844 2.48438 21.8906L1.5 6H0.75C0.53125 6 0.34375 5.9375 0.1875 5.8125C0.0625 5.65625 0 5.46875 0 5.25V4.5C0 4.28125 0.0625 4.10938 0.1875 3.98438C0.34375 3.82813 0.53125 3.75 0.75 3.75H4.59375L6.1875 1.07812C6.625 0.359375 7.28125 0 8.15625 0H12.8438C13.7188 0 14.375 0.359375 14.8125 1.07812L16.4062 3.75H20.25ZM8.15625 2.25L7.21875 3.75H13.7812L12.8438 2.25H8.15625ZM16.2656 21.75L17.25 6H3.75L4.73438 21.75H16.2656Z"
//                           fill="#5A5A5A"
//                         />
//                       </svg>
//                     </div>
//                   ) : (
//                     <label
//                       style={{
//                         fontSize: "16px",
//                         width: "100%",
//                         cursor: "pointer",
//                       }}
//                       htmlFor="password_back"
//                       className="button"
//                     >
//                       <svg
//                         width="25"
//                         height="24"
//                         viewBox="0 0 25 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M23.8438 4.59375C24.2812 5.03125 24.5 5.5625 24.5 6.1875V21.75C24.5 22.375 24.2812 22.9062 23.8438 23.3438C23.4062 23.7812 22.875 24 22.25 24H8.75C8.125 24 7.59375 23.7812 7.15625 23.3438C6.71875 22.9062 6.5 22.375 6.5 21.75V16.875H8.75V21.75H22.25V8.25H17.375C17.0625 8.25 16.7969 8.14062 16.5781 7.92188C16.3594 7.70312 16.25 7.4375 16.25 7.125V2.25H8.75V12.375H14V10.0781C14 9.82812 14.1094 9.65625 14.3281 9.5625C14.5781 9.46875 14.7969 9.51562 14.9844 9.70312L18.3125 13.0781C18.5938 13.3594 18.5938 13.6406 18.3125 13.9219L14.9844 17.2969C14.7969 17.4844 14.5781 17.5312 14.3281 17.4375C14.1094 17.3438 14 17.1719 14 16.9219V14.625H1.0625C0.90625 14.625 0.765625 14.5781 0.640625 14.4844C0.546875 14.3594 0.5 14.2188 0.5 14.0625V12.9375C0.5 12.7812 0.546875 12.6562 0.640625 12.5625C0.765625 12.4375 0.90625 12.375 1.0625 12.375H6.5V2.25C6.5 1.84375 6.59375 1.46875 6.78125 1.125C7 0.78125 7.28125 0.515625 7.625 0.328125C7.96875 0.109375 8.34375 0 8.75 0H18.3125C18.9375 0 19.4688 0.21875 19.9062 0.65625L23.8438 4.59375ZM18.5 6H22.0625L18.5 2.4375V6Z"
//                           fill="#5A5A5A"
//                         />
//                       </svg>
//                       ЗАГРУЗИТЬ ФОТО
//                     </label>
//                   )}
//                 </div>
//                 {errors.password_back && (
//                   <p className={s.error}>{errors.password_back?.message}</p>
//                 )}
//               </div>
//               <div className={s.anketas}>
//                 <label htmlFor="">Согласие</label>
//                 <span className="formControl">
//                   <input
//                     type="checkbox"
//                     {...register("checkbox", {
//                       required: "Поле обязательно к заполнению",
//                     })}
//                     name="checkbox"
//                   />
//                   <p className={s.pspsps}>
//                     {" "}
//                     Я согласен на обработку персональных данных
//                   </p>
//                 </span>
//                 {errors.checkbox && (
//                   <p className={s.error}>{errors.checkbox?.message}</p>
//                 )}
//                 <p className={s.pspsps}>
//                   Я являюсь владельцем паспорта и даю согласие на обработку и
//                   получения моих данных. <br />
//                   • Настоящим даю своё согласие на запрос / получение и/или
//                   предоставление любых своих персональных данных (ФИО, пол, дата
//                   рождения, адрес проживания и т. д.) сотрудниками ЗАО
//                   «ЭкоИсламикБанк» в/из Кредитное бюро, их правопреемникам,
//                   любому лицу, известному или неизвестному мне, которое, как
//                   полагает Банк, может оказать содействие в принятии решения
//                   относительно предоставления финансирования Заявителю. <br />
//                   • Настоящим даю своё согласие на запрос / получение и/или
//                   предоставление любых своих персональных данных (ФИО, пол, дата
//                   рождения, адрес проживания и т. д.) сотрудниками ЗАО
//                   «ЭкоИсламикБанк» в/из Государственной Регистрационной Службы,
//                   их правопреемникам, любому лицу, известному или неизвестному
//                   мне, которое, как полагает Банк, может оказать содействие в
//                   принятии решения относительно предоставления финансирования
//                   Заявителю <br />• Настоящим даю своё согласие на запрос /
//                   получение и/или предоставление любых своих данных по выплатам
//                   заработной платы и отчислений в Социальный Фонд КР
//                   сотрудниками ЗАО «ЭкоИсламикБанк»
//                 </p>
//               </div>

//               <h2>Контактные данные близких родственников</h2>

//               {fromData2.map((item, i) => (
//                 <div className={s.anketa} key={i}>
//                   <label htmlFor="">{item.title}</label>
//                   {item.name === "guarantor_phone_1" ||
//                   item.name === "guarantor_phone_2" ? (
//                     <InputMask
//                       placeholder="+996(ХХХ) ХХ-ХХ-ХХ"
//                       mask="+996 (___) __-__-__"
//                       {...register(item.name, {
//                         required: "Поле обязательно к заполнению",
//                         maxLength: {
//                           value: item.maxLength,
//                           message: `Максимальная длина ${item.maxLength} символов`,
//                         },
//                       })}
//                       replacement={{ _: /\d/ }}
//                     />
//                   ) : (
//                     <input
//                       {...register(item.name, {
//                         required: "Поле обязательно к заполнению",
//                         maxLength: {
//                           value: item.maxLength,
//                           message: `Максимальная длина ${item.maxLength} символов`,
//                         },
//                       })}
//                       placeholder={item.title}
//                     />
//                   )}
//                   {errors[item.name] && (
//                     <p className={s.error}>{errors[item.name].message}</p>
//                   )}
//                 </div>
//               ))}
//               <hr style={{ color: "#E5E5E" }} />
//               {fromData3.map((item, i) => (
//                 <div className={s.anketa} key={i}>
//                   <label htmlFor="">{item.title}</label>
//                   {item.name === "guarantor_phone_1" ||
//                   item.name === "guarantor_phone_2" ? (
//                     <InputMask
//                       placeholder="+996(ХХХ) ХХ-ХХ-ХХ"
//                       mask="+996 (___) __-__-__"
//                       {...register(item.name)}
//                       replacement={{ _: /\d/ }}
//                     />
//                   ) : (
//                     <input {...register(item.name)} placeholder={item.title} />
//                   )}
//                 </div>
//               ))}
//               {fromData4.map((item, i) => (
//                 <div className={s.anketa} key={i}>
//                   <label htmlFor="">{item.title}</label>
//                   {item.name === "guarantor_phone_1" ||
//                   item.name === "guarantor_phone_2" ? (
//                     <InputMask
//                       placeholder="+996(ХХХ) ХХ-ХХ-ХХ"
//                       mask="+996 (___) __-__-__"
//                       {...register(item.name, {
//                         required: "Поле обязательно к заполнению",
//                         maxLength: {
//                           value: item.maxLength,
//                           message: `Максимальная длина ${item.maxLength} символов`,
//                         },
//                       })}
//                       replacement={{ _: /\d/ }}
//                     />
//                   ) : (
//                     <>
//                       <div className="between">
//                         <input
//                           type={
//                             (item.name === "password" ? eye : res)
//                               ? "text"
//                               : "password"
//                           }
//                           {...register(item.name, {
//                             required: "Поле обязательно к заполнению",
//                             maxLength: {
//                               value: item.maxLength,
//                               message: `Максимальная длина ${item.maxLength} символов`,
//                             },
//                           })}
//                           placeholder={item.title}
//                         />

//                         <div
//                           className={s.eye}
//                           onClick={
//                             item.name === "password" ? eyeFuntion : resFuntion
//                           }
//                         >
//                           {(item.name === "password" ? eye : res) ? (
//                             <AiOutlineEye className={s.logo} />
//                           ) : (
//                             <AiOutlineEyeInvisible className={s.logo} />
//                           )}
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   {errors[item.name] && (
//                     <p className={s.error}>{errors[item.name].message}</p>
//                   )}
//                 </div>
//               ))}
//               <button className={s.btn_orange}>
//                 {status === "loading" ? <Loader /> : "ОТПРАВИТЬ АНКЕТУ"}
//               </button>
//             </form>
//           </>
//         )}

//         <Modal
//           open={open}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box style={{ maxWidth: "400px" }} sx={style}>
//             <button className={s.BsX} onClick={() => setOpen(false)}>
//               <BsX />{" "}
//             </button>
//             <div className={s.anketaBox}>
//               <p>Код подтверждения:</p>
//             </div>
//             <div className={s.fromCod}>
//               <div className={s.cont}>
//                 <AuthCode
//                   length={6}
//                   allowedCharacters="numeric"
//                   containerClassName={s.contai}
//                   onChange={handleOnChange}
//                 />
//               </div>
//               <button onClick={() => phoneVerify()}>ОТПРАВИТЬ</button>
//             </div>
//           </Box>
//         </Modal>
//         {isClientListModule && (
//           <div className={s.catalogModal}>
//             <span className={s.inputsCatalogModal}>
//               <input
//                 type="text"
//                 value={search}
//                 placeholder="поиск"
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <button
//                 onClick={() => handleSearch()}
//                 className={s.ButtonsCatalogModal}
//                 disabled={search === null}
//               >
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M14.3851 15.4461C13.0371 16.5232 11.3278 17.0432 9.60827 16.8994C7.88877 16.7556 6.28961 15.9588 5.13922 14.6728C3.98883 13.3867 3.37455 11.709 3.42254 9.98415C3.47052 8.25932 4.17713 6.61834 5.39725 5.39822C6.61736 4.17811 8.25835 3.4715 9.98318 3.42351C11.708 3.37553 13.3857 3.98981 14.6718 5.1402C15.9579 6.29058 16.7546 7.88975 16.8984 9.60924C17.0422 11.3287 16.5222 13.038 15.4451 14.3861L20.6011 19.5411C20.6748 19.6097 20.7339 19.6925 20.7749 19.7845C20.8159 19.8765 20.8379 19.9758 20.8397 20.0765C20.8415 20.1772 20.8229 20.2773 20.7852 20.3707C20.7475 20.4641 20.6913 20.5489 20.6201 20.6201C20.5489 20.6913 20.4641 20.7475 20.3707 20.7852C20.2773 20.8229 20.1773 20.8414 20.0766 20.8397C19.9759 20.8379 19.8766 20.8158 19.7846 20.7748C19.6926 20.7339 19.6098 20.6748 19.5411 20.6011L14.3851 15.4461ZM6.46009 13.8841C5.72613 13.15 5.22624 12.2149 5.0236 11.1968C4.82096 10.1788 4.92466 9.1235 5.3216 8.16437C5.71854 7.20523 6.3909 6.38529 7.2537 5.80817C8.11651 5.23105 9.13103 4.92265 10.1691 4.92195C11.2071 4.92125 12.222 5.22828 13.0856 5.80424C13.9492 6.3802 14.6226 7.19924 15.0209 8.15784C15.4191 9.11644 15.5242 10.1716 15.323 11.1899C15.1217 12.2082 14.6231 13.144 13.8901 13.8791L13.8851 13.8841L13.8801 13.8881C12.8952 14.8707 11.5605 15.4222 10.1693 15.4214C8.77801 15.4207 7.44394 14.8678 6.46009 13.8841Z"
//                     fill="white"
//                   />
//                 </svg>
//               </button>
//             </span>
//             <div className={s.catalogBlock}>
//               {dataclinet.status === "loading" && <Loader />}
//               {dataclinet.status === "succeeded" &&
//               dataclinet.data?.results?.length > 0 ? (
//                 dataclinet.data?.results?.map((res) => (
//                   <Link
//                     href={`/pages/Questionnaire/${res.id}`}
//                     className={s.catalogCard}
//                   >
//                     <h2>{res.full_name}</h2>
//                     <p>+{res.phone}</p>
//                   </Link>
//                 ))
//               ) : (
//                 <p> Нету данных</p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };
// export default Questionnaire;

// //   <AuthCode
// //   length={6}
// //   allowedCharacters="numeric"
// //   inputClassName="input"
// //  style={{  margin: "16px"}}
// //   onChange={(e) => setCode(e.target.value)}  />
