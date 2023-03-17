import { Outlet } from "react-router-dom";
import IndexPage from "../Auth/IndexPage";
import Header from "./Header";

export default function Layot({ darkMode, setDarkMode }: { darkMode: Boolean, setDarkMode: (darkMode: boolean) => void }) {
    return (
        <div>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            {/* <IndexPage darkMode={darkMode} /> */}
            <Outlet />
        </div>
    )
}