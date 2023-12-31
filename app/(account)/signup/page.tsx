import { PrismaClient, Prisma } from '@prisma/client'
import GitLogo from "@/app/componets/gitLoading";
import GoogleLogo from "@/app/componets/googleLogo";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";
import { authOptions } from '@/app/authapi/auth';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()






export default async function signup() {


  async function createInvoice(formData: FormData) {
    'use server'

    const rawFormData = {
      username: formData.get('username'),
      password: formData.get('password'),
      

    }

   
    let userNewAdd = rawFormData.username
    let newpass = await bcrypt.hash(rawFormData.password, 10)
    

    async function addDataToPrisma(pass: string, user: string) {
      const testUser  = await prisma.user.findUnique({
        where:{username:user}

      }) 
      if (testUser){

        console.log('user darima azash')
        return 
      }
      
      const userNew = await prisma.user.create({
        data: {
          name : user as string,
          username: user as string,
          password: pass as string,
          
        },
      })
    }


    addDataToPrisma(newpass, userNewAdd as string)
    if (Response) {

      return redirect('/login')

    }
  }

  return (
    <>
      <h6 className="mx-auto text-center">نام نویسی</h6>
      <form action={createInvoice} className=" m-2 gap-4" >
        <div className=" p-4  ">
          <label htmlFor="username"> ایمیل</label>
          <Input name="username" type="text" placeholder="username" className=" my-2  " />
          <label htmlFor="email">رمز</label>
          <Input name="password" type="password" placeholder="pass" className=" my-2  " />
          <div className=" flex justify-between mx-2 mt-4">

            <GitLogo />
            <GoogleLogo />
          </div>
          <Button className=" flex mt-4 w-full mx-auto " type="submit">sub</Button>
        </div>

      </form>
    </>
  )
}