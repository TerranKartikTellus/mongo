import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useJwt } from "react-jwt";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import FormContent from "../components/FormContent";

export default function Form({count,statusMembers, response}){
  console.log('members: ',response);
  if(statusMembers==201){
    toast.success('Members List Fetched')
  }else if(statusMembers==500){
    toast.error('Members List Not Fount') 
  }
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token')
  } 
const x = jwt.decode(token);
const { decodedToken, isExpired ,reEvaluateToken} = useJwt(token);
  // let email = decodedToken.email;
  
  const [loginStatus, setLoginStatus] = useState(
    ()=>{
      if(token==null){
        return 0
      }else if(isExpired==true){
        return 1
      }else if(isExpired==false){
        return 2
      }else if(statusMembers==500){
        return 0
      }
    }
  )

  return(
    <div className="flex flex-col items-center justify-center w-full h-screen">
       <Toaster
  position="top-center"
  reverseOrder={true}

/>
<Link href="/" className="bg-gray-100 flex flex-row items-center justify-center rounded-full w-10 h-10 hover:shadow-xl fixed top-5 left-5">
        <svg className="w-7 h-7 fill-lime-700" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"/></svg>
      </Link>
      { loginStatus==0 && <PleaseLogin></PleaseLogin>}
      { loginStatus==1 && <PleaseLogin m={"Login Expired"}></PleaseLogin>}
      { loginStatus==2 && <FormContent count={count} response={response} email={x.email}></FormContent>}
    </div>
  );
}
function PleaseLogin({m}){

  return(
    <div className="flex flex-col items-center text-center justify-center h-full w-full">
      {m ? m : "No Loing Information Found !"}<br></br>
      Kindly Login First<br></br>
      <Link href="/" className="bg-black text-white rounded p-1 m-1 tracking-wider">Home</Link>
    </div>
  );
}



export async function getServerSideProps(context) {
  const res = await fetch(process.env.URL+'/api/membersList', {
    method: 'GET',
    headers: {
                'Content-Type': 'application/json',
            },
            
  });
  let response = await res.json();

  // let res = await fetch(`https://cars-orcin.vercel.app`+"/api/cars", {
  let res2 = await fetch(`https://mongocontact.vercel.app`+"/api/contacts", {
  method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let contacts = await res2.json();
  let count = 0;
  contacts.map(i=>{
    count+=i.data[0].contact.length
  })

  if(await res.status==201){ 
    return {
      props: {count,statusMembers:201, response: response}, // will be passed to the page component as props
    }
  }
  else if(await res.status==500){
  return {
      props: {count,statusMembers:500, response: 500}, // will be passed to the page component as props
    }
  }
}