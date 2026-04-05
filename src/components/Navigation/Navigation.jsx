"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import { FiSearch } from "react-icons/fi";
import filtr from "@/../../public/img/aa2.svg";
import favorites from "@/../../public/img/aa3.svg";
import basket from "@/../../public/img/aa1.svg";
import registr from "@/../../public/img/aa4.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  handleModal,
  handleTabClick,
  handleTabProfil,
} from "@/app/store/slice/modalSlice";
import Link from "next/link";
import { fetchBasketData } from "@/app/store/slice/basketSlice";
import { set, useForm } from "react-hook-form";
import { getSearch } from "@/app/store/slice/search-slice";
import { FaRegCircle } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { fetchCategoryListData } from "@/app/store/slice/catalog-slice";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("../Modal/Modal"));
export default function Navigation({ req }) {
  const { userInfo, userToken } = useSelector((state) => state.signIn);
  const { modal, value } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [module, setModule] = useState(false);
  const params = usePathname();
  console.log(params, "params");
  const ref = React.useRef();
  const [isAccordion, setIsAccordion] = useState(false);
  const [search, setSearch] = useState("");
  const [idSord, setIdSord] = useState(1);
  useEffect(() => {
    dispatch(fetchBasketData());
    dispatch(fetchCategoryListData());
  }, []);

  const { error, categoryData, dataFilter } = useSelector(
    (state) => state.catalog
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const onSubmit = (data) => {
    window.scrollTo(0, 0);
    dispatch(getSearch(data.asdhasjdkhaskjdhsaj));
    setModule(true);
    if (params !== "/pages/search") {
      ref.current.click();
    }
  };

  const handleClick = (e) => {
    window.scrollTo(0, 0);

    dispatch(getSearch(search));
    setModule(true);
    e.preventDefault();
    if (params !== "/pages/search") {
      ref.current.click();
    }
  };
  const { data, status } = useSelector((state) => state.searchSlice);

  useEffect(() => {
    if (isAccordion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isAccordion]);
  // useEffect(() => {
  //   const handleClick = () => {
  //     setModule(false);
  //   };
  //   const handleEsc = () => {
  //     setIsAccordion(false);
  //   };

  //   document.addEventListener("click", handleClick, handleEsc);

  //   return () => {
  //     document.removeEventListener("click", handleClick, handleEsc);
  //   };
  // });

  return (
    <>
      <Link ref={ref} href={"/pages/search"} style={{ display: "none" }}></Link>
      {modal && <Modal />}
      <div className={`${s.blok}`}>
        <div className="flex" style={{ gap: "20px", width: "100%" }}>
          {userInfo ? (
            <Link href={"/pages/Questionnaire"} className={`${s.btn_catalog}`}>
              <Image
                className={s.image}
                src={"/img/catalog.svg"}
                alt=""
                width={24}
                height={24}
              />
              Заполните анкету
            </Link>
          ) : (
            <></>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${s.input_go} between`}
          >
            <input
              type="text"
              placeholder="Что найти?"
              {...register("asdhasjdkhaskjdhsaj")}
            />
            <button
              disabled={!isValid}
              style={{ opacity: isValid ? "1" : "0.6" }}
              className={s.btn_orange}
            >
              <FiSearch className={s.search} size={20} />
            </button>
          </form>
        </div>
        <div className={`${s.button}`}>
          <Link href={"/pages/catalog"} className={s.filter}>
            <div className={s.image}>
              <Image src={filtr} alt="" width={14} height={14} />
            </div>
            <p>Фильтр</p>
          </Link>
          {userInfo ? (
            <>
              <Link href={"/pages/Favorites"} className={s.favorites_mobile}>
                <div className={s.image}>
                  <Image src={favorites} alt="" width={17} height={17} />
                </div>
                <p>Избранные</p>
              </Link>
              <Link
                href={"/pages/Profil"}
                onClick={() => dispatch(handleTabProfil(2))}
                className={s.favorites_web}
              >
                <div className={s.image}>
                  <Image src={favorites} alt="" width={17} height={17} />
                </div>
                <p>Избранные</p>
              </Link>
            </>
          ) : (
            <>
              <Link href={"/pages/Favorites"} className={s.favorites_mobile}>
                <div className={s.image}>
                  <Image src={favorites} alt="" width={17} height={17} />
                </div>
                <p>Избранные</p>
              </Link>
              <Link href={"/pages/Favorites"} className={s.favorites_web}>
                <div className={s.image}>
                  <Image src={favorites} alt="" width={17} height={17} />
                </div>
                <p>Избранные</p>
              </Link>
            </>
          )}
          <Link href={"/pages/Basket"} className={s.item}>
            <div className={s.login}>
              <Image src={basket} alt="" width={16} height={16} />
            </div>
            <p>Корзина</p>
          </Link>
          {userInfo ? (
            <>
              {userInfo.avatar ? (
                <>
                  <Link className={s.user_logo} href={"/pages/Profil"}>
                    <img className={s.logo} src={userInfo.avatar} alt="" />
                    <p>Профиль</p>
                  </Link>
                </>
              ) : (
                <Link className={s.user_avatar} href={"/pages/Profil"}>
                  <div className={s.user}>
                    <Image
                      className={s.avatar}
                      src={"/img/adam.svg"}
                      width={30}
                      height={30}
                      alt=""
                    />
                  </div>
                  <p>Профиль</p>
                </Link>
              )}
            </>
          ) : (
            <div
              className={s.item}
              onClick={() => {
                dispatch(handleTabClick(1));
                dispatch(handleModal(!modal));
              }}
            >
              {/* <div className={s.login}>
                <Image src={registr} alt="" width={14} height={14} />
              </div> */}
              {/* <p>Войти</p> */}
            </div>
          )}
        </div>
      </div>
      <div className={s.mobil_input}>
        <form className={`${s.mobil_search} `} onSubmit={handleClick}>
          <input
            type="text"
            placeholder="Что найти?"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className={s.search} size={20} onClick={handleClick} />
        </form>
        <Link href={"/pages/catalog"} className={s.logo}>
          <Image src={filtr} alt="" width={14} height={14} />
        </Link>
      </div>

      {isAccordion && (
        <div className={s.modals1} onClick={() => setIsAccordion(!isAccordion)}>
          <div className={s.modal1}>
            <div className={`${s.btns} `}>
              <h5>Сортировка цены</h5>
            </div>
            <div className={`${s.btn_one} `}>
              {categoryData.data?.results?.map((el) => (
                <Link
                  className={`between ${s.btn}`}
                  href={{
                    pathname: "/pages/catalog",
                    query: { name: `${el.id}` },
                  }}
                  onClick={() => setIdSord(el.id)}
                >
                  <p>{el.title}</p>

                  {el.id === idSord ? (
                    <div className={s.FaRegCircleCheck}>
                      <IoIosCheckmarkCircle />
                    </div>
                  ) : (
                    <div className={s.FaRegCircle}>
                      <FaRegCircle />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

//ewqweq