import React from 'react';
import styled from 'styled-components/native';


const InputArea = styled.View`
    width: 100%;
    height: 40px;
    background-color: #ffffff;
    flex-direction: row;
    border-radius: 20px;
    padding-left: 5px;
    align-items: center;
    margin-bottom: 5px;
    border: 1px solid #3D4140;
`;

const Input = styled.TextInput`
    flex: 1;
    height: 100%;
    font-size: 16px;
    color: #000;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password}) => {
    return(
        <InputArea>
            <IconSvg width="25" height="25" fill="#000" />
            <Input
                placeholder={placeholder}
                placeholderTextColor="#000"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
            />
        </InputArea>
    );
}
