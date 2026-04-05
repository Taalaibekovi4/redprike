"use client"

import React, { useEffect } from 'react'
import Navigation from '../Navigation/Navigation'
import { Stories } from '../Stories/Stories'
import Brands from '../Brands/Brands'
import Footer from '../Footer/Footer'
import Loading from '../Loder/Loder'
import dynamic from 'next/dynamic'
const Popular = dynamic(
  () => import("../Popular/Popular"),
)
const Categories = dynamic(
  () => import("../Categories/Categories"),
)
const NewSlider = dynamic(
  () => import("../Slider/NewSlider/NewSlider"),
)
function HomePage() {
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])


  return (<>
    <div style={{ display: loading ? "block" : "none" }}>
      <Loading />

    </div>
    <div style={{ display: loading ? "none" : "block" }}>
      <div className="container" >
        <Navigation />
        <Stories />
        <NewSlider />
        <Brands />
        <Categories />
        <Popular />
      </div>
      <Footer />

    </div>
  </>

  )
}

export default HomePage

