import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
export default function Chatting({
    darkMode,
    currentUserID,
    chattingUserID,
}: {
    darkMode: Boolean
    currentUserID: number
    chattingUserID: number
}) {
    let [bool, setBool] = useState(false)
    let [text, setText] = useState('')
    return (
        <div
            style={{ height: innerHeight - 100 }}
            className={` text-${darkMode ? 'light' : 'purple-700'} bg-${
                darkMode ? 'dark' : 'light'
            }`}
        >
            <div
                onClick={() => {
                    setBool(false)
                }}
                style={{ height: innerHeight - 170 }}
                className={``}
            ></div>
            <div
                className={`flex text-center items-center h-[7%] p-2 border border-light`}
            >
                <h1 onClick={() => setBool(true)}>
                    <div
                        className='border mb-[125%]'
                        style={{ display: bool ? 'flex' : 'none' }}
                    >
                        <EmojiPicker
                            onEmojiClick={(e) => setText(text + e.emoji)}
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
                    className={`text-dark border border-${
                        darkMode ? 'light' : 'dark'
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
