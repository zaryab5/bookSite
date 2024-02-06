import React, { useState } from 'react';
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';
import bookCategory from '../Categories';
const UploadBook = () => {

  const api=import.meta.env.VITE_BASE_URL;



const[selected,setSelected]=useState(bookCategory[0]);

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
  
  fetch(`${api}/upload-book`,{
    method:"POST",
    headers:{
      "Content-type":"application/json",
    },
    body:JSON.stringify(book)
  }).then((res)=>res.json()).then((data)=>{
    alert("Book Uploaded Successfully!");
  })

  form.reset();

}

  return (
    <div className=' px-4 my-12'>
             <h2 className=' mb-8 text-3xl font-bold'>Upload A Book</h2>
<form onSubmit={handleSubmit} className="flex lg:w-[900px] flex-col flex-wrap gap-4">
     
     <div className=' flex flex-row gap-4'>
     <div className=' lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Book Title" />
        </div>
        <TextInput id="title" name='title' type="text" placeholder="Book Title" required />
      </div>

      <div className=' lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="authorName" value="Author Name" />
        </div>
        <TextInput id="authorName" name="authorName" type="text" placeholder="Author Name" required />
      </div>
     </div>

     <div className=' flex flex-row gap-4'>
     <div className=' lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="imageUrl" value="Book Image URL" />
        </div>
        <TextInput id="imageUrl" name='imageUrl' type="text" placeholder="Book Image URL" required />
      </div>

      <div className=' lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="category" value="Category" />
        </div>
       
        <Select id='category' name='category' className=' w-full rounded' value={selected} onChange={handleSelect} required>
               {
                bookCategory.map((option,index)=><option key={index} value={option}>{option}</option>)
               }
        </Select>
      </div>
      
     </div>
     
<div>
<div className="mb-2 block">
          <Label htmlFor="bookDescription" value="Book Description" />
        </div>
        <Textarea id="bookDescription" name='bookDescription' rows={4} placeholder="Book Description" required />
      
</div>
<div>
        <div className="mb-2 block">
          <Label htmlFor="bookPdfUrl" value="Book PDF URL" />
        </div>
        <TextInput id="bookPdfUrl" name='bookPdfUrl' type="text" placeholder="Book PDF URL" required />
      </div>
     
      <Button type="submit">Upload Book</Button>
    </form>
    </div>
  )
}

export default UploadBook