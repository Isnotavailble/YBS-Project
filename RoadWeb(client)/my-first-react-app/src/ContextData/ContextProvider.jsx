import { ContextData } from "./ContextData";
import { useState,useEffect } from "react";
const ContextProvider = ({children}) => {
    let [inputData, setInputData] = useState(null);
    useEffect(() => {
        console.log("ContextProvider inputData : ", inputData);
    },[])
    return (
        <ContextData.Provider value={{inputData,setInputData}}>
            {children}
        </ContextData.Provider>
    );
}
export default ContextProvider;