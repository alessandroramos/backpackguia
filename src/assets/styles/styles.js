import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #302d2d;
    flex: 1;
    align_items: center;
`;

export const InputArea = styled.View`
    margin-top: 30px;
    width: 100%;
    padding: 10px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 50px;
    background-color:  #805656;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #000;
    font-weight: bold;
`;

export const SignMenssageBotton = styled.TouchableOpacity`
    flex-direction: row;
    justify_content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;
export const SignMenssageBottonText = styled.Text`
    font-size: 16px;
    color: #f6eaea;
`;
export const SignMenssageBottonTextBold = styled.Text`    
    font-size: 16px;
    color: #f6eaea;
    font-weight: bold;
    margin-left: 5px;
`;
