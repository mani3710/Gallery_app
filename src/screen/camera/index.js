import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Image, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Button } from 'react-native-elements';
import { Mixins } from '../../styles';
import {
    Container,
    CameraOptionContainer,
    PreviewImage
} from './styled';
import { updateGalleryDataList } from '../../redux/reducers/dataReducer';
import { useDispatch, useSelector } from 'react-redux';
const CameraScreen = () => {
    const dispatch = useDispatch();
    const [hasPermission, setHasPermission] = useState(false);
    const [selectedData, setSelectedData] = useState("");
    const devices = useCameraDevices();
    const camera = useRef(null)
    const device = devices.back;

    const dataStore = useSelector(state => state.data);

    const {
        galleryDataList
    } = dataStore;

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    const takePhoto = async () => {
        const snapshot = await camera.current.takeSnapshot({
            quality: 85,
            skipMetadata: true
        })
        setSelectedData(`file://${snapshot.path}`)
        dispatch(updateGalleryDataList(`file://${snapshot.path}`));
    }
    const getPreviewURL = () => {
        console.log("galleryDataList",galleryDataList);
        if (galleryDataList.length) {
            return  galleryDataList[galleryDataList.length - 1];
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
                                buttonStyle={{ borderRadius: 150 / 2, width: 80, height: 80, marginLeft: Mixins.scaleSize(50) }}
                                title={"Take"} />
                        </CameraOptionContainer>


                    </>)}
        </Container>
    );
}
export default CameraScreen;

