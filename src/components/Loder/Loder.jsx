import React from 'react'
import s from './loadin.module.scss'
import Image from 'next/image'
const Loading = () => {
    return (
        <div className={s.Block2} >
            <span className={s.loader} >
            <Image
            src={"/img/servis.png"}
            className={s.logo}
            alt=""
            width={90}
            height={80}
          />
                <span className={s.loadersd} ></span>
            </span>
        </div>
    )
}

export default Loading

// <HeaderSvg />