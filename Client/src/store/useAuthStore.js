import { create } from "zustand";

import {  axioss } from "../lib/axios";
//object has intial state
export const useAuthStore = create((set)=>({
authUser :null,
isSigningUp : false,
isLoggingIng : false,
isUpdatingProfile : false,
//check user is authenticated or not while refreshing page
isCheckingAuth : true,

checkAuth:async ()=>{
    set({isCheckingAuth:true})
    try{
        const res = await axioss.get("/auth/check")
        set({authUser:res.data})
    }catch(error){
        console.log("error in checkAuth",error)
        set({authUser:null})
    }finally{
 set({isCheckingAuth:false})
    }
}
}))