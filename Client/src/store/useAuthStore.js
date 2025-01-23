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
      get().connectSocket();
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
}));
