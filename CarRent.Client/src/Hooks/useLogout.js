import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { useAuth } from "./useAuth"

const useLogout = () => {
   const { logout } = useAuth()

   
}