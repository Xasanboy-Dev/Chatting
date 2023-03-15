import axios from "axios"
import { useEffect, useState } from "react"
import { getUsers } from "../../TypeScript/Users/user"
import { user } from "./../../TypeScript/modules/user"

export default function IndexPage() {
    let search = localStorage.getItem("search")
    let [users, setUsers] = useState<user[]>([])
    let [searching, setSeaching] = useState("")
    if (search) {
        setSeaching(search!)
        localStorage.removeItem("search")
    }
    if (searching) {
    } else {
        getUsers().then((user: user[]) => {
            setUsers(user)
        })
    }
    return (
        <div>
            <div>
                {users.map((user: user))={}}
            </div>
        </div>
    )
} 