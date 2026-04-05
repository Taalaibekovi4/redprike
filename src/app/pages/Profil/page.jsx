"use client";
import React, { useState, useEffect } from "react";
import s from "./page.module.scss";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/Cards/Card/Card";
import { FaHeart } from "react-icons/fa6";
import ApplicationCard from "@/components/Cards/ApplicationCard/ApplicationCard";
import { fetchFavoritesData } from "@/app/store/slice/favoritesSlice";

import {
  updateAvatarDate,
  updateFullNameDate,
} from "@/app/store/slice/ubdateSlice";
import { userProfile } from "@/app/store/slice/signInSlice";
import Spiner from "@/components/Spiner/Spiner";
import Image from "next/image";
import NothingFound2 from "@/components/NothingFound2/NothingFound2";
import { Loader } from "@/components/Loader/Loader";
import {
  handleSearchModal,
  handleTabProfil,
} from "@/app/store/slice/modalSlice";
import cm from "classnames";
import { useEffectOnce } from "usehooks-ts";

import {
  fetchPurchaseRequestList,
  fetchPurchaseRequestListById,
  setPurchaseRequestList,
} from "@/app/store/slice/purchaseRequestList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Masonry from "react-smart-masonry";
import {
  BsFillBasket2Fill,
  BsFillBasket3Fill,
  BsFillBasketFill,
} from "react-icons/bs";
function Profil() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.signIn);
  const { dataId, favorites, status } = useSelector((state) => state.favorites);
  const { fullName, photo, loading } = useSelector((state) => state.ubdate);
  const { tap, search } = useSelector((state) => state.modal);
  const [delet, setDelet] = useState(false);
  const [pen, setPen] = useState(false);
  const [modal, setModal] = useState(false);
  const [categoryIds, setCategoryIds] = useState(null);
  const [dataProduct, setDataProduct] = useState([]);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    dispatch(fetchFavoritesData());
  }, [dataId]);

  console.log(userInfo);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(updateAvatarDate(file));
    }
  };
  const PurchaseRequestList = useSelector(
    (state) => state.purchaseRequestListSlice
  );
  useEffect(() => {
    dispatch(fetchPurchaseRequestList());
  }, []);
  useEffect(() => {
    setDataProduct(PurchaseRequestList?.data?.results);
  }, [PurchaseRequestList?.data?.results]);
  const handleClick = () => {
    localStorage.setItem("userToken", JSON.stringify(""));
    dispatch(userProfile(null));
  };

  const submitFullName = (data) => {
    dispatch(updateFullNameDate(data));
    setPen(!pen);
  };

  useEffect(() => {
    if (pen || delet || modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [pen, delet, modal]);

  const masonryBreakpoints = {
    default: 2,

    800: 1,
  };

  const getExpectation = () => {
    dispatch(fetchPurchaseRequestListById());
    dispatch(handleSearchModal(2));
  };
  const getApplications = () => {
    dispatch(fetchPurchaseRequestList());
    setDataProduct(PurchaseRequestList.data?.results);
    dispatch(handleSearchModal(1));
  };
  const SortApplications = () => {
    const sortedData = [...dataProduct].sort((a, b) => a.sent_at - b.sent_at);
    setDataProduct(sortedData);
    dispatch(handleSearchModal(3));
  };

  return (
    <div className={s.profil}>
      <ToastContainer
        stacked
        className={""}
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
      {delet && (
        <div className={s.basket_modal}>
          <div className={s.blog}>
            <Image
              width={40}
              height={40}
              src={"/img/coout.svg"}
              className={s.logo}
            />
            <div>
              <h4>Выйти?</h4>
              <span>Выйти из учётной записи</span>
            </div>
            <div className={s.btn_button}>
              <button onClick={() => setDelet(!delet)}>Нет</button>

              <button onClick={() => handleClick()}>
                <a href="/">Да</a>
              </button>
            </div>
          </div>
        </div>
      )}
      {pen && (
        <div id="prof" className={`${s.modal} flex center`}>
          <div className={s.wrappers}>
            <form className={s.block} onSubmit={handleSubmit(submitFullName)}>
              <div className="between">
                <h3>Настройки профиля</h3>
                <h1 onClick={() => setPen(!pen)}>x</h1>
              </div>
              <label htmlFor="">ФИО</label>
              <div className={s.input}>
                <input
                  defaultValue={userInfo?.full_name}
                  {...register("full_name", {
                    required: "Поле обязателно к заполнина",
                  })}
                  type="text"
                  placeholder="ФИО"
                />
                {errors && (
                  <p className={"error"}>{errors?.full_name?.message}</p>
                )}
              </div>
              <button
                style={{
                  opacity: isValid ? "1" : "0.6",
                }}
                className={s.btn_orange}
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="container">
        <h2 className={s.profil_title}>Личный кабинет</h2>
        <div className={s.blog}>
          <div className={`${s.flexes} flex`} style={{ gap: "24px" }}>
            {userInfo?.user_id.avatar ? (
              <img className={s.img} src={userInfo?.user_id.avatar} alt="" />
            ) : (
              <div className={`${s.adam} center`}>
                <Image src={"/img/adam.svg"} alt="/" width={60} height={60} />
              </div>
            )}
            <div className={s.centerAdap}>
              <h4>{userInfo?.user_id.full_name}</h4>
              <div className={s.flexe}>
                <p>+{userInfo?.user_id.phone}</p>
              </div>
              <h6 onClick={() => setDelet(!delet)} className={s.none}>
                Выйти из учётной записи
              </h6>
            </div>
          </div>
          <div className={s.zoom}>
            <h3 className={s.setting}>Настройки приложения</h3>
            <div
              id={s.prof}
              className={`${s.ret} flex`}
              style={{
                gap: "13px",
                marginBottom: "16px",
                cursor: "pointer",
              }}
              onClick={() => setPen(!pen)}
            >
              <div className={`${s.images} center`}>
                <Image src={"/img/pen3.svg"} alt="" width={16} height={16} />
                <Image
                  className={s.none}
                  src={"/img/app1.svg"}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <p>Редактировать личные данныe</p>
            </div>
            <div
              className={`${s.ret} flex`}
              style={{
                gap: "13px",
                marginBottom: "16px",
                cursor: "pointer",
              }}
            >
              <div className={`${s.images} center`}>
                <Image src={"/img/pen2.svg"} alt="" width={16} height={16} />
                <Image
                  className={s.none}
                  src={"/img/app2.svg"}
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <form method="post" encType="multipart/form-data">
                <label class={s.input_file}>
                  <input
                    onChange={(event) => handleFileChange(event)}
                    name="picture"
                    accept="image/*"
                    type="file"
                  />
                  <span class={s.input_file_btn}>Сменить фото профиля</span>
                </label>
              </form>
            </div>
            <div className={s.zakazy}>
              <h3 className={s.setting}>Заказы и товары</h3>
              <Link href={`/pages/Profil/${1}`}>
                <div
                  className={`${s.none} flex`}
                  style={{
                    gap: "8px",
                    marginBottom: "16px",
                    cursor: "pointer",
                  }}
                >
                  <div className={`${s.images} center`}>
                    {tap == 1 ? (
                      <Image
                        src={"/img/app4.svg"}
                        alt=""
                        width={24}
                        height={24}
                      />
                    ) : (
                      <Image src={"/img/z.svg"} alt="" width={24} height={24} />
                    )}
                  </div>
                  <p>История заявок</p>
                </div>
              </Link>
              <Link href={`/pages/Basket`}>
                <div
                  className={`${s.none} flex`}
                  style={{
                    gap: "8px",
                    marginBottom: "16px",
                    cursor: "pointer",
                  }}
                >
                  <div className={`${s.images} center`}>
                    <BsFillBasket3Fill color="#EE5922" size={24} />
                  </div>
                  <p> Корзина</p>
                </div>
              </Link>
              <Link
                href={"/pages/Favorites"}
                className={`${s.none} flex`}
                style={{
                  gap: "8px",
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
              >
                <div className={`${s.images} center`}>
                  <Image src={"/img/app5.svg"} alt="/" width={24} height={24} />
                </div>
                <p>Избранные товары</p>
              </Link>
              <div
                id={s.password}
                className={`${s.none} flex`}
                style={{
                  gap: "8px",
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
                onClick={() => setDelet(!delet)}
              >
                <div className={`${s.images} center`}>
                  <Image src={"/img/app6.svg"} alt="/" width={24} height={24} />
                </div>
                <p>Выйти из учётной записи</p>
              </div>
            </div>
          </div>
        </div>
        <div className={s.border}></div>
        <div className={s.buttons}>
          <div className={s.btn_wrapper}>
            <div className={s.btns}>
              <button
                onClick={() => dispatch(handleTabProfil(1))}
                style={{
                  backgroundColor: tap === 1 ? "#ee5922" : "",
                  color: tap === 1 ? "#fff" : "#ee5922",
                }}
              >
                {tap == 1 ? (
                  <Image
                    src="/img/solar.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image src={"/img/z.svg"} alt="" width={20} height={20} />
                )}

                История заявок
              </button>

              <button
                onClick={() => dispatch(handleTabProfil(2))}
                style={{
                  backgroundColor: tap === 2 ? "#ee5922" : "",
                  color: tap === 2 ? "#fff" : "#ee5922",
                }}
              >
                <FaHeart
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
                Избранные товары
              </button>
              <Link
                href={"/pages/Basket"}
                style={{
                  backgroundColor: tap === 3 ? "#ee5922" : "#F0F0F0",
                  color: tap === 3 ? "#fff" : "#ee5922",
                }}
              >
                <BsFillBasket3Fill color="#EE5922" size={24} />
                Корзина
              </Link>
            </div>
            {tap === 1 && (
              <div className={s.btn}>
                <button
                  onClick={() => getApplications()}
                  className={cm(s.isSearch, {
                    [s.isSearchAcc]: search === 1,
                  })}
                >
                  Заявки
                </button>
                <button
                  onClick={() => getExpectation()}
                  className={cm(s.isSearch, {
                    [s.isSearchAcc]: search === 2,
                  })}
                >
                  В ожидании ({PurchaseRequestList?.data?.count})
                </button>
              </div>
            )}
            {PurchaseRequestList.status === "loading" && <Loader />}
            <Masonry columns={screenWidth < 800 ? 1 : 2} gap={20}>
              {PurchaseRequestList.status === "succeeded" &&
                tap === 1 &&
                dataProduct?.map((item, index) => {
                  return (
                    <div className="" key={index}>
                      <ApplicationCard item={item} />
                    </div>
                  );
                })}
            </Masonry>
            <>
              {tap === 2 && (
                <div>
                  <div>
                    {favorites?.length > 0 ? (
                      <div className={s.favorites}>
                        {favorites?.map((item) => {
                          return (
                            <div className="" key={item.id}>
                              <Card item={item} />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <>
                        <NothingFound2 />
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
