import { useEffect, useRef, useState } from "react";
import jwt from "jsonwebtoken";
import { useJwt } from "react-jwt";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import FormContent from "../components/FormContent";
import jsPDF from 'jspdf';
// import asheet from "./a4";


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

/><Link href="/" className="bg-gray-100 flex flex-row items-center justify-center rounded-full w-10 h-10 hover:shadow-xl fixed top-5 left-5">
        <svg className="w-7 h-7 fill-lime-700" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"/></svg>
      </Link>
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
setfiltered(contacts.filter(i=>withinRange(i.createdat) && i+1  ))
console.log(filtered);

}

  const reportTemplateRef = useRef(null);

	const handleGeneratePdf = () => {
		const doc = new jsPDF({
			format: 'a4',
			unit: 'px',
		});


		// Adding the fonts.
		doc.setFont('Inter-Regular', 'normal');
    doc.setTextColor('#ffff')
// pdf.setFontType("bold");
doc.setFontSize(3);
		doc.html(reportTemplateRef.current, {
			async callback(doc) {
				await doc.save('document');
			},
		});
	};
  function toDate(d){ var todayDate = new Date(d).toISOString().slice(0, 10); return todayDate }
  return(
    <div className="flex flex-row items-center  justify-start">
    <div className="w-1/2">
      <div className="mb-5 text-center">Logged in as Admin: {email}</div>
    
    
    <div className="grid grid-cols-2 px-20 gap-5">

          <div className="text-base">Search From : 
          </div>
            <input defaultValue={""} onChange={(e)=>{setRange({...dateRange, from: e.target.value}); console.log(dateRange);}} className="bg-transparent outline-none" type={"date"}></input>
          <div className="text-base">To : 
          </div>
            <input defaultValue={""} onChange={(e)=>{setRange({...dateRange, to: e.target.value}); console.log(dateRange);}} className="bg-transparent outline-none" type={"date"}></input>
          <div className="text-base col-span-2 text-center border-b-2 border-black mt-3"> 
            <button className="" onClick={
              submitFormToDB
            }>Search</button>
            </div>

      </div>
    
    </div>
    <div className=" w-1/2  p-5 ">
      <table className="bg-gray-900 text- rounded-md text-gray-50 font-thin">
        <tr className="mx-2 w-full">
          <th className="mx-2 p-3">name</th>
          <th className="mx-2 p-3">created at</th>
          <th className="mx-2 p-3 w-[200px]">contact</th>
          <th className="mx-2 p-3">token</th>
          <th className="mx-2 p-3">created by</th>
          <th className="mx-2 p-3">PDF</th>
        </tr>
        
        {
          filtered && filtered.map((i,index)=>(
            <tr  key={index} className={index%2==0?"bg-gray-900":"bg-gray-600"}>
              <th className="mx-2 my-2 p-3">{i.data[0].name}</th>
              <th className="mx-2 my-2 w-full">{toDate(i.createdat)}</th>
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
                  <th className="mx-2 my-2 p-3">
                    <button className="button hover:underline"  onClick={handleGeneratePdf}>
		              		Generate as PDF
		              	</button>
                  </th>
                    <div  ref={reportTemplateRef} className=" absolute">
                        {i.data[0].contact.map(e=>
                          <div className="w-[21cm] mx-10 h-[16.7cm]"  key={e}>
                                <div>Name: {i.data[0].name}</div>
                                <div>Token: {e[1]}</div>
                                <div>Contact: {e[0]}</div>
                          </div>
                        )}
                    </div>
                  
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
