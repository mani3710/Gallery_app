import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import moment from "moment";





 
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
   

   
  },
});

export const {
  updateGalleryDataList,
  deleteImageFromGallery,
  updateSelectedIndexForRead,
  updateGalleryImage
} = dataSlice.actions;

export default dataSlice.reducer;
