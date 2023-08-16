import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  // const [auth, setAuth] = useState(false)
  console.log("aauth", auth)
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;