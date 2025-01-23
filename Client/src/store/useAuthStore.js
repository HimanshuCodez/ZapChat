import { create } from "zustand";
import { axioss } from "../lib/axios";
import toast from "react-hot-toast";

// Zustand store with initial state
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    // Check if the user is authenticated while refreshing the page
    isCheckingAuth: true,

   
  checkAuth: async () => {
    try {
      const res = await axioss.get("/auth/check");

      set({ authUser: res.data });
      
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
        const res = await axioss.post("/auth/signup", data);
        set({ authUser: res.data });
        toast.success("Account Created Successfully");
    } catch (error) {
        // Safely access the error message with optional chaining
        const errorMessage =
            error.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMessage);
        console.log("Error in signup:", error);
    } finally {
        set({ isSigningUp: false });
    }
},
login :async (data)=>{
   set({ isLoggingIn: true });
    try {
        const res = await axioss.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Logged In Successfully");
    } catch (error) {
        toast.error("Invalid Credentials");
        console.log("Error in login:", error);
    } finally {
        set({ isLoggingIn: false });
    }
},
logout :async ()=>{
    try {
        await axioss.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged Out Successfully");
    } catch (error) {
        console.log("Error in logout:", error);
        toast.error("An error occurred while logging out");
    }
},

// Update user profile

updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
        const res = await axioss.patch("/auth/update-profile", data);
        set({ authUser: res.data });
        toast.success("Profile Updated Successfully");
    } catch (error) {
        toast.error("An error occurred while updating profile");
        console.log("Error in updateProfile:", error);
    } finally {
        set({ isUpdatingProfile: false });
    }
},
updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axioss.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile store:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
