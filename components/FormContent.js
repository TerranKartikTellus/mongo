import Link from "next/link";
import { useState } from "react";


export default function FormContent({email,count,response}){
  console.log('memm',response.members);
  const [loading,setloading] = useState("MongoDB Save")
  const [savedLocally,setsavedLocally] = useState(false);
  const [user,setuser] = useState({});
  const [contact,setContact] = useState([]);
  const [validate,setvalidate] = useState(false);
  const [validateParent,setvalidateParent] = useState(false);
  const [info, setInfo] = useState({
    name:"",
    contact: []
  });
  const [list,setList] = useState([]);
  const onSubminContact = (e) =>{
    setInfo({...info,contact: [...info.contact,contact] , 'createdAtDate': getDateCreated})
    setContact(0);setvalidate(false);
    document.getElementById('number').value = null;
  }
  const onChangeName = (e) =>{
    setInfo({...info, name: e.target.value});
    setuser({...user,name: e.target.value})
  }
  
  const submitForm = (e) =>{
    setList([...list,info]);
    setInfo({
    name:"",
    contact: []
    });
    setsavedLocally(true);
    console.log(list);
    document.getElementById('name').value = null;
 }
 const onChangePass = (e) =>{
    setuser({...user,pass: e.target.value})
    setInfo({...info, pass:e.target.value})
 }
 function getDateCreated(){
  var date = new Date();

  // Get year, month, and day part from the date
  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate;  // Prints: 2022-05-04
 }
 
 const submitFormToDB = async(e) =>{
  setloading("Loading")
  e.preventDefault();
  //  let res = await fetch(`https://cars-orcin.vercel.app`+"/api/addContact", {
  console.log(process.env.URL); 
  let res = await fetch("http://localhost:3000"+"/api/addContact", {

   method: "POST",
    body: JSON.stringify(
      {
        'data': list,
        'createdat' : new Date(),
        'createdBy' : email
      }
    ),
  });
  
  res = await res.json();
  console.log('add res:',res);
  if(res.msg=="Insertion Completed"){
    document.location.href="/";
  }else   setloading("Error Occured")
 } 

  return(
    <div>
{   email && count &&
    <div>
      <div className=" w-full  flex flex-row items-center justify-center font-Maven">
      <div>Email Logged in: {email}</div>
      <form className="flex w-full h-full flex-row items-center justify-center">
      <Link href="/" className="bg-gray-100 flex flex-row items-center justify-center rounded-full w-10 h-10 hover:shadow-xl fixed top-5 left-5">
        <svg className="w-7 h-7 fill-lime-700" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"/></svg>
      </Link>
      <div className="h-full bg-lime-500 w-1/2 flex flex-col items-center justify-center space-y-3">
        <div className="text-3xl border-t-[1px] border-black pt-14 mb-44">User End</div>
        <div className="flex flex-row items-center justify-center w-full space-x-2">
        <input list="members" autoComplete={0} id="name"  className="capitalize  text-center outline-none bordb-2 border-black bg-transparent placeholder-black/70 text-xs w-full rounded " onChange={onChangeName} placeholder="Member"></input>
        
        <datalist id="members">
          {response.members && response.members.map((i,index)=>(
            <option key={index} value={i.name} />
          ))}
        </datalist>
        </div>
        <div className="w-[400px] bg-gray text-black text-xs text-right "></div>  
          <div className={validate ? "w-auto flex flex-row items-center justify-around":"w-4/12 flex flex-col items-center justify-around"}>
            <input id="number"   onChange={(e)=>{setContact([e.target.value,10000+count+info.contact.length+1]); if(e.target.value.length==10){setvalidate(true);}else{setvalidate(false)}  } } minLength={10} maxLength={10} min={9100000000} max={9999999999}  className="w-full text-center outline-none borde-2 text-base border-black bg-transparent placeholder-black/70  rounded py-1 m-1"  placeholder="Phone Number"></input>
            {validate ? <button onClick={onSubminContact} className="hover:opacity-75 bg-gray-50 "><svg className="w-5 h-5" clipRule="evenodd" fill-rule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero"/></svg></button> : <div className="w-[400px] bg-gray text-black text-xs text-center ">**10 digit number expected</div>}
          </div>
        <div className="w-full pt-44 flex flex-row items-center justify-center ">

        { !savedLocally && <button className="w-4/12 hover:invert hover:font-semibold text-sm tracking-wider " onClick={submitForm}>Update Data Locally</button>}
        { savedLocally && <button className="w-4/12 hover:invert hover:font-semibold text-sm tracking-wider bg-gray-50 p-1 " onClick={submitFormToDB}>{loading}</button>}
        </div>
        <div className="border-b-[1px] border-black pb-1 w-[80px] text-transparent">.</div>
      </div>
      <div className="w-1/2 bg-lime-00 flex flex-col items-center justify-start">
        <div className="text-xl flex flex-row items-center justify-center">{info.name && info.name} </div>
        {info.contact.length>0 && <div className="mb-3">
          [
         {info.contact.map((i,index)=>(
          <div key={index} className="text-base"> +91 {i[0]} , {i[1]},</div>
         ))} 

          ]
        </div>}
        {list && <div className="text-center"><p>Following Data will be saved: </p>{JSON.stringify(list)}</div>}
      </div>
      
      </form>
    </div>
    </div>
    }</div>
  );
}