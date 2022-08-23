import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import {
    Container,
    EmptyViewIcon,
    NoDataFoundCaption,
    EmptyViewContainer,
    ContentContainer,
    ButtonContainer,
    ImageViewContainer,
    OriginalImageView,
    PreviewListView,
    PreviewImage,
    ClickableView,
    DialogTitleText,
    RowContainer
} from './styled';
import { useDispatch, useSelector } from 'react-redux';
import Images from '../../assets/images/noDataFound.png';
import { Button, LinearProgress } from 'react-native-elements';
import { Colors, Mixins } from '../../styles';
import * as Route from '../../navigation/route';
import { Dialog } from 'react-native-simple-dialogs'
import Toast from 'react-native-simple-toast';
import fs from 'react-native-fs'

import { deleteImageFromGallery, 
    updateSelectedIndexForRead, 
    emptyGalleryDataList,
    updateHasPendingUpload,
    updateCompletedUpload } from '../../redux/reducers/dataReducer'
import axios from 'axios';
let sequenceNo = 0;
const Home = (props) => {
    const dispatch = useDispatch();
    const dataStore = useSelector(state => state.data);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [shoWDeleteWarningDialog, setShoWDeleteWarningDialog] = useState(false);
    const [uploaded, setUploaded] = useState(0);
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    const [uploadingFinished, setUploadingFinished] = useState(false);

    const {
        galleryDataList,
        hasPendingUpload,
        completedUpload
    } = dataStore;
    useEffect(()=>{
        if(hasPendingUpload){
            console.log("completedUpload 2121",completedUpload)
            sequenceNo=completedUpload;
            setUploaded(completedUpload);
            fileUpload(galleryDataList[completedUpload]);
            setShowUploadDialog(true);
        }
    },[]);

    const uploadImage = async () => {
        
        setUploaded(0);
        setUploadingFinished(false);
        sequenceNo = 0;
        setShowUploadDialog(true);
        dispatch(updateHasPendingUpload(true))
       // dispatch(updateCompletedUpload(sequenceNo+1)) 
        fileUpload(galleryDataList[0]);
        

    }
 
    const fileUpload = async (data) => { 
        
        console.log("completedUpload",completedUpload);
        console.log("sequenceNo", sequenceNo) 
        sequenceNo = sequenceNo + 1; 
        dispatch(updateCompletedUpload(sequenceNo));
        const body = new FormData();
        console.log("image", { uri: data.uri, name: data.name, type: "image/jpg" });
        body.append("image", { uri: data.uri, name: data.name, type: "image/jpg" });

        const result = await axios.post(`https://eob9z66mnozqf9r.m.pipedream.net/${sequenceNo}`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
      
        setUploaded(sequenceNo);
        fs.unlink(data.uri);
        if (sequenceNo < galleryDataList.length) {
             
            console.log("uri", sequenceNo)  
           // fs.unlink(data.uri);
            fileUpload(galleryDataList[sequenceNo]);
        } else {
            setUploadingFinished(true);
            dispatch(updateHasPendingUpload(false))
            dispatch(updateCompletedUpload(0))
            dispatch(emptyGalleryDataList());
        }
    }
    const isHaveData = () => {
        if (galleryDataList.length) {
            return <ImageViewContainer>
                <OriginalImageView
                    source={{ uri: galleryDataList[selectedIndex].uri }}
                    resizeMode="contain"
                />
                <PreviewListView
                    horizontal
                    data={galleryDataList}
                    renderItem={({ item, index }) => {
                        return (
                            <ClickableView
                                onPress={() => { setSelectedIndex(index) }}
                                style={{ marginRight: galleryDataList.length - 1 == index ? 30 : 0 }}>
                                <PreviewImage
                                    style={{ borderWidth: selectedIndex == index ? 3 : 0, borderColor: "red" }}
                                    source={{ uri: item.uri }}
                                />
                            </ClickableView>

                        );
                    }}
                />
            </ImageViewContainer>
        } else {
            return (
                <EmptyViewContainer>
                    <EmptyViewIcon
                        source={Images}
                        resizeMode="contain"
                    />
                    <NoDataFoundCaption>No images found</NoDataFoundCaption>
                </EmptyViewContainer>
            )
        }
    }
    const renderButton = () => {
        if (galleryDataList.length) {
            return (
                <>
                    <Button
                        onPress={() => {
                            dispatch(updateSelectedIndexForRead(selectedIndex));
                            props.navigation.navigate(Route.CAMERA_SCREEN, { action: "read" })
                        }}
                        buttonStyle={{ backgroundColor: "#145DA0", width: Mixins.scaleSize(70) }}
                        title={"R"} />
                    <Button
                        onPress={() => { setShoWDeleteWarningDialog(true); }}
                        buttonStyle={{ backgroundColor: "#b30000", width: Mixins.scaleSize(70) }}
                        title={"D"} />
                    <Button
                        onPress={() => { uploadImage() }}
                        buttonStyle={{ backgroundColor: "#ff6600", width: Mixins.scaleSize(70) }}
                        title={"U"} />
                </>
            );


        }
        return null;
    }
    return (
        <Container>
            <ContentContainer>
                {isHaveData()}

            </ContentContainer>
            <ButtonContainer>
                <Button
                    onPress={() => { props.navigation.navigate(Route.CAMERA_SCREEN, { action: "create" }) }}
                    buttonStyle={{ backgroundColor: "#008000", width: Mixins.scaleSize(70) }}
                    title={"C"} />
                {renderButton()}


            </ButtonContainer>

            <Dialog
                visible={shoWDeleteWarningDialog}
                contentStyle={{ backgroundColor: Colors.WHITE, borderRadius: 10 }}
                dialogStyle={{ backgroundColor: Colors.WHITE, elevation: 20, borderRadius: 10 }}
                onTouchOutside={() => { setShoWDeleteWarningDialog(false) }}
            >
                <DialogTitleText>Do you want to delete ?</DialogTitleText>
                <RowContainer>
                    <Button
                        onPress={() => {
                            setShoWDeleteWarningDialog(false)
                        }

                        }
                        buttonStyle={{ backgroundColor: "red", marginTop: 40, width: "86%", alignSelf: "center" }}
                        title={"NO"} />
                    <Button
                        onPress={() => {

                            setShoWDeleteWarningDialog(false);
                            dispatch(deleteImageFromGallery(selectedIndex));
                            setSelectedIndex(selectedIndex == 0 ? selectedIndex : selectedIndex - 1);
                            Toast.show("Deleted successfully!")
                        }
                        }
                        buttonStyle={{ backgroundColor: "#521e69", marginTop: 40, width: "86%", alignSelf: "center" }}
                        title={"YES"} />
                </RowContainer>




            </Dialog>


            <Dialog
                visible={showUploadDialog}
                contentStyle={{ backgroundColor: Colors.WHITE, borderRadius: 10 }}
                dialogStyle={{ backgroundColor: Colors.WHITE, elevation: 20, borderRadius: 10 }}
            //onTouchOutside={() => { setShoWDeleteWarningDialog(false) }}
            >
                {uploadingFinished ?
                    <DialogTitleText>Uploaded successfully</DialogTitleText> :
                    <DialogTitleText>{uploaded}/{galleryDataList.length} Uploaded</DialogTitleText>
                }
                <RowContainer>
                    {uploadingFinished && <Button
                        onPress={() => {
                            setShowUploadDialog(false)
                        }

                        }
                        buttonStyle={{ backgroundColor: "red", marginTop: 40, width: "86%", alignSelf: "center" }}
                        title={"DONE"} />}



                </RowContainer>




            </Dialog>



        </Container>
    );
}

export default Home;