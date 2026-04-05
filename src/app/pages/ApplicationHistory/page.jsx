import React from "react";
import s from "./ApplicationHistory.module.scss";
import ApplicationCard from "@/components/Cards/ApplicationCard/ApplicationCard";
export const metadata = {
  title: "Электроника сервис",
  description: " ",
  icons: [
    {
      rel: "icon",
      sizes: "any",
      url: "/img/iconka.png",
    },
  ],
};
function page() {
  return <div className="container"></div>;
}

export default page;

// <div className={s.story}>
//   <h2>История заявок</h2>
//   <div className={s.application_wrapper}>
//     {[1, 2, 3, 4].map((el, index) => {
//       return (
//         <div key={index}>
//           <ApplicationCard />
//         </div>
//       );
//     })}
//   </div>
// </div>
