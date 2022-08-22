import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import moment from "moment";


// export const getQuoteOfTheDay = createAsyncThunk(
//   'data/getQuoteOfTheDay',
//   async () => {
//     const response = await fetch("https://zenquotes.io/api/today")
//     const result =await response.json();
//     console.log("mani111112121", result);
//     return {result:result[0]};
//   }
// )


 
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    galleryDataList:[],
    selectedIndexForRead:-1

  },
  reducers: {
   
     updateGalleryDataList : (state,action)=>{
      state.galleryDataList.push(action.payload)
     },
     deleteImageFromGallery : (state,action)=>{
      state.galleryDataList.splice(action.payload,1);
     },
     updateSelectedIndexForRead: (state,action)=>{
      console.log(action.payload);
      state.selectedIndexForRead=action.payload;
     },
     updateGalleryImage: (state,action)=>{
      state.galleryDataList[action.payload.selectedIndex] = action.payload.uri;
     },
   

  },
  extraReducers: (builder) => {
    // builder.addCase(getQuoteOfTheDay.pending, (state) => {
    //   state.loader = true;
      
    // });
    // builder.addCase(getQuoteOfTheDay.fulfilled, (state, action) => {

    //   state.loader = true;
    // state.quoteInformation = action.payload.result;

    // });
    // builder.addCase(getQuoteOfTheDay.rejected, (state, action) => {
    //   state.loader = true;
    // });

   
  },
});

export const {
  updateGalleryDataList,
  deleteImageFromGallery,
  updateSelectedIndexForRead,
  updateGalleryImage
} = dataSlice.actions;

export default dataSlice.reducer;
