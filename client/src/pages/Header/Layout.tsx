import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layot({
    darkMode,
    setDarkMode,
}: {
    darkMode: Boolean
    setDarkMode: (darkMode: boolean) => void
}) {
    return (
        <div>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Outlet />
        </div>
    )
}
