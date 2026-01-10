"use client"
import Link from "next/link";
import Image from "next/image";
import NavbarClient from "../components/NavbarClient";

export default function Order() {
    return (
        <section className="min-h-screen w-full flex items-center px-6 pt-32 pb-16">
            <NavbarClient />
            <div className="container mx-auto bg-olivegreen flex items-center justify-center rounded-xl p-6">
                <div className="flex flex-col w-full">
                    <div className="flex items-center text-center justify-center mb-10">
                        <h1 className="font-edu text-ivory text-5xl font-semibold">Your Order</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col w-full xl:w-1/2 space-y-2">
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <button className="font-poppins text-white border-red-500 bg-red-500 border px-2 cursor-pointer rounded-full">X</button>
                                <h1 className="font-poppins text-white">Nama Barang</h1>
                                <h1 className="font-poppins text-white">x2</h1>
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <button className="font-poppins text-white border-red-500 bg-red-500 border px-2 cursor-pointer rounded-full">X</button>
                                <h1 className="font-poppins text-white">Nama Barang</h1>
                                <h1 className="font-poppins text-white">x2</h1>
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <button className="font-poppins text-white border-red-500 bg-red-500 border px-2 cursor-pointer rounded-full">X</button>
                                <h1 className="font-poppins text-white">Nama Barang</h1>
                                <h1 className="font-poppins text-white">x2</h1>
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <button className="font-poppins text-white border-red-500 bg-red-500 border px-2 cursor-pointer rounded-full">X</button>
                                <h1 className="font-poppins text-white">Nama Barang</h1>
                                <h1 className="font-poppins text-white">x2</h1>
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <textarea className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address"/>
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <label htmlFor="" className="border bg-white rounded-xl p-1 border-white text-center font-poppins mr-3 text-olivegreen w-full">Fitting Date</label>
                                <input type="date" className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address"/>
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <label htmlFor="" className="border bg-white rounded-xl p-1 border-white text-center font-poppins mr-3 text-olivegreen w-full">Fitting Time</label>
                                <input type="time" className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address"/>
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <label htmlFor="" className="border bg-white rounded-xl p-1 border-white text-center font-poppins mr-3 text-olivegreen w-full">Wedding Date</label>
                                <input type="date" className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address"/>
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <label htmlFor="" className="border bg-white rounded-xl p-1 border-white text-center font-poppins mr-3 text-olivegreen w-full">Wedding Time</label>
                                <input type="time" className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address"/>
                            </div>
                            <div className="border flex justify-between items-center p-3 rounded-xl bg-lightolive border-lightolive">
                                <label htmlFor="" className="border bg-white rounded-xl p-1 border-white text-center font-poppins mr-3 text-olivegreen w-full">Return Date</label>
                                <input type="date" className="w-full focus:outline-none font-poppins text-white" placeholder="Your Address"/>
                            </div>
                            <div className="w-full border mt-5 text-center font-poppins text-white text-lg rounded-xl bg-green-500 border-green-500 cursor-pointer hover:border-green-700 hover:bg-green-700 duration-200 hover:shadow-xl">
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}