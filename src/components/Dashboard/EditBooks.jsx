import React,{useState,useEffect} from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';


const EditBooks = () => {
  const api=import.meta.env.VITE_BASE_URL;

  const {id}=useParams();



  const { title,authorName,imageUrl,category,bookDescription,bookPdfUrl}=useLoaderData();


  
const bookCategory=[
  "Fiction",
  "Non-Fiction",
  "Programming",
  "Science",
  "Fantasy",
  "Historical",
  "Biography",
  "Medical",
  "Education",
  "Art", "Biography" ,"Business" , "Classics" ,"Comics", "Contemporary" ,"Cookbooks", "Crime", "Ebooks" , "Graphic" ,"Novels" ,"History", "Horror", "Sports" ,"Thriller", "Travel"
]



const[selected,setSelected]=useState(category);

const handleSelect=(e)=>{
  setSelected(e.target.value);
}


const handleSubmit=(e)=>{

  e.preventDefault();
  const form=e.target;
  const title=form.title.value;
  const imageUrl=form.imageUrl.value;
  const category=form.category.value;
  const bookDescription=form.bookDescription.value;
  const bookPdfUrl=form.bookPdfUrl.value;
  const authorName=form.authorName.value;

  const book={
    title,authorName,imageUrl,category,bookDescription,bookPdfUrl
  }
  
  fetch(`${api}/books/${id}`,{
    method:"PATCH",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(book)
  }).then((res)=>{}).then(()=>{
    alert("Book Updated Successfully!");
    
  })



}



  return (
    <div className=' px-4 my-12'>
    <h2 className=' mb-8 text-3xl font-bold'>Update The Book</h2>
<form onSubmit={handleSubmit} className="flex lg:w-[900px] flex-col flex-wrap gap-4">

<div className=' flex flex-row gap-4'>
<div className=' lg:w-1/2'>
<div className="mb-2 block">
 <Label htmlFor="title" value="Book Title" />
</div>
<TextInput  id="title" name='title' type="text" placeholder="Book Title" defaultValue={title} required />
</div>

<div className=' lg:w-1/2'>
<div className="mb-2 block">
 <Label htmlFor="authorName" value="Author Name" />
</div>
<TextInput id="authorName" name="authorName" type="text" placeholder="Author Name" defaultValue={authorName} required />
</div>
</div>

<div className=' flex flex-row gap-4'>
<div className=' lg:w-1/2'>
<div className="mb-2 block">
 <Label htmlFor="imageUrl" value="Book Image URL" />
</div>
<TextInput id="imageUrl" name='imageUrl' type="text" placeholder="Book Image URL" defaultValue={imageUrl} required />
</div>

<div className=' lg:w-1/2'>
<div className="mb-2 block">
 <Label htmlFor="category" value="Category" />
</div>

<Select id='category' name='category' className=' w-full rounded' value={selected} defaultValue={category} onChange={handleSelect} required>
      {
       bookCategory.map((option)=><option key={option} value={option} >{option}</option>)
      }
</Select>
</div>

</div>

<div>
<div className="mb-2 block">
 <Label htmlFor="bookDescription" value="Book Description" />
</div>
<Textarea id="bookDescription" name='bookDescription' rows={4} placeholder="Book Description" defaultValue={bookDescription} required />

</div>
<div>
<div className="mb-2 block">
 <Label htmlFor="bookPdfUrl" value="Book PDF URL" />
</div>
<TextInput id="bookPdfUrl" name='bookPdfUrl' type="text" placeholder="Book PDF URL" defaultValue={bookPdfUrl} required />
</div>

<Button type="submit">Update Book</Button>
</form>
</div>
  )
}

export default EditBooks