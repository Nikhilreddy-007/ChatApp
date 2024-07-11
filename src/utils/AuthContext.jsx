import { createContext,useState,useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
const AuthContext=createContext()

export const AuthProvider = ({children}) => {
       
      const [user,setUser]=useState(null)
      const [loading,setLoading]=useState(true)
      const navigate=useNavigate()

      useEffect( () =>{
        getUserOnLoad()
      },[])

      const getUserOnLoad = async () =>{
           try{
            const accountDetails= await account.get();
            setUser(accountDetails)  
           }
           catch(error){
            console.error(error)
           }
           setLoading(false)
      }

      const handleUserLogin = async (e,email,password) =>{
        e.preventDefault()
        try{
            const response = await account.createEmailPasswordSession(email, password);

            console.log("Account added :",response)
            const accountDetails=account.get();
            setUser(accountDetails)
             navigate('/')
        }
        catch(error){
            console.error(error)
        }

      }

      const handleUserLogout= async () =>{
        account.deleteSession('current')
        setUser(null)
      }
      const userdata={
            user ,
            handleUserLogin,
            handleUserLogout
      }
      return <AuthContext.Provider value={userdata}>
            {loading ? <p>Loading ...</p> : children}
      </AuthContext.Provider>
}

export const useAuth=() =>{
    return useContext(AuthContext)
}

export default AuthContext