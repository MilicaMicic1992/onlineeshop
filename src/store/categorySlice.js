import { createSlice } from "@reduxjs/toolkit";

const categorySLice = createSlice({
    name: 'category',
    initialState:{
        allCategory: [],
        isLoading: false
    },
    reducers:{
        saveAllCategoryAction : (state, action) => {
            state.allCategory = action.payload;
            state.isLoading = true;
        }
    }

})

export const {saveAllCategoryAction} = categorySLice.actions;
export default categorySLice.reducer;