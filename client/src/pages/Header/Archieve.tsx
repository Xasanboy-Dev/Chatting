import { checkTokenValid } from '../../TypeScript/Auth/Auth'
import {
    deleteAchivedUser,
    getArchivedUsers,
    getUserById,
} from '../../TypeScript/Users/user'
import { useState } from 'react'
import { user } from './../../TypeScript/modules/user'
import { useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

export default function Archieve({ darkMode }: { darkMode: Boolean }) {
    const token = localStorage.getItem('id')
    const userID = localStorage.getItem('userID')
    let [archived, setArchived] = useState([])
    let [user, setUser] = useState<user>()
    if (token && userID) {
        let [ValidTOken, setValidToken] = useState(Boolean)
        checkTokenValid(token).then((res) => {
            setValidToken(res)
        })
        const aboutUser = getUserById(+userID, token)
        useEffect(() => {
            aboutUser.then((res) => {
                setUser(res.data.user)
            })
        }, [])
        let [users, setUsers] = useState<user[]>([])
        if (users && user) {
            const archivedUsers = getArchivedUsers(user.id, token)
            archivedUsers.then((res) => {
                setUsers(res.data.users)
            })
        }
        return (
            <div
                className={`bg-${darkMode ? 'dark' : 'light'}`}
                style={{ height: innerHeight }}
            >
                <ul className='py-5'>
                    {users.map((user) => (
                        <li
                            className={`items-center my-5 flex border border-${
                                darkMode ? 'light' : 'dark'
                            } 
                border-2xl w-[80%] mx-auto rounded-2xl  shadow shadow-2xl`}
                        >
                            <div>
                                <img
                                    className={`h-[75px] p-2 rounded-full`}
                                    src={`${user.imageURL}`}
                                />
                            </div>
                            <div className='mx-2'>
                                <CopyToClipboard text={`${user.email}`}>
                                    <button
                                        onClick={() =>
                                            alert('Copied succesfully!')
                                        }
                                        className={` items-center flex`}
                                    >
                                        <h1
                                            className={`border border-${
                                                darkMode ? 'light' : 'dark'
                                            } text-${
                                                darkMode ? 'light' : 'dark'
                                            } rounded p-2`}
                                        >
                                            {user.email}
                                        </h1>
                                        <h2
                                            className={`text-${
                                                darkMode ? 'light' : 'dark'
                                            }`}
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='currentColor'
                                                className='w-6 h-6'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z'
                                                />
                                            </svg>
                                        </h2>
                                    </button>
                                </CopyToClipboard>
                            </div>
                            <div className={`mx-auto flex gap-3`}>
                                <button
                                    className={`
                        text-light
                         py-1 px-3 border-${darkMode ? 'light' : 'dark'} border
                         rounded bg-green-700 
                         `}
                                >
                                    Send a message
                                </button>
                            </div>
                            <div
                                className={`flex text-2xl border border-${
                                    darkMode ? 'light' : 'dark'
                                } rounded mx-2`}
                            >
                                <button
                                    onClick={() =>
                                        deleteAchivedUser(token, user.id)
                                    }
                                >
                                    <i
                                        className={`bi bi-x text-${
                                            darkMode ? 'light' : 'purple-700'
                                        }`}
                                    ></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else {
        return (
            <div className={`flex justify-content-center text-2xl my-5`}>
                Please wait a minute!
            </div>
        )
    }
}
