import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import '../App.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// import './BannerCard.css';
// import './styles.css';
// import '../App.css';
// import required modules

import { EffectCards } from 'swiper/modules';


const BannerCard = () => {
  const api=import.meta.env.VITE_BASE_URL;

const[books,setBooks]=useState([]);

useEffect(()=>{

   fetch(`${api}/books`).then((res)=>{return res.json()} ).then((data)=>{return setBooks(data)});

   
},[])

  return (
    <div className='banner mr-10'>
         <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
      {
        books.map((book,index)=>{

         return <SwiperSlide key={index} style={{backgroundImage:`url(${book.imageUrl})`, backgroundSize:"cover"}}></SwiperSlide>

        }).slice(0,5)
      }

        {/* <SwiperSlide style={{backgroundImage:`url('https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348322381i/3450744.jpg')`}}></SwiperSlide>
        
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide> */}
      </Swiper>
    </div>
  )
}

export default BannerCard