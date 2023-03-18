import { Route, Routes } from 'react-router-dom'
import Users from './pages/chat/users'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/User/profile'
import Header from './pages/Header/Header'
import Layot from './pages/Header/Layout'
import Index from './pages/Auth/IndexPage'
import Archieve from './pages/Header/Archieve'
import IndexChat from './pages/chat/Layoutchat'
import client from "socket.io-client"
import { useState, useEffect } from 'react';
import { socket } from './socket';

const App = () => {
    let [click, setOnClick] = useState(Number)
    let [darkMode, setDarkMode] = useState(Boolean)
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState<any[]>([]);
    const io = client("http://localhost:7070")

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value: any) {
            setFooEvents(previous => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route
                    path='/'
                    element={
                        <Layot darkMode={darkMode} setDarkMode={setDarkMode} />
                    }
                >
                    <Route
                        path='/profile'
                        element={<Profile darkMode={darkMode} />}
                    />
                    <Route
                        path='/axasxasxasxsax'
                        element={
                            <Header
                                darkMode={darkMode}
                                setDarkMode={setDarkMode}
                            />
                        }
                    />
                    <Route
                        path='/index'
                        element={<Index darkMode={darkMode} />}
                    />
                    <Route
                        path='/Archieve'
                        element={<Archieve darkMode={darkMode} />}
                    />
                    <Route
                        path='/chat'
                        element={<IndexChat darkMode={darkMode} />}
                    >
                        <Route
                            path='/chat/users/:id'
                            element={<Users setOnClick={setOnClick} darkMode={darkMode} />}
                        />
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App