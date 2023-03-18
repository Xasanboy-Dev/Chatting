import EmojiPicker from 'emoji-picker-react'
import { useEffect, useState } from 'react'
import { user } from '../../TypeScript/modules/user'
import { getChattingUserById } from '../../TypeScript/Users/user'
export default function Chatting({
    darkMode,
    currentUserID,
    chattingUserID,
}: {
    darkMode: Boolean
    currentUserID: number
    chattingUserID: number | any
}) {
    const token = localStorage.getItem("id")        
    
    const [text, setText] = useState('')
    let [user, setUser] = useState<user>()
    let [bool, setBool] = useState(false)
    
    useEffect(() => {
        if (chattingUserID) {
            getChattingUserById(currentUserID, chattingUserID).then(res => { setUser(res.data.user) })
        }
    }, [])

    if(!token) return null

    if (!user) {
        return (
            <div className={`flex justify-content-center text-2xl  bg-${darkMode ? "dark" : "light"}`} style={{ height: innerHeight }}>
                <h1 className={`text-${darkMode ? "light" : "purple-700"}`}> Select anybody!</h1>
            </div>
        )  
    } 

    return (
        <div
            style={{ height: innerHeight - 100 }}
            className={` text-${darkMode ? 'light' : 'purple-700'} bg-${darkMode ? 'dark' : 'light'
                }`}
        >
            <div
                onClick={() => {
                    useEffect(() => { setBool(false) }, [])
                }}
                style={{ height: innerHeight - 170 }}
            >
                <div className={`border border-${darkMode ? "light" : "dark"} h-[10%]`}>
                    <ul className='flex items-center '>
                        <li className=''>
                            <img
                                className={`rounded-full my-1 w-[25%] ml-5`}
                                src={`${user.imageURL}`} />
                        </li>
                        <li className=''>
                            <div className='text-2xl bold gap-5 flex '>
                                <h1 className=''>{user.name}</h1>
                                <h1>{user.surname}</h1>
                            </div>
                            <div className='flex items-center '>
                                <h1 className={`text-${darkMode ? "light" : "green-700"}  text-2xl`}><i className="bi bi-dot"></i></h1>
                                <h1>Online</h1>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className={`flex text-center items-center h-[7%] p-2 border border-light`}
            >
                <h1 onClick={() => { useEffect(() => { setBool(true) }, []) }}>
                    <div
                        className='border mb-[125%]'
                        style={{ display: bool ? 'flex' : 'none' }}
                    >
                        <EmojiPicker
                            onEmojiClick={(e) => useEffect(() => { setText(text + e.emoji) }, [])}
                        />
                    </div>
                    <i
                        style={{ display: bool ? 'none' : 'flex' }}
                        className='mx-3  text-3xl bi bi-emoji-smile-fill'
                    ></i>
                </h1>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={`text-dark border border-${darkMode ? 'light' : 'dark'
                        } text-2xl p-2 w-[85%] h-full`}
                    type={'text'}
                    placeholder={`Start typing....`}
                />
                <button
                    className={`
                border border-${darkMode ? 'light' : 'dark'}
            `}
                >
                    Send
                </button>
            </div>
        </div>
    )
}
