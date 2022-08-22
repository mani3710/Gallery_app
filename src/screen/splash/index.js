import React,{useEffect} from 'react';
import {Text} from 'react-native';
import * as Route from '../../navigation/route';
import {
    Container,
    CaptionText,
    GalleryIcon
} from './styled';

const Splash = (props)=>{
    useEffect(()=>{
       setTimeout(()=>{
        props.navigation.replace(Route.HOME_SCREEN)
       },1000)
    },[])
    return(
        <Container>
            <GalleryIcon
            source={{uri:"https://images-na.ssl-images-amazon.com/images/I/81FDiWOTH-L.png"}}
            resizeMode="contain"
            />
            <CaptionText>Photo Gallery App</CaptionText>
         
        </Container>
    );
}

export default Splash;