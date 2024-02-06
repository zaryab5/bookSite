import React,{useState,useEffect} from 'react';
import { Table,Checkbox } from 'flowbite-react';
import {Link} from 'react-router-dom'
import '../App.css';
const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const api=import.meta.env.VITE_BASE_URL;



  useEffect(() => {
    fetch(`${api}/books`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBooks(data);
      });
  }, []);

  const handleDelete = (id) => {
    setBooks(prevBooks => prevBooks.filter((book) => book._id !== id));

    fetch(`${api}/books/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        console.log("Response Status:", res.status);
  
        if (res.ok) {
          // Item deleted successfully
          console.log("Book Deleted Successfully");
  
          // Update the state to trigger a re-render
         
        } else {
          // Handle non-successful response (e.g., show an alert)
          console.log("Failed to delete book");
          alert(`Failed to delete book, status: ${res.status}`);
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error(error.message);
      });

      
  };


  
  
  
  

  return (
    <div className=' px-4 my-12'>
       <h2 className=' mb-8 text-3xl font-bold'>Manage Your Books</h2>
       <Table hoverable className=' lg:w-[900px]'>
        <Table.Head >
          <Table.HeadCell className="p-4">
            NO.
          </Table.HeadCell>
          <Table.HeadCell>Book Name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span >EDIT OR MANAGE</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>

        {
           books.toReversed().map((book,index) =>
            <Table.Row key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              {index+1}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {book.title}
            </Table.Cell>
            <Table.Cell>{book.authorName}</Table.Cell>
            <Table.Cell>{book.category}</Table.Cell>
            <Table.Cell>$10</Table.Cell>
            <Table.Cell>
              <Link className=' font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5' to={`/admin/dashboard/edit-books/${book._id}`}> 
                 Edit
              </Link>
              <button onClick={()=>handleDelete(book._id)} className='  bg-black px-4 py-1 font-semibold text-white rounded hover:bg-sky-600'>Delete</button>
            </Table.Cell>
          </Table.Row>
           )
        }  
          
     
        </Table.Body>
      </Table>

<div class="flex flex-col overflow-x-auto">
  <div class="sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">NO.</th>
              <th scope="col" class="px-6 py-4">BOOK NAME</th>
              <th scope="col" class="px-6 py-4">AUTHOR NAME</th>
              <th scope="col" class="px-6 py-4">CATEGORY</th>
              <th scope="col" class="px-6 py-4">EDIT</th>
              <th scope="col" class="px-6 py-4">DELETE</th>
            </tr>
          </thead>
          <tbody className=' h-3 overflow-y-scroll'>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>

   
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium ">2</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>

            </tr>
            <tr class="border-b ">
              <td class="whitespace-nowrap px-6 py-4 font-medium ">3</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>
              <td class="whitespace-nowrap px-6 py-4">Cell</td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default ManageBooks