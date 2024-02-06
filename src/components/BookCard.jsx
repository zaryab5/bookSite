import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FaCartShopping } from 'react-icons/fa6';
// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';


const BookCard = ({Books ,headline}) => {
 
  return (
    <div>
    <div className=' my-16 px-4 lg:px-24'>
        <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>
        <div className="mt-12">
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper w-full h-full"
      >
       
        {
            Books.map((book,index)=>{
              return  <SwiperSlide key={index} className=' mb-10'>
                <Link key={index} to={`/books/${book._id}`}>
                    <div  className=' relative'>
                        <div className=' overflow-hidden'>

                         <img className='hover:scale-105 transition-transform ease-in duration-150' src={book.imageUrl} alt="" />
                        </div>
                         {/* <div className=' bg-blue-600 hover:bg-black p-2 rounded absolute top-3 right-3'>
                            <FaCartShopping className=' w-4 h4 text-white'/>
                         </div> */}
                    </div>
                    <div>
                        <div>
                        <h3 className=' mt-4'>{book.title}</h3>
                        <p >{book.authorName}</p>
                        </div>
                      
                        
                    </div>
                </Link>
                </SwiperSlide>

            })
        }
      </Swiper>
      </div>
    </div>
    </div>
  )
}

export default BookCard