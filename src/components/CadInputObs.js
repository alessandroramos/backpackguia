import React from 'react';
import styled from 'styled-components/native';


const InputArea = styled.View`
    width: 100%;
    height: 120px;
    background-color: #ffffff;
    flex-direction: row;
    border-radius: 20px;
    padding-left: 5px;
    margin-bottom: 5px;
    border: 1px solid #3D4140;
    align-items: flex-start;
`;
const InputAreaIcon = styled.View`
    margin-top: 10px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #000;
`;

export default ({IconSvg, placeholder, value, onChangeText, password}) => {
    return(
        <InputArea>
            <InputAreaIcon>
                <IconSvg  width="25" height="25" fill="#000" />
            </InputAreaIcon>
            <Input
                multiline ={true} 
                placeholder={placeholder}
                placeholderTextColor="#000"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
            />
        </InputArea>
    );
}
