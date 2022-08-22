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
import { Button } from 'react-native-elements';
import { Colors, Mixins } from '../../styles';
import * as Route from '../../navigation/route';
import {Dialog} from 'react-native-simple-dialogs'
import Toast from 'react-native-simple-toast';
import {deleteImageFromGallery} from '../../redux/reducers/dataReducer'
const Home = (props) => {
    const dispatch = useDispatch();
    const dataStore = useSelector(state => state.data);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [shoWDeleteWarningDialog,setShoWDeleteWarningDialog] = useState(false);


    const {
        galleryDataList
    } = dataStore;
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
                        onPress={() => { }}
                        buttonStyle={{ backgroundColor: "#145DA0", width: Mixins.scaleSize(70) }}
                        title={"R"} />
                    <Button
                        onPress={() => {   setShoWDeleteWarningDialog(true); }}
                        buttonStyle={{ backgroundColor: "#b30000", width: Mixins.scaleSize(70) }}
                        title={"D"} />
                    <Button
                        onPress={() => { }}
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
                        onPress={() => { props.navigation.navigate(Route.CAMERA_SCREEN) }}
                        buttonStyle={{ backgroundColor: "#008000", width: Mixins.scaleSize(70) }}
                        title={"C"} />
                    {renderButton()}


                </ButtonContainer>

                <Dialog
             visible={shoWDeleteWarningDialog}
             contentStyle={{backgroundColor: Colors.WHITE,borderRadius:10}}
             dialogStyle={{backgroundColor:Colors.WHITE,elevation:20,borderRadius:10}}
             onTouchOutside={()=>{setShoWDeleteWarningDialog(false)}}
            >
                <DialogTitleText>Do you want to delete ?</DialogTitleText>
                <RowContainer>
                <Button
                    onPress={() => {  
                        setShoWDeleteWarningDialog(false)
                    }

                    }
                    buttonStyle={{ backgroundColor:  "red" , marginTop: 40, width: "86%", alignSelf: "center"}}
                    title={"NO"} />
                <Button
                    onPress={() => {
                      
                       setShoWDeleteWarningDialog(false);
                       dispatch(deleteImageFromGallery(selectedIndex));
                       setSelectedIndex(selectedIndex==0 ? selectedIndex:selectedIndex-1);
                       Toast.show("Deleted successfully!")
                    }
                    }
                    buttonStyle={{ backgroundColor:  "#521e69" , marginTop: 40, width: "86%", alignSelf: "center" }}
                    title={"YES"} />
                </RowContainer>
               

                

            </Dialog>



            </Container>
        );
    }

    export default Home;