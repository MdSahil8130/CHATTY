import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set)=>({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,

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

    }

}));