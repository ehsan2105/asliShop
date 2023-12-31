import { authOptions } from "@/app/authapi/auth";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export default async function login() {
  const session = await getServerSession(authOptions)
  if (session){
    
    return redirect('/')
  }
  
  return (
    <>
      <h6 className="mx-auto text-center">ورود</h6>
      <form action="/api/auth/signin" method="post" className=" m-2 gap-4">
        <div className="p-4">
          <label htmlFor="email"> email</label>
          <Input className=" my-2  " />
          <label htmlFor="email"> email</label>
          <Input className=" my-2  " />
          <div className=" flex justify-between mx-2 mt-4">
            <FaGithub className="h-7 w-12 bg-white rounded-full  p-1" />
            <FaGoogle className="h-7 w-12   bg-white rounded-full p-1" />
          </div>
          <Button className=" flex mt-4 w-full mx-auto hover:text-blue-900">sub</Button>
        </div>

      </form>
    </>
  )
}