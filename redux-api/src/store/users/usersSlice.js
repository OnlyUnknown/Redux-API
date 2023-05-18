import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

const userAPI = "https://randomuser.me/api/?results=5"

export const fetchUser = createAsyncThunk(
    'users/fetchuser', async () => {
        try{
            const response = await axios.get(userAPI)
            return response.data
        } catch (err){
            return err.message
        } 
    }
    
  )

const initialState = {
    users: [],
    isLoading: true,
    error: null
};


const usersSlice = createSlice({
    name:"user",
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
        .addCase(fetchUser.pending, (state,action) => {
            state.isLoading = true
        })
        .addCase(fetchUser.fulfilled, (state,action) => {
            state.users = action.payload
            state.isLoading = false
            
        })
        .addCase(fetchUser.rejected, (state,action)=> {
            state.isLoading = false;
            state.users = []
            state.error = action.error.message
        })
    }
})


export const getUsersStatus = (state) => state.isLoading
export const getUsersError = (state) => state.error


export default usersSlice.reducer