import { createContext,useState,useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
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

      const handleUserRegister = async (e,email,pass1,pass2,name) =>{
        e.preventDefault()

        if(pass1!==pass2){
          alert("Passwords don't match!!")
          return
        }

        try{
               const respone= await account.create(
                ID.unique(),
                email,
                pass1,
                name
               )
              await account.createEmailPasswordSession(email, pass1);
               const accountDetails=account.get();
               setUser(accountDetails)
               navigate('/')
               
               console.log("Registered !! ",respone)
        }
        catch(error){
          console.error(error)
        }



      }

      const userdata={
            user ,
            handleUserLogin,
            handleUserLogout,
            handleUserRegister
      }
      return <AuthContext.Provider value={userdata}>
            {loading ? <p>Loading ...</p> : children}
      </AuthContext.Provider>
}

export const useAuth=() =>{
    return useContext(AuthContext)
}

export default AuthContext