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
import { Button,LinearProgress } from 'react-native-elements';
import { Colors, Mixins } from '../../styles';
import * as Route from '../../navigation/route';
import { Dialog } from 'react-native-simple-dialogs'
import Toast from 'react-native-simple-toast';


import { deleteImageFromGallery, updateSelectedIndexForRead } from '../../redux/reducers/dataReducer'
import axios from 'axios';
let idid =0;
const Home = (props) => {
    const dispatch = useDispatch();
    const dataStore = useSelector(state => state.data);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [shoWDeleteWarningDialog, setShoWDeleteWarningDialog] = useState(false);
    const [uploaded, setUploaded] = useState(0);
    const [showUploadDialog, setShowUploadDialog] = useState(false);

    const {
        galleryDataList
    } = dataStore;

    const uploadImage = async() => {

      setUploaded(0);
      idid =0;
      setShowUploadDialog(true); 
      fileUpload(galleryDataList[0]);

    }

    const fileUpload = async(uri)=>{
        idid =idid+1;
            console.log("uri",uri)
            const body = new FormData
            body.append("file", uri)
            
         const ddxds = await  axios("https://eos8eps7wtdi082.m.pipedream.net", {
                body,
                headers: {
                    Accept: "*/*", 
                    "Content-Type": "multipart/form-data"
                },
                method: "POST"
            })
            console.log("ddxdsddxds",ddxds.data);
            if(idid <=  galleryDataList.length){
                console.log("uri",idid) 
               setUploaded(idid);
                fileUpload(galleryDataList[idid]);
            }
         
       
        

    }
    const isHaveData = () => {
        if (galleryDataList.length) {
            return <ImageViewContainer>
                <OriginalImageView
                    source={{ uri: galleryDataList[selectedIndex] }}
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
                                    source={{ uri: item }}
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
                <DialogTitleText>{uploaded}/{galleryDataList.length} Uploaded</DialogTitleText>
                <RowContainer>
                    {galleryDataList.length == uploaded &&   <Button
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