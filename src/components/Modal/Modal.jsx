"use client";
import React, { useEffect, useState } from "react";
import s from "./page.module.scss";
import SignIn from "../Form/SignIn/SignIn";
import { useDispatch, useSelector } from "react-redux";
import NewPassword from "../Form/NewPassword/NewPassword";
import ResetPassword2 from "../Form/ResetPassword2/ResetPassword2";
import Recover from "../Form/Recover/Recover";
import { handleModal } from "@/app/store/slice/modalSlice";
import ApplicationModal from "../ApplicationModal/ApplicationModal";
import { motion } from "framer-motion";
export default function Modal() {
  const dispatch = useDispatch();
  const { modal, value } = useSelector((state) => state.modal);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(modal);
  }, [modal]);

  return (
    <>
      {isOpen && (
        <div className={s.modal}>
          <div
            className={s.gray}
            onClick={() =>
              value === 1 || value === 2 || value === 3
                ? dispatch(handleModal(!modal))
                : null
            }
          ></div>

          <motion.div
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            className={s.wrapper}
          >
            {value === 1 && <SignIn />}
            {value === 2 && <ApplicationModal />}
            {value === 3 && <Recover />}
            {value === 4 && <NewPassword />}
            {value === 6 && <ResetPassword2 />}
          </motion.div>
        </div>
      )}
    </>
  );
}
