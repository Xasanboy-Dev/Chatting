import { useEffect, useState } from "react"
import { checkTokenValid } from "../../TypeScript/Auth/Auth"
export default function Header({ darkMode, setDarkMode }: { darkMode: Boolean, setDarkMode: (darkMode: boolean) => void }) {
    let [bool, setBool] = useState(Boolean)
    let token = localStorage.getItem("id")
    useEffect(() => {
        if (token) {
            const result = checkTokenValid(token)
            result.then(res => {
                setBool(res)
            })
        } else {
            setBool(false)
        }
    }, [])
    let [search, setSearch] = useState("")
    function onSubmit(e: any, search: string) {
        e.preventDefault()
        localStorage.setItem("search", search)
    }
    return (
        <div>
            <ul className={`flex bg-${darkMode ? "dark" : "light"}  justify-content-between items-center`}>
                <li className={`flex text-${darkMode ? "light" : "purple-700"} justify-content-start mx-[5%] my-[1%] text-[25px] items-center`}>
                    <a href='/index' className={`cursor-pointer gap-1 border py-1 flex items-center border-${darkMode ? "light" : 'dark'} px-3 shadow shadow-2xl rounded`}>
                        Chatting <i className="bi bi-telegram"></i>
                    </a>
                </li>
                <li>
                    <i
                        onClick={() => setDarkMode(false)}
                        style={{ display: darkMode ? "flex" : "none" }}
                        className={`border border-${darkMode ? "light" : "dark"} p-2 rounded text-${darkMode ? "light" : "dark"} text-2xl bi bi-brightness-high-fill`}
                    ></i>
                    <i
                        style={{ display: darkMode ? "none" : "flex" }}
                        onClick={() => setDarkMode(true)}
                        className={`border border-${darkMode ? "light" : "dark"} text-purple-700 rounded p-2 text-2xl bi bi-moon-fill`}
                    ></i>
                </li>
                <li>
                    <form onSubmit={(e) => onSubmit(e, search)}>
                        <div className="flex   items-center">
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                name="name"
                                placeholder="Search users..."
                                className={`
                                text-${darkMode ? "light" : "purple-700"}
                                 border p-2 block w-full mt-1 border-${darkMode ? "light" : "dark"} rounded-md shadow-2xl 
                                focus:border-indigo-300
                                 focus:ring focus:ring-indigo-200
                                  focus:ring-opacity-50
                                  bg-${darkMode ? "dark" : "light"}
                                  `}
                            />
                            <input className={`text-${darkMode ? "light" : "purple-700"} border border-${darkMode ? "light" : "dark"} p-2 rounded`} value={"Send"} type={"submit"} />
                        </div>
                        <div style={{ display: search ? "flex" : "none" }}>
                            <ul className="gap-4">
                                <h1 className={`my-1 flex text-center text-${darkMode ? "light" : "purple-700"} justify-content-center`}>Search by:</h1>
                                <div className={`flex text-${darkMode ? "light" : "purple-700"} justify-content-center items-center gap-3`}>
                                    <div className="block">
                                        <li className="flex gap-1">
                                            <h1># Name:</h1>
                                            <input type={"checkbox"} />
                                        </li>
                                        <li className="gap-1 flex">
                                            <h1># Surname:</h1>
                                            <input type={"checkbox"} />
                                        </li>
                                    </div>
                                    <div>
                                        <li className="flex gap-1">
                                            <h1>@ Email:</h1>
                                            <input type={"checkbox"} />
                                        </li>
                                        <li className="flex gap-1">
                                            <h1>
                                                <i className="bi bi-geo-alt-fill"></i>
                                                Location:</h1>
                                            <input type={"checkbox"} />
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </form>
                </li>
                <li className={`flex gap-5 mx-[5%] text-${darkMode ? "light" : "dark"} `}>
                    <a href="/archieve"
                        className={`shadow shadow-2xl border border-
                    ${darkMode ? "light" : "dark"}
                     rounded p-2 cursor-pointer`
                        }
                        style={{ display: bool ? "block" : "none" }}
                    >Archive<i className="bi bi-file-earmark-zip"></i></a>
                    <h1
                        className={`shadow shadow-2xl border border-
                    ${darkMode ? "light" : "dark"}
                     rounded p-2 cursor-pointer`
                        }
                        style={{ display: bool ? "block" : "none" }}
                    >Notifications<i className="bi bi-bell"></i></h1>
                    <a href="/profile"
                        className={`shadow shadow-2xl border border-
                    ${darkMode ? "light" : "dark"}
                     rounded p-2 cursor-pointer`
                        }
                        style={{ display: bool ? "block" : "none" }}
                    >Profile<i className="bi bi-person-circle"></i></a>
                </li>
            </ul>
            <div>
                <hr className={`border border-dark`} />
            </div>
        </div >
    )
}