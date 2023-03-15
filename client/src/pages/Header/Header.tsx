import { useEffect, useState } from "react";

export default function Header({ darkMode, setDarkMode }: { darkMode: Boolean, setDarkMode: (darkMode: any) => void }) {
    return (
        <div>
            <ul className="flex  justify-content-between items-center">
                <li className="flex justify-content-start mx-[5%] my-[1%] text-[25px] items-center">
                    <a>
                        Chatting <i className="bi bi-telegram"></i>
                    </a>
                </li>
                <li>
                    <div className="flex flex-col items-start">
                        <input
                            type="text"
                            name="name"
                            placeholder="Search users..."
                            className="border p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>                </li>
                <li className="flex gap-5 mx-[5%]">
                    <h1 className="border border-dark rounded p-2 cursor-pointer">Archive<i className="bi bi-file-earmark-zip"></i></h1>
                    <h1 className="border border-dark rounded p-2 cursor-pointer">Notifications<i className="bi bi-bell"></i></h1>
                    <h1 className="border border-dark rounded p-2 cursor-pointer">Profile<i className="bi bi-person-circle"></i></h1>
                </li>
            </ul>
        </div>
    )
}