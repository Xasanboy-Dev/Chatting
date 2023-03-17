import IndexChat from './head'
import { Outlet } from 'react-router-dom'
export default function chat({ darkMode }: { darkMode: Boolean }) {
    return (
        <div>
            <IndexChat darkMode={darkMode} />
            <Outlet />
        </div>
    )
}
