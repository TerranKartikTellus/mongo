import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../components/loading";
import Router from 'next/router'



export default function Home() {
 let response;
 const [data,setData] = useState({
  email: "", password: ""
 })
  async function  SubmitBut(){
 
    toast.success('Loading!')
    
  const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
  });
  if(await res.status==201){
    
    toast.success('Login Successfull!')
    response = await res.json()
    localStorage.setItem('token',response.token )
    
    setTimeout(()=>{ 
      toast.custom((t) => (
         <Loading text="Loading Content, Please wait"></Loading>
         ),{duration: 2000}
         )
         Router.push('/form')
     },1000)
  }else{
    toast.error('Login Faild!')
  }
  console.log('Login Response: ',response);


 } 


   async function  SubmitAdminBut(){
  console.log('vlivk');
  const res = await fetch('/api/adminlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
  });
  if(await res.status==201){
    
    toast.success('Login Successfull!')
    response = await res.json()
    localStorage.setItem('token',response.token )
    
    setTimeout(()=>{ 
      toast.custom((t) => (
         <Loading text="Loading Content, Please wait"></Loading>
         ),{duration: 2000}
         )
         Router.push('/admin')
     },1000)
  }else{
    toast.error('Login Faild!')
  }
  console.log('Login Response: ',response);


 } 
 useEffect(function() {
    console.log(window.localstorage);
},[]);
  return (
    <>
      <main className='w-full h-screen flex flex-row items-center justify-center'>
        <Toaster
  position="top-center"
  reverseOrder={true}

/>
        <div className='w-1/2 h-full flex flex-col bg-gray-200 items-center justify-center'>
          <div className='text-xl'>Login</div>
          <input onChange={(e)=>{setData({...data,email: e.target.value})}} className='outline-1 outline-lime-600 px-10 bg-transparent border-b-2 border-black/50 p-1' id="uemail" placeholder='email'></input>
          <input onChange={(e)=>{setData({...data,password: e.target.value})}} className='outline-1 outline-lime-600 px-10 bg-transparent border-b-2 border-black/50 p-1' id="upass" placeholder='password'></input>
          <button onClick={SubmitBut} className='bg-black text-white px-10 my-3'>Submit</button>
        </div>
        
        

        <div className='w-1/2 border-l-[1px] border-black h-full flex flex-col bg-gray-300 items-center justify-center'>
          <div className='text-xl'>Admin</div>
          <input onChange={(e)=>{setData({...data,email: e.target.value})}} className='outline-1 outline-lime-600 px-10 bg-transparent border-b-2 border-black/50 p-1' id="uemail" placeholder='admin email'></input>
          <input onChange={(e)=>{setData({...data,password: e.target.value})}} className='outline-1 outline-lime-600 px-10 bg-transparent border-b-2 border-black/50 p-1' id="upass" placeholder='admin password'></input>
          <button onClick={SubmitAdminBut} className='bg-black text-white px-10 my-3'>Submit</button>
        </div>
      </main>
    </>
  )
}
