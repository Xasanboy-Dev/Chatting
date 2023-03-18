import { useState } from 'react'
import { user } from './../../TypeScript/modules/user'
import { useEffect } from 'react'
import { getUsers } from '../../TypeScript/Users/user'
export default function users({
    darkMode,
    setOnClick,
}: {
    darkMode: Boolean
    setOnClick: (click: number) => void
}) {
    let [users, setUsers] = useState<user[]>([])
    useEffect(() => {
        getUsers().then((user: user[]) => {
            setUsers(user)
        })
    }, [])
    return (
        <div
            style={{ height: innerHeight - 100 }}
            className={`border border-${darkMode ? 'light' : 'dark'} rounded
            bg-${darkMode ? 'dark' : 'light'}
            `}
        >
            <div
                className={`flex h-[7%] gap-2 mt-2 mx-2  rounded cursor-pointer items-center text-${darkMode ? 'light' : 'purple-700'
                    } justify-content-center text-2xl border border-${darkMode ? 'light' : 'dark'
                    }`}
            >
                <i className='bi text-3xl bi-cloud-arrow-up'></i>{' '}
                <h1>Archived Chats</h1>
            </div>
            <ul>
                {users.map((user) => (
                    <li
                        onClick={() => setOnClick(user.id)}
                        className={`text-${darkMode ? 'light' : 'purple-700'
                            } flex gap-5 my-3 mx-4 cursor-pointer overflow-x-auto rounded items-center  border border-${darkMode ? 'light' : 'dark'
                            }`}
                    >
                        <img
                            src={`${user.imageURL}`}
                            className={`py-2 px-1  w-[20%] rounded-full`}
                        />
                        <div className=''>
                            <h1 className={`block text-2xl`}>{user.name}</h1>
                            <div className='block '>
                                <h1>{user.email}</h1>
                                <h1>{user.location}</h1>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
