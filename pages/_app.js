import { useState } from 'react'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const [data,setData] = useState({
    email: "",
    password: "",
    userType: ''
  });
  return <Component data={data} setData={setData} {...pageProps} />
}
