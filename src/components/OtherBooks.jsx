import React,{useState,useEffect} from 'react'
import BookCard from './BookCard';

const OtherBooks = () => {
  const api=import.meta.env.VITE_BASE_URL;

    const [books,setBooks]=useState([]);



    useEffect(() => {
        fetch(`${api}/books`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setBooks(data.slice(2,12));
          });
      }, []);

  return (
    <BookCard Books={books} headline="Other Books"/>
  )
}

export default OtherBooks