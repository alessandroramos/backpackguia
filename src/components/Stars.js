import React  from 'react';
import styled from 'styled-components/native';

import StarFull from '../assets/star.svg'
import StarHalf from '../assets/star_half.svg'
import StarEmpty from '../assets/star_empty.svg'


const StarArea = styled.View`
    flex-direction: row;
`;
const StarView = styled.View`
`;
const Startext = styled.Text`
    font-size: 14px;
    font-weight: bold;
    margin-left: 5px;
    color: #000;
`;

export default  ({ stars, showNuber }) =>{
    let estrela = [ 0, 0, 0, 0, 0];
    switch (stars) {
        case 0.5:
            estrela = [ 1, 0, 0, 0, 0];
            break;
        case 1:
            estrela = [ 2, 0, 0, 0, 0];
            break;                
        case 1.5:
            estrela = [ 2, 1, 0, 0, 0];
            break;
        case 2:
            estrela = [ 2, 2, 0, 0, 0];
            break;
        case 2.5:
            estrela = [ 2, 2, 1, 0, 0];
            break;
        case 3:
            estrela = [ 2, 2, 2, 0, 0];
            break;                
        case 3.5:
            estrela = [ 2, 2, 2, 1, 0];
            break;
        case 4:
            estrela = [ 2, 2, 2, 2, 0];
            break;                        
        case 4.5:
            estrela = [ 2, 2, 2, 2, 1];
            break;
        case 5:
            estrela = [ 2, 2, 2, 2, 2];
            break;
        default:    
            let estrela = [ 1, 0, 0, 0, 0];
    }
    let floor = Math.floor(stars);
    let left = stars - floor;
    for(var i=0;i<floor; i++){
        estrela[i] = 2;
    }
    if(left > 0 ){
        estrela[i] = 1
    }
    return(
        <StarArea>
            {estrela.map((i, k) => (
                <StarView key ={k}>
                    {i === 0 && <StarEmpty width="18" height="18" fill="#ff9200" />} 
                    {i === 1 && <StarHalf width="18" height="18" fill="#ff9200" />} 
                    {i === 2 && <StarFull width="18" height="18" fill="#ff9200" />} 
                </StarView>
            ))}
            {showNuber && <Startext>{stars}</Startext>}

        </StarArea>
    )
}