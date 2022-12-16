export default function Loading({text}){
  return(
    <div className="flex flex-row p-3 rounded-md bg-gray-100 items-center justify-center ">
    <div className="w-10 h-10 flex flex-col items-center justify-center"><div className="bg-black w-4 h-4 animate-spin"></div></div>
    <div className="tracking-wider">{text}</div>
  </div>
  );
}