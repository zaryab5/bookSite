import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import AdminNav from './AdminNav';
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false); 
  const toggleMenu=()=>{
   setMenuOpen(!isMenuOpen);
  } 

  // useEffect(() => {
  //   // Load GitHub buttons script
  //   const githubScript = document.createElement('script');
  //   githubScript.async = true;
  //   githubScript.defer = true;
  //   githubScript.src = 'https://buttons.github.io/buttons.js';
  //   document.head.appendChild(githubScript);

  //   // Load your other script
  //   const otherScript = document.createElement('script');
  //   otherScript.src = 'https://demo.themesberg.com/windster/app.bundle.js';
  //   document.body.appendChild(otherScript);

  //   // Cleanup the scripts when the component unmounts
  //   return () => {
  //     document.head.removeChild(githubScript);
  //     document.body.removeChild(otherScript);
  //   };
  // }, []);


  return (
    <div>
   
<div>
  <AdminNav toggleMenu={toggleMenu}/>
   <div className="flex overflow-hidden bg-white pt-16 absolute ">

    {/* nabar  */}
    <SideBar isMenuOpen={isMenuOpen}/>
      
      
   <div className=' flex justify-center w-[100vw] lg:w-full lg:ml-[300px]'>

      <Outlet/>
   </div>
   </div>
 
</div>
    </div>
  )
}

export default Dashboard