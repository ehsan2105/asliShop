import Image from "next/image";
import testImage from '@/public/test.jpg'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CartItems from "@/app/componets/cart";

import { Prisma, PrismaClient } from '@prisma/client'
import AbuotProducts from "@/app/componets/abuotProduct";
import { JsonArray } from "next-auth/adapters";

const prisma = new PrismaClient()
async function getData(x: string) {
    let num = parseInt(x);
    const data = await prisma.product.findUnique({
        where: {
            id: num,
        }
    })

    return data
}
async function getComment(x: string) {
    let num = parseInt(x);
    const data = await prisma.comment.findMany({
        where: {
            productId: num
        },
    })


    return data
}
export default async function AboutProduct({ params }: { params: { slug: string } }) {
    const data = await getData(params.slug)
    const dataComment = await getComment(params.slug)
    let ob = JSON.stringify(data?.obtion as any)
    let obtionOK = JSON.parse(ob)
    let col = JSON.stringify(data?.color as any)
    let color = JSON.parse(col)

    let dataNOW = data?.dataAdd.toUTCString()
    return (

        <>
            {console.log('x')}
            <div className=" lg:flex  h-[35rem] m-6 bg-white rounded">

                <div className=" m-8 lg:mt-8 lg:border-l-4 w-full   lg:w-1/3   ">

                    <div>

                        <Image className=" w-[90%] rounded items-center mx-auto" src={testImage} height={500} width={500} alt="some"></Image>

                    </div>
                    <div className="flex  gap-2  rounded   items-end  justify-start mr-5 mt-8 w-[90%]">
                        <div><Image className=" w-[100%] items-center mx-auto " src={testImage} height={500} width={500} alt="some"></Image></div>
                        <div><Image className=" w-[100%] rounded items-center mx-auto" src={testImage} height={500} width={500} alt="some"></Image></div>
                        <div><Image className=" w-[100%] rounded items-center mx-auto" src={testImage} height={500} width={500} alt="some"></Image></div>
                        <div><Image className=" w-[100%]  rounded items-center mx-auto" src={testImage} height={500} width={500} alt="some"></Image></div>
                    </div>
                </div>
                <div className=" m-8  w-2/3 flex">
                    <div className=" flex flex-col    w-1/2">
                        <div className=" h-1/3">
                            <span className=" font-serif text-gray-600"> {data?.brand}</span>
                            <h1 className=" text-xl ml-6 ">{data?.name} </h1>
                            <p className=" text-gray-600 font-medium"> گوشی هوشمند </p>
                            <div className="h-0.5 bg-gray-300 rounded"></div>
                        </div>
                        <div className=" h-2/3 flex flex-col">
                            <div className=" flex  max-h-6 ">

                                <p className=" text-gray-600 text-sm">
                                    {dataNOW}
                                </p>
                                <div className=" w-0.5 h-6 mx-4 rounded-full   bg-gray-300"></div>
                                <span className=" font-sans text-sm text-gray-500 mt-0.5 "> پرچم دار </span>
                            </div>
                            <div className=" mt-12 ">
                                <h2 className=" font-bold text-lg flex text-gray-700"> مشخصات    <p className=" mx 2 text-gray-500 ">{data?.name} </p> </h2>

                                {obtionOK.map((i: any) => (
                                    <div className=" flex  my-2">
                                        <div className=" w-3 h-3 mt-0.5 bg-blue-800 rounded-full   items-center my-auto "> </div>
                                        <h4 className=" font-bold text-sm text-gray-500  my-auto text-center mx-2">{i}</h4>
                                    </div>

                                ))}



                            </div>

                        </div>
                    </div>
                    <div className=" w-1/2">
                        <div className=" m-6 rounded  bg-gray-50 h-[90%] ">
                            <div className="mt-12 flex w-full  justify-around my-auto ">
                                <h4 className=" items-center mt-14   text-gray-800">رنگ</h4>

                                <div className=" dropdown mt-12  bg-gray-200 rounded ">
                                    <a className="btn   justify-between    text-end btn-white   dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        انتخاب رنگ کنید
                                    </a>

                                    <ul className="dropdown-menu bg-slate-500  text-end">

                                        {
                                            color.map((i: any) => (
                                                <li><a className="dropdown-item" href="#">{i} </a></li>
                                            ))
                                        }

                                    </ul>

                                </div>
                            </div>
                            <div className=" flex justify-around mt-6 ">
                                <h4 className="   text-gray-800">عدد</h4>
                                <Input type="number" placeholder="1" className=" bg-gray-200 w-[9rem] text-center " />

                            </div>
                            <div className="mt-8 mb-1 bg-gray-600  rounded-full w-[90%] mx-auto h-0.5">

                            </div>
                            <div className=" flex flex-col mx-3">
                                <p className=" font-thin text-sm text-gray-600">جشنواره ی عیدانه </p>
                                <p className=" font-thin text-sm text-gray-600">دارای تخفیف ویزی ما</p>

                            </div>
                            <div className="-mt-1 bg-gray-600  rounded-full w-[90%] mx-auto h-[0.15rem]">

                            </div>
                            <div className=" h-44  flex flex-col justify-between items-center text-center">
                                <div className=" mt-20  items-center text-center flex flex-row justify-end">



                                    <h2 className="  text-gray-700 font-bold mx-2 text-2xl ">{data?.price.toLocaleString()} </h2><span className=" text-gray-800  mb-2 mx-2  items-center text-center font-extralight text-sm">تومان</span>

                                </div>
                                <Button className=" w-[90%] mb-4  ">افزودن ب سبد </Button>
                            </div>
                        </div>


                    </div>


                </div>
            </div>
            <AbuotProducts param={params.slug} abuotFull={data?.fullAbout} name={data?.name} obtion={data?.obtion} dataComment={dataComment} />



        </>
    )
}