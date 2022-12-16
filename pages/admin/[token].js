import { useRouter } from 'next/router'
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useState } from 'react';
import Link from 'next/link';



export default function Token({contacts}){
  
  const rootElementId = 'page'
const downloadPdfDocument = () => {
 setload(true)
  const input = document.getElementById(rootElementId);
  html2canvas(input)
    .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");
    })

    // setload(false)
}

const [load,setload] = useState(false);


    const router = useRouter()
    const { token } = router.query
  
    let data ;
   contacts.map(i=>{
    i.data[0].contact.map(x=>{
      x[1]==token ? data = i : null 
      
    })
   })

   console.log(data);

    return(
      <div id='page' className='w-full h-screen bg-lime-400 flex-col flex items-center justify-center'>
         <Link href="/admin" className="bg-gray-100 flex flex-row items-center justify-center rounded-full w-10 h-10 hover:shadow-xl fixed top-5 left-5">
        <svg className="w-7 h-7 fill-lime-700" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"/></svg>
      </Link>
     
        <div className='text-2xl'> Token: {token}</div>
        <div className='text-xl'><br></br>User : {data.data[0].name}</div> 
        {data.data[0].contact.map((i,index)=>{
          if (i[1] == token)
          return(
            <div key={index} className="text-lg"><br></br>Contact: {i[0]}  </div>
          );
          })} 
        {/* {load && <div>Please wait for pdf to download</div>} */}
        {/* <button onClick={downloadPdfDocument} className={"bg-gray-50 p-1"}>{'Print'}</button> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  
  // let res = await fetch(`https://cars-orcin.vercel.app`+"/api/cars", {
  let res = await fetch(`http://localhost:3000`+"/api/getContacts", {
  method: "GET",
  headers: {
      "Content-Type": "application/json",
    },
  });

  let contacts = await res.json();
  console.log(contacts);
  return {
    props: { contacts }
  };
}