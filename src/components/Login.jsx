import React from 'react'
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
const Login = () => {
	const api=import.meta.env.VITE_BASE_URL;

	const signIn=useSignIn();

	const navigate=useNavigate();

	const handleSubmit=async (e)=>{
		e.preventDefault();
		const form=e.target;
         const email=form.email.value;
		 const password=form.password.value;

		 const user={
			email:email,
			password:password
		 }

		fetch(`${api}/login`,{
			method:"POST",
			headers:{
			  "Content-type":"application/json",
			},
			body:JSON.stringify(user)
		  }).then((res)=>res.json()).then((data)=>{
			  
			// console.log(data);

			if(signIn({
				auth: {
					token: data.token,
					type: 'Bearer'
				},
				refresh: data.token,
				userState: {
					name: data.name,
					role:data.role
				}
			})){
				navigate("/admin/dashboard");
			}else {
				alert("Incorrect");
			}
		  });


	}
  return (
  
<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl font-semibold">Login Now</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<form  onSubmit={(e)=>handleSubmit(e)} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input autoComplete="off" id="email" name="email" type="text" className=" border-none outline-none focus:outline-none peer placeholder-transparent transition-all ease-in duration-100 h-10 w-full border-b-2 border-gray-300 text-gray-900  focus:borer-rose-600 p-5" placeholder="Email address" />
							<label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						</div>
						<div className="relative">
							<input  autoComplete="off" id="password" name="password" type="password" className="peer focus:outline-transparent placeholder-transparent h-10 w-full outline-none transition-all ease-in border-none duration-100 focus:outline-none selection:outline-none  text-gray-900 border-b-4 border-blue-800" placeholder="Password" />
							<label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
						<div className="relative">
							<button type='submit' className="bg-blue-500 text-white rounded-md px-2 py-1">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
  )
}

export default Login