import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    onlineUsers : [],

    isCheckingAuth : true,

    checkAuth : async()=>{
        try{
            const res = await axiosInstance.get('/auth/check');
            set({authUser : res.data})
        }catch(err){
            set({authUser : null});
            console.log("error checking auth",err);
        }finally{
            set({isCheckingAuth : false});
        }
    },

    signup : async (data)=>{
        set({isSigningUp : true});
        try{
            const res =  await axiosInstance.post("/auth/signup",data);
            set({authUser : res.data});
            toast.success("Account created successfully");
        }catch(err){
            toast.error("Error creating account");
            console.log("Error creating account",err);
        }
        finally{
            set({isSigningUp : false});
        }
    },

    login : async (data)=>{
        set({isLoggingIn : true});
        try{
            const res = await axiosInstance.post("/auth/signin",data);
            set({authUser : res.data});
            toast.success("Logged in successfully");
        }catch(err){
            toast.error("Error logging in");
            console.log("Error logging in",err);
        }finally{
            set({isLoggingIn : false});
        }
    },

    logout :async ()=>{
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser : null});
            toast.success("Logged out successfully");
        }catch(err){
            console.log("Error logging out",err);
        }
    },

    updateProfile : async (data)=>{
        set({isUpdatingProfile : true});
        try{
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser : res.data});
            toast.success("Profile updated successfully");

        }catch(err){
            toast.error("Error updating profile");
            console.log("Error updating profile",err);
        }finally{
            set({isUpdatingProfile : false});
        }
    },

}));