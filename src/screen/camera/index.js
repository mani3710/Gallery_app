import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Image, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Button } from 'react-native-elements';
import { Mixins } from '../../styles';
import {
    Container,
    CameraOptionContainer,
    PreviewImage,
    BackOption
} from './styled';
import { updateGalleryDataList,updateGalleryImage } from '../../redux/reducers/dataReducer';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import ImageResizer from 'react-native-image-resizer';
const CameraScreen = (props) => {

    const dispatch = useDispatch();
    const [hasPermission, setHasPermission] = useState(false);
    
    const devices = useCameraDevices();
    const camera = useRef(null)
    const device = devices.back;

    const dataStore = useSelector(state => state.data);

    const {
        galleryDataList,
        selectedIndexForRead
    } = dataStore;

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);
 
    const takePhoto = async () => {

        const snapshot = await camera.current.takePhoto({ });
       const compressedImage = await ImageResizer.createResizedImage(snapshot.path, 3000, 4000, "JPEG",80,0.0,null)
        console.log("compressedImage 212",snapshot)

      if(props.route?.params?.action == "create"){
        dispatch(updateGalleryDataList(compressedImage)); 
      }else if(props.route?.params?.action == "read"){
        dispatch(updateGalleryImage({data:compressedImage,selectedIndex:selectedIndexForRead}));
        Toast.show("Updated successfully");
        props.navigation.goBack(); 
      }
        
    }    
    const getPreviewURL = () => {
        console.log("galleryDataList",galleryDataList);
        if (galleryDataList.length) {
            return  galleryDataList[galleryDataList.length - 1].uri;
        }
        return "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
    }

    return (
        <Container>
            {device != null &&
                hasPermission && (
                    <>

                        <Camera
                            style={StyleSheet.absoluteFill}
                            ref={camera}
                            device={device}
                            isActive={true}
                        />
                        <CameraOptionContainer>
                            <PreviewImage
                                source={{ uri: getPreviewURL() }}

                            />
                            <Button
                                onPress={() => { takePhoto() }}
                                buttonStyle={{ borderRadius: 150 / 2, width: 80, height: 80, marginLeft: Mixins.scaleSize(30) }}
                                title={"Take"} />

<Button
                                onPress={() => { props.navigation.goBack() }}
                                buttonStyle={{ borderRadius: 10, width: 80, marginLeft: Mixins.scaleSize(30),backgroundColor:"rgba(128, 128, 128,0.3)" }}
                                title={"Back"} />
                                

                        </CameraOptionContainer>


                    </>)}
        </Container>
    );
}
export default CameraScreen;

