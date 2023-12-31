
export default function layuot({
    children, 
  }: {
    children: React.ReactNode
  }){
    return (
      <>
        <div className=" w-full mt-24  h-[35rem]">
          
        <div className=" justify-center h-[30rem] mt-6 items-center flex">
          
          <div className=" bg-gray-300 p-32  rounded-xl">
      {
      children} 

          
          </div>
          </div>
        </div>
        </>
    )
}