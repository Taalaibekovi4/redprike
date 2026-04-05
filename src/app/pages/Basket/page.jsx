"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import s from "./page.module.scss";
import Image from "next/image";
import { MdDeleteSweep } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  autoError,
  deleteAllBasketItem,
  deleteBasketItem,
  fetchBasketData,
  fetchBasketSubmitData,
  fetchBasketUpdate,
} from "@/app/store/slice/basketSlice";
import Navigation from "@/components/Navigation/Navigation";
import { Loader } from "@/components/Loader/Loader";
import Link from "next/link";
import { getClientList } from "@/app/store/slice/client_list-slice";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spiner from "@/components/Spiner/Spiner";
import Footer from "@/components/Footer/Footer";
import {
  handleModal,
  handleTabClick,
  handleBasketModal,
  handleSearchModal,
} from "@/app/store/slice/modalSlice";

export default function page({ searchParams }) {
  const windowRef = useRef();
  const [modal, setModal] = useState(false);
  const [modalClear, setModalClear] = useState(false);
  const [orders, setOrders] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const linkRef = React.useRef();

  const dispatch = useDispatch();
  const { submitBasket, data, loading, error } = useSelector(
    (state) => state.basket
  );

  const { basketModal } = useSelector((state) => state.modal);

  const { userInfo, userToken } = useSelector((state) => state.signIn);
  const clientList = useSelector((state) => state.clientListSlice);

  const filteredData = clientList?.data?.results?.filter((item) =>
    item.full_name.toLowerCase().includes(filterValue.toLowerCase())
  );

  useEffect(() => {
    if (searchParams.name === "userOk") {
      submitOrderClient();
      linkRef.current.click();
    }
  }, [searchParams.name === "userOk"]);

  useEffect(() => {
    dispatch(fetchBasketData());
  }, []);

  useEffect(() => {
    dispatch(getClientList());
  }, [userInfo]);

  const deleteProduct = (itemId) => {
    dispatch(deleteBasketItem(itemId));
    setModal(!modal);
  };

  const deleteBasket = (id) => {
    setModal(!modal);
    setItemId(id);
  };

  const submitOrder = (id) => {
    const products = [];
    data?.map((item) => {
      products.push({
        product_id: item.product_variations.id,
        product_count: item.product_count,
      });
    });
    dispatch(
      fetchBasketSubmitData({ questionnaire_id: id, products: products })
    );
    setOrders(!orders);
  };

  const submitOrderClient = () => {
    const products = [];
    data?.map((item) => {
      products.push({
        product_id: item.product_variations.id,
        product_count: item.product_count,
      });
    });
    dispatch(fetchBasketSubmitData({ products: products }));
  };

  useEffect(() => {
    if (orders || modal || modalClear) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [orders, modal || modalClear]);

  const handleQuestionnaire = () => {
    dispatch(handleModal(true));
    dispatch(handleTabClick(2));
  };

  useEffect(() => {
    if (submitBasket.error) {
      setTimeout(() => {
        dispatch(autoError(null));
      }, 8000);
    }
  }, [submitBasket.error]);

  const scrollToTop = () => {
    windowRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, [submitBasket.error]);

  return (
    <>
      <Link
        ref={linkRef}
        style={{ position: "absolute" }}
        href="/pages/Basket"
      ></Link>
      <div className="container">
        <Navigation />
        <ToastContainer
          className={""}
          autoClose={1000}
          limit={10}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className={s.basket}>
          {basketModal && (
            <div className={s.basket_modal}>
              <div className={s.blog}>
                <Image
                  src={"/img/FrameBasket.svg"}
                  objectFit="cover"
                  width={300}
                  height={223}
                  alt=""
                />
                <div>
                  <h4>Заказ успешно оформлен</h4>
                  <p className={s.title}>
                    Ожидайте подтверждения заказа, проведения оплаты и доставки!
                  </p>
                </div>
                <div className={s.btn}>
                  <Link
                    onClick={() => dispatch(handleBasketModal(!basketModal))}
                    className={s.link}
                    href="/"
                  >
                    На главную
                  </Link>
                  <Link
                    href={"/pages/Profil"}
                    className={s.button}
                    onClick={() => {
                      dispatch(fetchPurchaseRequestListById());
                      dispatch(handleBasketModal(!basketModal));
                      dispatch(handleSearchModal(2));
                    }}
                  >
                    В заказы
                  </Link>
                </div>
              </div>
            </div>
          )}
          {modalClear && (
            <div className={s.basket_modal}>
              <div className={s.blog}>
                <MdDelete className={s.logo} />
                <div>
                  <h4>Очистить товар?</h4>
                  <p>Вы действительно хотите очистить корзину?</p>
                </div>
                <div className={s.btn}>
                  <button onClick={() => setModalClear(!modalClear)}>
                    Нет
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deleteAllBasketItem());
                      setModalClear(!modalClear);
                    }}
                  >
                    Да
                  </button>
                </div>
              </div>
            </div>
          )}
          {modal && (
            <div className={s.basket_modal}>
              <div className={s.blog}>
                <MdDelete className={s.logo} />
                <div>
                  <h4>Удалить товар?</h4>
                  <p>Удалить выбранный товар из корзины?</p>
                </div>
                <div className={s.btn}>
                  <button onClick={() => setModal(!modal)}>Нет</button>
                  <button onClick={() => deleteProduct(itemId)}>Да</button>
                </div>
              </div>
            </div>
          )}
          {orders && (
            <>
              {userInfo?.user_id?.role === "CLIENT" ? null : (
                <div className={s.basket_client}>
                  <div className={s.client}>
                    <div className={s.header}>
                      <h6>Выберите пользователя</h6>
                      <button
                        className={s.close}
                        onClick={() => setOrders(!orders)}
                      >
                        <IoClose className={s.logo} />
                      </button>
                    </div>
                    <div className={s.search}>
                      <input
                        type="text"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder="Поиск"
                      />
                      <button>
                        <FiSearch className={s.logo} />
                      </button>
                    </div>
                    <div className={s.client_list}>
                      {filteredData?.map((user) => {
                        return (
                          <>
                            <div
                              onClick={() => submitOrder(user.id)}
                              key={user.id}
                              className={s.client_item}
                            >
                              <h3>{user.full_name}</h3>
                              <p>{user.phone}</p>
                            </div>
                          </>
                        );
                      })}
                      <Link className={s.link} href={"/pages/Questionnaire"}>
                        ЗАПОЛНИТЬ АНКЕТУ
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <>
            {submitBasket.loading && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "rgba(0, 0, 0, 0.50)",
                  backdropFilter: "blur(6px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className={s.Block2}>
                  <span className={s.loader}>
                    <Image
                      src={"/img/servis.svg"}
                      className={s.logo}
                      alt=""
                      width={120}
                      height={50}
                    />
                    <span className={s.loadersd}></span>
                  </span>
                </div>
              </div>
            )}
            {data?.length > 0 ? (
              <>
                <div className={s.baskets}>
                  <div className={s.header_basket}>
                    <h3>Корзина</h3>
                    <button
                      onClick={() => setModalClear(!modalClear)}
                      className={s.clear}
                    >
                      Очистить корзину
                    </button>
                  </div>

                  <div className={s.wrapper}>
                    {data?.map((e) => {
                      return (
                        <div key={e.id}>
                          {submitBasket?.error?.message ? null : (
                            <>
                              {submitBasket?.error?.find((item) => {
                                return item.id === e.product_variations?.id;
                              }) && <p ref={windowRef}></p>}
                            </>
                          )}
                          <div className={s.card}>
                            {e.product_variations?.images[0]?.image ? (
                              <img
                                className={s.img}
                                src={e.product_variations?.images[0]?.image}
                                alt=""
                              />
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  className={s.img_none}
                                  src="/img/image-none.svg"
                                />
                              </div>
                            )}
                            <div className={s.info}>
                              <div className={s.title}>
                                <Link href={`/pages/${e.product?.id}`}>
                                  <h4 className={s.name}>{e.product?.title}</h4>
                                  <h4 className={s.name_mobile}>
                                    {(e.product?.title).slice(0, 20)}
                                  </h4>
                                </Link>
                                <div>
                                  <MdDeleteSweep
                                    onClick={() => deleteBasket(e.id)}
                                    className={s.delete}
                                  />
                                </div>
                              </div>
                              <div className={s.btn}>
                                <FaMinus
                                  onClick={() =>
                                    dispatch(
                                      fetchBasketUpdate({
                                        plus: false,
                                        product_id: e.id,
                                        product_count: e.product_count,
                                      })
                                    )
                                  }
                                  className={s.button}
                                />
                                <p>
                                  <span>{e.product_count}</span>
                                </p>
                                <FaPlus
                                  onClick={() =>
                                    dispatch(
                                      fetchBasketUpdate({
                                        plus: true,
                                        product_id: e.id,
                                        product_count: e.product_count,
                                      })
                                    )
                                  }
                                  className={s.button}
                                />
                              </div>
                              <p className={s.price}>
                                Цена: {e.product_variations?.product_price}
                                {e.product_variations?.currency_unit?.currency}
                              </p>
                              <h5 className={s.prices}>
                                <span>Итого цена:</span>
                                <span>
                                  {e.product_variations?.product_price *
                                    e.product_count}
                                  c
                                </span>
                              </h5>
                            </div>
                          </div>
                          {submitBasket?.error?.message ? null : (
                            <>
                              {submitBasket?.error?.find((item) => {
                                return item.id === e.product_variations?.id;
                              }) && (
                                <p className={s.error}>
                                  Возможно данного товара нет в наличии,
                                  пажалуйста уточняйте у специалиста
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className={s.footer_title}>
                    <h3>ВЫБРАННЫЕ ТОВАРЫ</h3>
                    <p>
                      <span>Товаров:</span> <span>{data.length}</span>
                    </p>
                    {/* <p>
                      <span>Скидка:</span> <span>10%</span>
                    </p> */}
                    <h4>
                      <span>Итого цена:</span>
                      <span>
                        {data.reduce(
                          (total, item) =>
                            total +
                            item.product_variations?.product_price *
                              item.product_count,
                          0
                        )}
                        c
                      </span>
                    </h4>
                  </div>
                  {userInfo ? (
                    <>
                      {userInfo?.user_id?.role === "CLIENT" ? (
                        <button
                          onClick={() => submitOrderClient()}
                          className={s.Send}
                        >
                          Отправить заявку
                        </button>
                      ) : (
                        <button
                          onClick={() => setOrders(!orders)}
                          className={s.Send}
                        >
                          Отправить заявку
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleQuestionnaire()}
                      className={s.Send}
                    >
                      Отправить заявку
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className={s.no_basket}>
                <Image
                  src={"/img/basket.svg"}
                  objectFit="cover"
                  width={300}
                  height={265}
                  alt=""
                />
                <h3>Ничего нет в корзине</h3>
                <p>
                  Вы можете найти товары в каталоге и добавить их в корзину
                  чтобы потом выбрать их и сделать заказ.
                </p>
                <Link href="/pages/catalog" className={s.no_btn}>
                  Найти товары в каталоге
                </Link>
              </div>
            )}
          </>
        </div>
      </div>
      <Footer />
    </>
  );
}
