import React, { useState } from 'react';
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';
const UploadMany=()=> {
  const api=import.meta.env.VITE_BASE_URL;

  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState('');
 const[format,setFormat]=useState('');
    const exampleData=[
   
        {
           
            "title": "First Book",
            "authorName": "John",
            "imageUrl": "https://example.jpg",
            "category": "Psychology",
            "bookDescription": "Some description",
            "bookPdfUrl": "https://example.com/boook.pdf"
           
        },
        {
          
            "title": "Second Book",
            "authorName": "John",
            "imageUrl": "https://example.jpg",
            "category": "Psychology",
            "bookDescription": "Some description",
            "bookPdfUrl": "https://example.com/boook.pdf"
           
        }
        ];

    

  const submitJson = async (e) => {
    e.preventDefault();
   
    
    try {
      const response = await fetch(`${api}/insertMany`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: JSON.parse(jsonData) }),
      });

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
    }
   

    e.target.reset();
  };

  return (
    <div className=' px-4 my-12'>
             <h2 className=' mb-8 text-3xl font-bold'>Upload Bulk Books</h2>


      <form onSubmit={(e)=>{submitJson(e)}}>
<div className="mb-2 block">
          <Label htmlFor="booksJson" value="Insert Books in JSON Format" />
        </div>
        <Textarea  id="booksJson" name='booksJson' rows={10} cols={50}
         placeholder="Books Array "
         
        onChange={(e) => setJsonData(e.target.value)} required />
       <Button className=' mt-5' type="submit">Upload Books</Button>
        {response.length>0? 
       <div className=' overflow-scroll max-w-[50vw]'>
        <h3 className=' mt-5'>Response:</h3>
        <pre>{response}</pre>
      </div>
      :" "

        }
       
        
        
</form>
<div className=' mt-5'>
    <h2 className=' font-semibold'>Example JSON Format</h2>
<pre className=' mt-3 text-wrap text-[10px]'>{JSON.stringify(exampleData,null,4)}</pre>
</div>
    </div>
  );
}

export default UploadMany;
