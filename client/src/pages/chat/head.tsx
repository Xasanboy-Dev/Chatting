import Users from './users'
import Chatting from './chat'
import { useState } from 'react'
export default function IndexChat({ darkMode }: { darkMode: Boolean }) {
    let [click, setOnClick] = useState<number>()
    const userID = localStorage.getItem('userID')
    if (userID) {
        return (
            <div className='flex gap-3'>
                <div className={` w-[30%]`}>
                    <Users setOnClick={setOnClick} darkMode={darkMode} />
                </div>
                <div className={`border  w-full rounded border-dark`}>
                    <Chatting
                        chattingUserID={click!}
                        currentUserID={+userID}
                        darkMode={darkMode}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div
                style={{ height: innerHeight }}
                className={`bg-${
                    darkMode ? 'dark' : 'light'
                } flex justify-content-center text-2xl text-${
                    darkMode ? 'light' : 'purple-700'
                } 
             `}
            >
                Please login!
            </div>
        )
    }
}
