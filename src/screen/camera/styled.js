import styled from 'styled-components/native';
import { Mixins,Colors } from '../../styles';

export const Container = styled.SafeAreaView`
  flex: 1;
 
`;

export const CameraOptionContainer = styled.View`
  
  position:absolute;
  bottom:${Mixins.verticalScaleSize(50)}px;
  flex-direction:row;
  padding-left:${Mixins.scaleSize(20)}px;
  padding-right:${Mixins.scaleSize(20)}px ;
`;

export const PreviewImage = styled.Image`
  width: ${Mixins.scaleSize(100)}px;
  height: ${Mixins.verticalScaleSize(100)}px;
  border-width: 1px;
  border-color: red;
  align-items: center;
  border-radius: 10px;
  
`;