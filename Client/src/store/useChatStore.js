import {create} from 'zustand'
import { axioss } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set,get)=>({
    messages: [],
    selectedUser: null,
    users: [],
    isUsersLoading: false,
    isMessagesLoading: false,
   
  getUsers : async ()=>{
    set({isUsersLoading :true});
    try {
         const res = await axioss.get('/messages/users');
         set({users:res.data});
    } catch (error) {
        toast.error(error.response.data.message);
    }finally{
        set({isUsersLoading :false});
    }
  },
  getMessages : async (userId)=>{
    set({isMessagesLoading :true});
    try {
         const res = await axioss.get(`/messages/${userId}`);
         set({messages:res.data});
    } catch (error) {
        toast.error(error.response.data.message);
    }finally{
        set({isMessagesLoading :false});
    }
  },
  sendMessage : async (messageData)=>{
    const {selectedUser,messages} = get()
    try {
         const res = await axioss.post(`/messages/send/${selectedUser._id}`,messageData);
         set({messages:[...messages,res.data]});
    } catch (error) {
        toast.error(error.response.data.message);
    }
  },
setSelectedUser :async (selectedUser)=>set ({selectedUser}),

}))
