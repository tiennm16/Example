import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeProps } from './types';


export const Home: React.FC<HomeProps> = (props) => {
    return <View style={StyleSheet.flatten([styles.container])}>

    </View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
});
