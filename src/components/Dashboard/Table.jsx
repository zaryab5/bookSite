import { useMemo,useState,useEffect } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import {
  MaterialReactTable,
  useMaterialReactTable,
  useMRT_Rows
} from 'material-react-table';
import { MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import '../../App.css';

const Table = () => {
  const api=import.meta.env.VITE_BASE_URL;

  const auth = useAuthUser();
    const [data, setData] = useState([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch(`${api}/books`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data);
        });


        fetch(`${api}/getuser`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUsers(data);
        });
    }, []);
   
  //should be memoized or stable
  let index=0;
  const columns = useMemo(
    () => [
        {
            accessorKey: 'rowNumber',
            
            header: '#',
            size: 50,
            Cell:({row})=> row.index+1,
            
            
          },
      {
        accessorKey: 'title', //access nested data with dot notation
        header: 'Title',
        size: 300,
      },
      {
        accessorKey: 'authorName',
        header: 'Author Name',
        size: 200,
      },
      {
        accessorKey: 'category', //normal accessorKey
        header: 'Category',
        size: 150,
      },

      
    ],
    [],
  );


  const table = useMaterialReactTable({
    columns,
    data,
    enableRowNumbers: false,
    enableRowActions: true,
    initialState: {
        columnOrder: [
            'rowNumber',
         'title',
         'mrt-row-select', //move the built-in selection column to the end of the table
         'authorName',
         'category'
        ],
      },
      defaultColumn: {
        minSize: 20,

      },
      layoutMode:"grid",
      
    renderRowActionMenuItems: ({ row }) => [
      
        <Link to={`/admin/dashboard/edit-books/${row.original._id}`}>
      <MenuItem key="edit"  onClick={() => console.info('Edit')}>
        <Edit/>
        Edit
      </MenuItem>
      </Link>,
      <MenuItem key="delete"  onClick={() =>{

        handleDelete(row.original._id)
        }}>
          <Delete/>
        Delete
      </MenuItem>,
      
    ],
  
    muiTableBodyProps: {
        sx: {
          //stripe the rows, make odd rows a darker color
          '& td:nth-of-type(2)': {
            color: 'rgb(17 24 39/0.9)',
            fontWeight:'550'
            
          },
          '& td': {
            color: 'rgb(17 24 39/0.8)',
            
          },
        },
    
      },
  });

 


  
  const handleDelete = (id) => {
    setData(prevBooks => prevBooks.filter((book) => book._id !== id));

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
  
  

  return(
    <div className=' px-4 my-12'>
       <h2 className=' mb-8 text-3xl font-bold'>Manage Your Books</h2>
       <div className=' w-[300px] sm:w-[600px] md:w-full'>
  <MaterialReactTable  table={table} />

       </div>
  </div>
  ) 
};

export default Table;


