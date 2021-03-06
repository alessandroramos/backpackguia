import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationInput = ( { onPress, value, onChangeText } ) => {  
    return (
        <GooglePlacesAutocomplete
            placeholder='Para onde você deseja o guia!'
            placeholderTextColor= "#fff"

            onPress = { onPress }

//            onPress={(data, details = null) => {
//        'details' is provided when fetchDetails = true
//                console.log(data, details);
//                setLocal(data);
//            }}
            query={{
                key: 'AIzaSyAlSxS6rrHBnX9uwHZ2uDit4lnmKiKhJ9c',
                language: 'pt',
            }}
            textInputProps = {{
                autoCapitalize: "none",
                autoCorrect: false,
                value: value,
                onChangeText:onChangeText
            }}
            fetchDetails
            enablePoweredByContainer={false}
        />
    );
};
export default LocationInput;