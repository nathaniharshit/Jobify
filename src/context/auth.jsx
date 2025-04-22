import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext()
// AuthProvider is a function that has children as prop that will provide auth and setAuth to all its children 
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: "" })

    // axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const ParseData = JSON.parse(data)
            setAuth({
               ...auth, user: ParseData.user, token: ParseData.token
            })
            // eslint-disable-next-line
        }
    }, [])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
// custom hook
const useAuth = () => useContext(AuthContext)

export { useAuth }
export default AuthProvider