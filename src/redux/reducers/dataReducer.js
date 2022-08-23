import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import moment from "moment";

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    galleryDataList:[],
    selectedIndexForRead:-1,
    hasPendingUpload:false,
    completedUpload:0

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
      state.galleryDataList[action.payload.selectedIndex] = action.payload.data;
     },
     emptyGalleryDataList: (state,action)=>{
      state.galleryDataList=[];
     },
     updateHasPendingUpload: (state,action)=>{
      state.hasPendingUpload = action.payload;
     },
     updateCompletedUpload: (state,action)=>{
      console.log("updateCompletedUpload",action.payload)
      state.completedUpload = action.payload;
     }
            
  },
  extraReducers: (builder) => {
   

   
  },
});

export const {
  updateGalleryDataList,
  deleteImageFromGallery,
  updateSelectedIndexForRead,
  updateGalleryImage,
  emptyGalleryDataList,
  updateHasPendingUpload,
  updateCompletedUpload
} = dataSlice.actions;

export default dataSlice.reducer;
