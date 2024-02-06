import React, { useEffect, useState } from 'react'
import { Card,Pagination } from 'flowbite-react';
import LoadingIndicator from './Loading';
import { useParams,useNavigate,Link } from 'react-router-dom';
import items from './Categories';
function Shop() {
  const api=import.meta.env.VITE_BASE_URL;
  const query = new URLSearchParams(location.search).get('query') || '';
  const category = new URLSearchParams(location.search).get('category') || '';
  // const { query } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const[originalBooks,setoriginalBooks]=useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  
  // loading 
  const [loading, setLoading] = useState(false);

    // category search and selection 

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    

  useEffect(() => {
    setLoading(true); 

    fetch(`${api}/books`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setSearchBook(query || '');
        setSelectedItem(category || '');
        setoriginalBooks(data);

      }).finally(() => {
        setLoading(false); 
      });
  }, []);

 

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
    setSearchQuery('');
  };
  const filteredItems = items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));


  // book search functions 

  const [isDropdownBookOpen, setDropdownBookOpen] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);


  const [searchBook, setSearchBook] = useState('');

  

  // use debouncing to limit too many requests to api
const [debouncedSearch, setDebouncedSearch] = useState(searchBook);

 
  const[result,setResult]=useState([]);

 const fetchResult=(value)=>{

  fetch(`${api}/books`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
  
    let res=data.filter(
      (item) =>{
        if(selectedItem){
         if(item.category===selectedItem)
          return value && item && item.title && item.title.toLowerCase().includes(value.toLowerCase());
        }else{
          return value && item && item.title && item.title.toLowerCase().includes(value.toLowerCase())

        }

      })
   setResult(res);
   

  })

}


  const handleChange=(value)=>{
    setDropdownBookOpen(true);
    
      setBooks(originalBooks);
    
      
  
    setSearchBook(value);
    

    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
 
  }


const handleItemSelect=(e)=>{
  setSearchBook(e.title);
  setDropdownBookOpen(false)
  
 
}

useEffect(() => {
  
  fetchResult(debouncedSearch);

}, [debouncedSearch]);





// showing results on form submit search 



const handleFormSubmit=(e)=>{
  if(searchBook.length!==0){
    e.preventDefault();
  }
    handleSearch();
}

const handleSearch=()=>{
  
    const data= books.filter((item)=>{
      if(selectedItem){
        if(item.category===selectedItem)
         return  item && item.title && item.title.toLowerCase().includes(searchBook.toLowerCase());
       }else{
         return  item && item.title && item.title.toLowerCase().includes(searchBook.toLowerCase());

       }
       } )
   setBooks(data);
  //  setFilteredBooks(data);

  

   if(searchBook.length!==0 && selectedItem.length===0){
     navigate(`?query=${searchBook}`);
     
    }else if(searchBook.length!==0 && selectedItem.length!==0){
     navigate(`?query=${searchBook}&category=${selectedItem}`);

    }
      
   
  
}
  // Pagination

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const booksPerPage = 8;
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  let booksToDisplay;

  booksToDisplay = books.slice(startIndex, endIndex);

  return (
    <div className=' mt-28 px-4 lg:px-24'>
       <h2 className=' text-5xl font-bold text-center my-16'>All Books are Here!</h2>
      <form className=' flex justify-center  absolute left-0 right-0'>
      <div className="flex  md:w-[700px]  text-center relative">
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Your Email
        </label>
        <div className="relative">
          <button
            id="dropdown-button"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 truncate"
            type="button"
            onClick={toggleDropdown}
          >
            {selectedItem || 'Categories'}
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${isDropdownOpen ? '' : 'hidden'} absolute top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) =>{
                setSearchQuery(e.target.value);
               
              } }
            />
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
              {filteredItems.map((item, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      
        <div className=" w-full">
          <div className="relative">
          <input
            type="search"
            id="search-dropdown"
            className="block  p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search For Books..."
            required
            onChange={(e)=> {handleChange(e.target.value)
              setSearchBook(e.target.value)}}
            value={searchBook}
          />
          <button
            type="submit"
            onClick={(e)=> {handleFormSubmit(e)}}
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-10"
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          </div>
          {result.length > 0 && (
          <ul className={`py-2 ${
            isDropdownBookOpen ? '' : 'hidden'
          } text-sm text-gray-700 dark:text-gray-200 w-full border-2  bg-white `} aria-labelledby="dropdown-button">
              {result.map((item, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleItemSelect(item)}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
       
      
      
      </div>
    </form>
 <div className="result  text-center flex justify-center">
  <div className=' relative lg:w-[700px] '>
 

  </div>
 </div>



     {loading? <LoadingIndicator/> : 
     
       booksToDisplay.length===0 ? <p className=' w-full text-center h-[50vh] flex justify-center items-center'>No result found</p>:
     <div className=' grid gap-8 my-16 mt-24 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
           booksToDisplay.toReversed().map(book =>
            <Link to={`/books/${book._id}`} key={book._id}>
            <Card
            className="max-w-sm "
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={book.imageUrl}
              
             >
              <div className=' p-0'>

             
              
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {book.title}
              </h5>
              <p className=" font-normal text-gray-700 dark:text-gray-400">
                 {book.bookDescription? book.bookDescription.split(' ').slice(0, 10).join(' ').concat(" ...") : " "}
              </p>
              <div href="#" className=" mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Download
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </div>
              </div>
            </Card>
            </Link>

            

          )
        }

  {/* pagination */}

  

    </div>
    }

      <div className="  my-5 flex overflow-x-auto sm:justify-center">
  
      <Pagination
          layout="table"
          currentPage={currentPage}
          totalPages={Math.ceil(books.length / booksPerPage)}
          onPageChange={onPageChange}
        />
    </div>
    </div>
  )
}

export default Shop