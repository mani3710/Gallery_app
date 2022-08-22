import styled from 'styled-components/native';
import { Mixins,Colors } from '../../styles';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.WHITE};
`;

export const CaptionText = styled.Text`
  color: ${Colors.BLACK};
  font-size: ${Mixins.scaleFont(18)}px;
  font-weight: bold;
  margin-top: ${Mixins.verticalScaleSize(10)}px;
  
`;

export const GalleryIcon = styled.Image`
  width: ${Mixins.scaleSize(100)}px;
  height: ${Mixins.verticalScaleSize(100)}px;
  
`;