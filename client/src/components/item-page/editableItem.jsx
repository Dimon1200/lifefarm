import React, { useEffect, useState} from "react";
import axios from 'axios'
import Header from "../ui-break-points/header";
import Footer from "../ui-break-points/footer";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { ErrorHandler } from '../Errors/ErrorHandles'

const AddItem = () => {

    const navigate = useNavigate()

    const query = new URLSearchParams(window.location.search)

    const [itemData, setItemData] = useState({})

    const { register, handleSubmit, formState: {errors}, watch, reset } =  useForm({
            defaultValues: itemData
        });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/getitem`, {
            params:{
                id: query.get('id'),
            }
        }).then(res => {
            console.log(res.data)
            setItemData(res.data)
            reset(res.data)
        }).catch((error) => {
            new ErrorHandler(error.response.data).handle(navigate)
        })
    }, [reset])
    

   
   
    const [imgToTransfer, setImgToTransfer] = useState()
    
    const convertImage = (file) => {
        if(!file)return
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImgToTransfer(reader.result)
        }
        reader.onerror = error => {
            console.log(error, 'img error')
        }
    }

    const file = watch('itemImage')
    file && convertImage(file[0])

    const onSubmit = async (data) => {
        console.log(import.meta.env.VITE_API_URL)
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/createitem`, {...data, itemImage: imgToTransfer})
            console.log(res.data)
        } catch (error) {
            console.log(error, 'err')
        }
    }

    return (
        <div className=" bg-c-bg flex flex-col w-full md:justify-between items-center  h-[120svh] text-c-black-500">
            <Header />
            {/* item card */}
            <form className=" bg-c-white shadow-c-sh md:h-4/6 w-10/12 md:w-8/12 rounded-3xl py-9 flex flex-col md:flex-row max-sm:items-center md:justify-evenly my-10" 
                onSubmit={handleSubmit(onSubmit)}
            >
                {/*item img */}
                <div>
                    {imgToTransfer && <img
                        className="max-sm:w-10/12  m-auto max-h-full"
                        src={imgToTransfer} alt="file"
                    />}
                    <input 
                        type="file" {...register('itemImage')}
                    />
                </div>
                {/* item content */}
                <div className="flex flex-col w-10/12 md:w-7/12 justify-between gap-7 md:gap-0">
                    {/* title and cost */}
                    <div className="flex flex-col  justify-between text-3xl 2xl:text-5xl">
                        <input
                            placeholder="наименование"
                            className="border border-black font-semibold"
                            {...register("title")}
                        />
                        <input
                            placeholder="цена"
                            className="border border-black font-bold underline"
                            {...register("cost")}
                        />
                    </div>
                    {/* info */}
                    <div className="2xl:text-2xl">
                        <div className="border-b border-c-green flex justify-between py-1.5 2xl:py-3">
                            <span>Производитель</span>
                            <input
                                type="text"
                                className="border border-black text-right"
                                {...register("producer")}
                            />
                        </div>
                        <div className="border-b border-c-green flex justify-between py-1.5 2xl:py-3">
                            <span>Применение</span>
                            <input
                                type="text"
                                className="border border-black text-right"
                                {...register("purpose")}
                            />
                        </div>
                        <div className="border-b border-c-green flex justify-between py-1.5 2xl:py-3">
                            <span>Возраст</span>
                            <input
                                type="text"
                                className="border border-black text-right"
                                {...register("years")}
                            />
                        </div>
                        <div className="border-b border-c-green flex justify-between py-1.5 2xl:py-3">
                            <span>Дозировка</span>
                            <input
                                type="text"
                                className="border border-black text-right"
                                {...register("dose")}
                            />
                        </div>
                        <div className="border-b border-c-green flex justify-between py-1.5 2xl:py-3">
                            <span>Наличие на складе</span>
                            <input
                                type="text"
                                className="border border-black text-right"
                                {...register("avalibility")}
                            />
                        </div>
                        <div className="border-b border-c-green flex justify-between py-1.5 2xl:py-3">
                            <span>Вкус</span>
                            <input
                                type="text"
                                className="border border-black text-right"
                                {...register("flavor")}
                            />
                        </div>
                        <div className="border-b border-c-green flex justify-between py-1.5 2xl:py-3">
                            <span>Шт в упаковке</span>
                            <input
                                type="text"
                                className="border border-black text-right"
                                {...register("pack")}
                            />
                        </div>
                        <div className="border-b border-c-green flex justify-between py-1.5 2xl:py-3">
                            <span>Рецепт</span>
                            <div className="flex gap-3">
                                <input
                                    {...register('prepscription')}
                                    type="radio" id="p1" value={true}
                                />
                                <label htmlFor="p1">Нужен</label>
                                <input
                                    {...register('prepscription')}
                                    type="radio" id="p2" value={false}
                                />
                                <label htmlFor="p2">Не нужен</label>
                            </div>
                        </div>
                    </div>
                    <button
                        className=" bg-c-green text-c-white text-2xl rounded-full py-3"
                        type="submit"
                    >
                        Создать товар
                    </button>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default AddItem;
