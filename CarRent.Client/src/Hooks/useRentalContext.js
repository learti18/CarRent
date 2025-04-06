import { useContext } from "react"
import { RentalContext } from "../Contexts/RentalContext"

export const useRentalContext = () => {
    const context = useContext(RentalContext)

    if(!context){
        throw new Error("useRentalContext must be used within a RentalProvider!")
    }

    return context;
}