import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import s from "../pages.module.scss";
import Image from "next/image";
// import img from "../../../../public/img/o.svg";
import img from "../../../../public/img/about.svg";
import Navigation from "@/components/Navigation/Navigation";


export const metadata = {
  title: "Электроника сервис",
  description: "Прозрачность и надежность: делимся информацией, вдохновляя доверие и развивая будущее вместе.",
  icons: [
    {
      rel: "icon",
      sizes: "any",
      url: "/img/iconka.png",
    },
  ],
};

const data = [
  {
    id: 1,
    img: "/img/smail1.svg",
    title: "В основе нашей философии",
    text: "Лежит стремление к тому, чтобы не только предоставить доступ к электронике, но и создать уникальный опыт для каждого нашего клиента. Мы уделяем особое внимание подбору товаров, предлагая широкий ассортимент инновационных устройств, которые соответствуют самым высоким стандартам качества.",
  },
  {
    id: 2,
    img: "/img/smail2.svg",
    title: "Наша команда",
    text: "Профессионалов готова предоставить экспертную консультацию и поддержку в выборе техники, а также предложить персонализированные решения в соответствии с потребностями каждого клиента. Мы стремимся не только к продаже товаров, но и к созданию долгосрочных отношений с нашими клиентами, основанных на взаимном доверии и удовлетворении от использования современных технологий. ",
  },
  {
    id: 3,
    img: "/img/smail3.svg",
    title: "Наш сервис",
    text: "Также активно поддерживает инновации и развитие технологической области. Мы являемся партнерами ведущих производителей, поощряя внедрение новых технологий на рынке.",
  },
];

const check = [
  {
    id: 1,
    icon: "/img/check.svg",
    title:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore",
  },
  {
    id: 2,
    icon: "/img/check.svg",
    title: "Aes eos qui ratione voluptatem sequi nesciunt",
  },
  {
    id: 3,
    icon: "/img/check.svg",
    title:
      "Fveniam, quis nostrum rcitationem ullam corporis suscipit laboriosam,",
  },
  {
    id: 4,
    icon: "/img/check.svg",
    title: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et",
  },
  {
    id: 5,
    icon: "/img/check.svg",
    title:
      "Stiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
  },
  {
    id: 6,
    icon: "/img/check.svg",
    title: "Tnisi ut aliquid ex ea commodi conse",
  },
];

const imgs = [
  {
    id: 1,
    img: "/img/aq1.svg",
    title: "Разработка сайтов",
  },
  {
    id: 2,
    img: "/img/aq4.svg",
    title: "Продвижение в соц сетях",
  },
  {
    id: 3,
    img: "/img/aq2.svg",
    title: "Маркетинговый план",
  },
  {
    id: 4,
    img: "/img/aq3.svg",
    title: "Дизайн",
  },
];

function page() {
  return (
    <>
      <div className={`container `}>
        <Navigation />
        <div className={s.about}>
          <div className={s.abouts}>
            <div className={`${s.arod} `}>
              <div className={s.about_one}>
                <h1>Наша миссия</h1>
                {/* <h3>
                  <span>Cheberel.kg</span> является инновационным сервисом, стремящимся
                  обеспечить простой и доступный способ приобретения
                  электроники. <span>Наша миссия</span> заключается в предоставлении клиентам
                  гибких опций оплаты, включая кредит и наличные, чтобы сделать
                  современные технологии доступными каждому. Мы стремимся
                  обеспечить удовлетворение потребностей наших клиентов,
                  предоставляя качественные товары и индивидуальный сервис.
                  <span>
                    dolor sit amet, <br />
                    consectetur adipiscing elit.
                  </span>
                  Lacus, <br />
                  purus pulvinar elit tellus massa erat <br />
                  turpis congue.
                </h3> */}
                {/* <div
                  className="flex"
                  style={{ gap: "20px", padding: "30px 0" }}
                >
                  <div className={s.border}></div>
                  <p className={s.p}>
                     С нами каждый может легко оснастить свою жизнь
                    инновационными устройствами, не переживая о <br /> финансовых
                    ограничениях.
                  </p>
                </div> */}
                {/* <div
                  className={`${s.fleX}  ${s.arod1}`}
                  style={{ gap: "40px" }}
                >
                  <div>
                    <h2>2 000</h2>
                    <h6>Ut enim ad minima </h6>
                  </div>
                  <div>
                    <h2>547</h2>
                    <h6>
                      Smodi tempora <br /> incidunt{" "}
                    </h6>
                  </div>
                  <div>
                    <h2>1 474</h2>
                    <h6>
                      Qia non numquam <br /> eius{" "}
                    </h6>
                  </div>
                  <div>
                    <h2>1</h2>
                    <h6>
                      Abore et dolore <br /> agnam
                    </h6>
                  </div>
                </div> */}
              </div>
              {/* <div>
                <Image className={s.img} src={img} alt="" />
              </div> */}
            </div>
            {/* <div className={`${s.fleX}  ${s.arod2}`} style={{ gap: "40px" }}>
              <div>
                <h2>2 000</h2>
                <h6>Ut enim ad minima </h6>
              </div>
              <div>
                <h2>547</h2>
                <h6>
                  Smodi tempora <br /> incidunt{" "}
                </h6>
              </div>
              <div>
                <h2>1 474</h2>
                <h6>
                  Qia non numquam <br /> eius{" "}
                </h6>
              </div>
              <div>
                <h2>1</h2>
                <h6>
                  Abore et dolore <br /> agnam
                </h6>
              </div>
            </div> */}
          </div>
          {/* <div className={`${s.smailik} around`}>
            <div className={s.grid}>
              {data.map((el) => (
                <div>
                  <Image src={el.img} alt="" width={50} height={50} />
                  <h3>{el.title}</h3>
                  <p>{el.text}</p>
                </div>
              ))}
            </div>
          </div> */}
          <div className={s.lorem}>
            {/* <div className={`${s.arod} `} style={{ gap: "30px" }}>
              <div className="column">
                <h2>
                  <p>Lorem ipsum</p> <br />
                  <span className={s.dolor}>
                    dolor sit <br /> adipiscing <br />
                  </span>
                  <p>elitaa dwet</p>
                  <div className={s.border}></div>
                </h2>
              </div>
              <div className={s.grid}>
                {check.map((el) => (
                  <div>
                    <Image src={el.icon} width={40} height={40} />
                    <p style={{ paddingTop: "10px" }}>{el.title}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
          {/* <div className={s.ourServices}>
            <h3>Наши услуги</h3>
            <div className={s.grid}>
              {imgs.map((el) => (
                <div>
                  <Image src={el.img} alt="/" width={50} height={50} />
                  <p>{el.title}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;
