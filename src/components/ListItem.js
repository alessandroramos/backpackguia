import React  from 'react';
import styled from 'styled-components/native';
import Stars from  '../components/Stars';
import { useNavigation } from '@react-navigation/native'

export const Area = styled.TouchableOpacity`
    background-color: #ffffff;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
    border: 1px solid #3D4140;
`;
export const Avatar = styled.Image`
    width:88px;
    height: 88px;
    border-radius: 20px;
`;
export const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;
export const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;
export const SeeProfileButton = styled.View`
    width: 85px;
    height: 26px;
    border: 1px solid #FF9B29;
    border.radius: 10px;
    justify-content: center;
    align-items: center;
`;
export const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #000;
`;

export default ({data}) => {
    const navigation = useNavigation();
    const handeleClick = () =>{
        navigation.navigate('Perfil',  {
            key:data.key,
            nome: data.nome,
            estrela: data.estrela,
            avatar: data.avatar
        })
    }
    return (
        <Area onPress={handeleClick}>
            <Avatar source={{uri: data.avatar}} />
            <InfoArea>
                <UserName>{data.nome}</UserName>
                <Stars stars={data.estrela} showNuber={true} />
                <SeeProfileButton>
                    <SeeProfileButtonText>Ver Mais...</SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>        
        </Area>
    );
}
