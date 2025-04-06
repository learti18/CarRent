import { createContext, useState } from "react";
import { LOCATIONS } from "../common/constants";

export const RentalContext = createContext({
    locationData: {
        pickup:{
            city: LOCATIONS[0],
            date: new Date().toISOString().split('T')[0],
            time: new Date().getHours() + ':00'
        },
        dropoff:{
            city: LOCATIONS[1],
            date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
            time: new Date().getHours() + ':00'
        }
    },
    setLocationData: () => {}
});


export const RentalProvider = ({ children }) => {
    const [locationData, setLocationData] = useState({
        pickup:{
            city: LOCATIONS[0],
            date: new Date().toISOString().split('T')[0],
            time: new Date().getHours() + ':00'
        },
        dropoff:{
            city: LOCATIONS[1],
            date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
            time: new Date().getHours() + ':00'
        }
    })

    return (
        <RentalContext.Provider value={{ locationData, setLocationData }}>
            {children}
        </RentalContext.Provider>
    )
}

