import styled from 'styled-components/native';
import { Mixins,Colors } from '../../styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.WHITE};
`;

export const EmptyViewIcon = styled.Image`
  width: ${Mixins.scaleSize(200)}px;
  height: ${Mixins.verticalScaleSize(200)}px;
 

  
`;
export const NoDataFoundCaption = styled.Text`
  color: ${Colors.BLACK};
  font-size: ${Mixins.scaleFont(12)}px;
  margin-top: ${Mixins.verticalScaleSize(10)}px;

`;
export const EmptyViewContainer = styled.View`
align-items: center;
width: 100%;
margin-top: ${Mixins.verticalScaleSize(50)}px;
 
`;

export const ContentContainer = styled.View`
flex: 1;

`;

export const ButtonContainer = styled.View`
width: 100%;
height: ${Mixins.verticalScaleSize(100)}px;

flex-direction: row;
justify-content:space-around;
align-items: center;
padding-left: ${Mixins.scaleSize(15)}px;
padding-right: ${Mixins.scaleSize(15)}px;
`;

export const ImageViewContainer = styled.View`
 flex: 1;
`;

export const OriginalImageView = styled.Image`
  width: 90%;
  height: ${Mixins.verticalScaleSize(600)}px;
  align-self: center;
  margin-bottom: ${Mixins.verticalScaleSize(15)}px;
  margin-bottom: ${Mixins.verticalScaleSize(15)}px;
`;

export const PreviewListView = styled.FlatList`
width:100%;
height:${Mixins.verticalScaleSize(100)}px;

`;

export const PreviewImage = styled.Image`
  width:${Mixins.scaleSize(80)}px;
  height: ${Mixins.verticalScaleSize(80)}px;
`;

export const ClickableView = styled.TouchableOpacity`
 width:${Mixins.scaleSize(100)}px;
  height: ${Mixins.verticalScaleSize(100)}px;
  padding-left:${Mixins.scaleSize(20)}px;
  padding-right:${Mixins.scaleSize(20)}px;
  align-self: center;
  justify-content: center;
        
`;

export const DialogTitleText = styled.Text`
  color: ${Colors.BLACK};
  font-size: ${Mixins.scaleFont(18)}px;
  font-weight: bold;
  align-self: center;
  margin-top: ${Mixins.verticalScaleSize(10)}px;
`;

export const RowContainer = styled.View`
flex-direction: row;

margin-top:  ${Mixins.verticalScaleSize(10)}px;
margin-right: ${Mixins.scaleSize(16)}px;
margin-left: ${Mixins.scaleSize(16)}px;
align-self: center;

`;

