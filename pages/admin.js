import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useJwt } from "react-jwt";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import FormContent from "../components/FormContent";

export default function Form({ response,contacts}){
console.log(contacts);
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
      }else if(isExpired==true || x.admin!='admin'){
        return 1
      }else if(isExpired==false && x.admin=='admin'){
        return 2
      }
    }
  )

  return(
    <div className="flex flex-col items-center justify-start pt-20 w-full h-screen">
       <Toaster
  position="top-center"
  reverseOrder={true}

/>
      { loginStatus==0 && <PleaseLogin></PleaseLogin>}
      { loginStatus==1 && <PleaseLogin m={"Login Expired"}></PleaseLogin>}
      { loginStatus==2 && <AdminP contacts={contacts} response={response} email={x.email}></AdminP>}
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

function AdminP({email,contacts}){
  console.log('respp, ',contacts);
  const [dateRange , setRange] = useState(
    {
      "from": "2022-12-05",
      "to": "2022-12-22"
    }
    );
        const [filtered ,setfiltered] = useState(contacts.filter(i=>withinRange(i.createdat) && i  ));
  function withinRange(i){
    if(i >= dateRange.from && i <= dateRange.to) 
      return true 
    else 
      return false ;
  }

 const submitFormToDB = async(e) =>{
console.log(contacts);
setfiltered(contacts.filter(i=>withinRange(i.createdat) && i  ))
console.log(filtered);

}
  return(
    <div className="flex flex-row items-center  justify-start">
    <div className="w-1/2">
      <div className="mb-5 text-center">Logged in as Admin: {email}</div>
    
    
    <div className="grid grid-cols-2 px-20 gap-5">

          <div className="text-base">Search From : 
          </div>
            <input defaultValue={"2022-12-05"} onChange={(e)=>{setRange({...dateRange, from: e.target.value}); console.log(dateRange);}} className="bg-transparent outline-none" type={"date"}></input>
          <div className="text-base">To : 
          </div>
            <input defaultValue={"2022-12-22"} onChange={(e)=>{setRange({...dateRange, to: e.target.value}); console.log(dateRange);}} className="bg-transparent outline-none" type={"date"}></input>
          <div className="text-base col-span-2 text-center border-b-2 border-black mt-3"> 
            <button className="" onClick={
              submitFormToDB
            }>Search</button>
            </div>

      </div>
    
    </div>
    <div className=" w-1/2  p-5 ">
      <table className="bg-gray-900 rounded-md text-gray-50 font-thin">
        <tr className="mx-2">
          <th className="mx-2 p-3">name</th>
          <th className="mx-2 p-3">created at</th>
          <th className="mx-2 p-3">contact</th>
          <th className="mx-2 p-3">token</th>
          <th className="mx-2 p-3">created by</th>
        </tr>
        
        {
          filtered && filtered.map((i,index)=>(
            <tr key={index} className={index%2==0?"bg-gray-900":"bg-gray-600"}>
              <th className="mx-2 my-2 p-3">{i.data[0].name}</th>
              <th className="mx-2 my-2 p-3">{i.createdat}</th>
              <th className="mx-2 my-2 p-3">{i.data[0].contact.map(i=><div key={i}>{i[0]}</div>)}</th>
              <th className="mx-2 my-2 p-3">
                {i.data[0].contact.map(i=>
                <div  key={i}>
                <Link className="hover:underline"  href={`/admin/${i[1]}`}>{i[1]}</Link>
                  
                </div>
                  // <div ></div>
                )}
              
              </th>
                  <th className="mx-2 my-2 p-3">{i.createdBy ? i.createdBy : "-"}</th>
            </tr>
          ))
        }

      </table>
    </div>
    </div>
  ) 
}



export async function getServerSideProps(context) {
  
  // let res = await fetch(`https://cars-orcin.vercel.app`+"/api/cars", {
  let res = await fetch(`https://mongocontact.vercel.app`+"/api/getContacts", {
  method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let contacts = await res.json();

  return {
    props: { contacts },
  };
}