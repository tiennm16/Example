import { Alert } from "react-native";
import React from 'react';


export function socialAction() {
    const loginSocial = () => {
        Alert.alert("This feature is on development!")
    }
    return { loginSocial };
}