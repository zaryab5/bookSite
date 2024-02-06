import React, { useEffect, useState } from 'react'
import BookCard from './BookCard';

const BestSellBooks = () => {
  
  
  const api=import.meta.env.VITE_BASE_URL;

    const [books,setBooks]=useState([]);



    useEffect(() => {
        fetch(`${api}/books`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setBooks(data.slice(0,7));
          });
      }, []);

  return (
    <BookCard Books={books} headline="Best Selling Books"/>
  )
}

export default BestSellBooks