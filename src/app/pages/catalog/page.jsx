"use client";
import React, { use, useEffect, useState, useRef } from "react";
import s from "./page.module.scss";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCatalogData,
  fetchCatalogData2,
  fetchCategoryListData,
  filterData,
} from "@/app/store/slice/catalog-slice";
import Card from "@/components/Cards/Card/Card";
import cm from "classnames";
import { BiChevronUp } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa6";
import { IoIosCheckmarkCircle, IoMdReturnLeft } from "react-icons/io";
import NothingFound from "@/components/NothingFound/NothingFound";
import { Loader } from "@/components/Loader/Loader";
import { useEffectOnce, useEventListener } from "usehooks-ts";
import Navigation from "@/components/Navigation/Navigation";
import Image from "next/image";
import { useParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import Nav from "@/components/Nav/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = (params) => {
  const [expanded, setExpanded] = useState(false);
  const [isAccordion, setIsAccordion] = useState(false);
  const [itsAccordion, setItsAccordion] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const [categoryIds, setCategoryIds] = useState(null);
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [min_price, setMin_price] = useState(null);
  const [max_price, setMax_price] = useState(null);
  const [reachedLimit, setReachedLimit] = useState(true);
  const [time, setTime] = useState(false);
  const [idSord, setIdSord] = useState("new");
  const dispatch = useDispatch();
  const [d, setD] = useState(false);
  const [dataclinet, setDatasClient] = useState([]);
  useEffect(() => {
    dispatch(fetchCatalogData2(page)), dispatch(fetchCategoryListData());
  }, []);

  const { data, status, error, categoryData, dataFilter } = useSelector(
    (state) => state.catalog
  );
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const fetchData = () => {
    const dats = [min_price, max_price, categoryId?.id, page, idSord];
    dispatch(fetchCatalogData(dats));
    setPage(page + 1);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    const pages = 1;
    const dats = [min_price, max_price, categoryId?.id, pages, idSord];
    if (
      min_price !== null ||
      max_price !== null ||
      categoryId !== undefined ||
      idSord !== undefined
    ) {
      dispatch(fetchCatalogData(dats));
    }
    setDatas([]);
    setD(true);
  };

  const handleScroll = () => {
    const indexProgress = Math.round(data?.count / 15);
    if (status === "loading" || indexProgress < page) {
      setHasMore(false);
      return;
    }

    setPage(page + 1);
    const dats = [min_price, max_price, categoryId?.id, page, idSord];
    dispatch(fetchCatalogData(dats));
  };

  useEffect(() => {
    if (status === "succeeded") {
      setDatas((prevData) => {
        return [...prevData, ...(data?.results ?? [])];
      });
      setReachedLimit(data?.next === null);
    }
  }, [data]);
  // useEventListener("scroll", handleScroll);
  useEffect(() => {
    if (isAccordion || itsAccordion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isAccordion, itsAccordion]);

  const hanbleModal = (event) => {
    event.preventDefault();
    setItsAccordion(!itsAccordion);
  };

  const jop = [
    {
      id: "new",
      text: "Сперва новые",
    },
    {
      id: "old",
      text: "Сперва старые",
    },
    {
      id: "cheap",
      text: "Сперва дешевле",
    },
    {
      id: "expensive",
      text: "Сперва дороже",
    },
  ];
  const [resultsIndex, setResultsIndex] = useState(0);

  console.log(dataclinet?.length, "dataclinet.length");
  useEffect(() => {
    const i = Math.round(data?.count / 15);

    setResultsIndex(i);
  }, [data?.count]);

  console.log(data?.count, "data.count");

  useEffect(() => {
    if (isAccordion === true) {
      let handler = () => {
        setIsAccordion(false);
      };
      document.addEventListener("click", handler);
      return () => {
        document.removeEventListener("click", handler);
      };
    }
  }, [isAccordion]);

  return (
    <>
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
      <div className={`${s.filter} container`}>
        <Nav />
        <div
          className={s.accordion}
          onClick={() => setIsAccordion(!isAccordion)}
        >
          <h2>
            {categoryId === null && "Выберите категорию товаров"}
            {categoryId?.title}
          </h2>
          <div
            className={cm(s.accordionIcon, {
              [s.isAccordionAcc]: isAccordion === true,
            })}
          >
            <BiChevronUp />
          </div>
          {isAccordion && (
            <div
              className={s.catalogModal}
              onClick={() => setIsAccordion(!isAccordion)}
            >
              <div
                onClick={() => setIsAccordion(!isAccordion)}
                style={{
                  width: "100%",
                  height: "100%",
                  // position: "fixed",
                  inset: "0",
                  bottom: "0",
                  top: "0",
                  zIndex: "999",
                  overflowY: "scroll",
                }}
              ></div>

              <span style={{ cursor: "pointer" }}>
                <p> Выберите категорию товаров</p>
                <BiChevronUp />
              </span>
              <div className={s.catalogBlock}>
                {categoryData.data?.results?.map((res) => (
                  <div
                    className={s.catalogCard}
                    onClick={() => setCategoryId(res)}
                  >
                    <h2>{res.title}</h2>
                    {categoryId?.id === res.id ? (
                      <div className={s.FaRegCircleCheck}>
                        <IoIosCheckmarkCircle size={23} />
                      </div>
                    ) : (
                      <div className={s.FaRegCircle}>
                        <FaRegCircle />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {isAccordion && (
            <div className={s.modal}>
              <div className={s.catalogModals}>
                <span style={{ cursor: "pointer" }}>
                  <p> Выберите категорию товаров</p>
                  <BiChevronUp />
                </span>
                <div className={s.catalogBlock}>
                  {categoryData.data?.results?.map((res) => (
                    <div
                      className={s.catalogCard}
                      onClick={() => setCategoryId(res)}
                    >
                      <h2>{res.title}</h2>
                      {categoryId?.id === res.id ? (
                        <div className={s.FaRegCircleCheck}>
                          <IoIosCheckmarkCircle size={23} />
                        </div>
                      ) : (
                        <div className={s.FaRegCircle}>
                          <FaRegCircle />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <form className={`${s.block} `}>
          <input
            type="number"
            value={min_price}
            onChange={(e) => setMin_price(e.target.value)}
            placeholder="Цена от: 1 000"
          />
          <input
            value={max_price}
            onChange={(e) => setMax_price(e.target.value)}
            type="number"
            placeholder="Цена до: 1 000"
          />
          <sapn onClick={hanbleModal} className={`${s.btn_filtr} ${s.modals}`}>
            {itsAccordion ? (
              <Image
                style={{
                  padding: "13px",
                  border: "1px solid #e71717",
                  borderRadius: "8px",
                }}
                className={s.img}
                src={"/img/fill.svg"}
                width={49}
                height={49}
              />
            ) : (
              <Image
                style={{
                  padding: "13px",
                  borderRadius: "8px",
                  border: "1px solid #000",
                }}
                className={s.img}
                src={"/img/aa2.svg"}
                width={48}
                height={48}
              />
            )}
            {itsAccordion && (
              <div className={s.modals1}>
                <div
                  onClick={() => setItsAccordion(!itsAccordion)}
                  className={s.close}
                ></div>
                <div className={s.modal1}>
                  <div className={`${s.btns} `}>
                    <h5>Сортировка цены</h5>
                  </div>
                  <div className={`${s.btn_one} `}>
                    {jop.map((el) => (
                      <div
                        className={`between ${s.btn}`}
                        onClick={() => setIdSord(el.id)}
                      >
                        <p>{el.text}</p>
                        {el.id === idSord ? (
                          <div className={s.FaRegCircleCheck}>
                            <IoIosCheckmarkCircle size={23} />
                          </div>
                        ) : (
                          <div className={s.FaRegCircle}>
                            <FaRegCircle />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </sapn>
          <button className={s.btn_orange} onClick={onSubmit}>
            ПОКАЗАТЬ
          </button>
        </form>
        <div>
          <div className={s.Result}>
            <p>
              Результат поискa: <b>{data?.count} товаров</b>{" "}
            </p>

            {d === true ? (
              <button
                className={s.btn_filtrssds}
                onClick={() => window.location.reload()}
              >
                <a href="/pages/catalog">Показать все </a>
              </button>
            ) : null}
          </div>
          <InfiniteScroll
            dataLength={datas?.length}
            next={handleScroll}
            hasMore={hasMore}
            loader={""}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Больше нет товаров</b>
              </p>
            }
          >
            <div className={s.Cards}>
              {datas?.map((res, index) => (
                <Card item={res} />
              ))}
            </div>
          </InfiniteScroll>
          {status === "loading" && <Loader />}
          {data?.results?.length === 0 && (
            <div className={s.NothingFound}>
              <NothingFound />
            </div>
          )}
        </div>
        {status === null && <NothingFound />}
      </div>
    </>
  );
};

export default page;

// {status === 'succeeded' && (

//   )}

// {data.results.length === 0 && <NothingFound/>}

// {status === 'failed' && <div>{error}</div>}
// {status == null && (
//   <NothingFound/>

// )}

// useEffect(() => {
//   setInterval(() => {
//     if (params?.searchParams?.name !== undefined) {
//       const dats = [null, null, params?.searchParams?.name, page + 1];
//       dispatch(fetchCatalogData(dats));
//       const filtetData = categoryData.data?.results?.filter(
//         (res) => res.id == params?.searchParams?.name
//       );
//       if (filtetData?.length >= 0) {
//         console.log(filtetData[0], "filtetData");
//         setCategoryId(filtetData[0]);
//       }
//       setDatas(data?.results);
//     }
//   }, 1000);
// }); das asdasd
// {status === "loading" && (
//   <div className={s.NothingFound}>
//     <Loader />
//   </div>
// )}