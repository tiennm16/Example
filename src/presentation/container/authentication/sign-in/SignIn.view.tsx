import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { TextView, FullScreenLoadingIndicator, RoundedButton, PrimaryBackground, TextField, FlatButton } from '@components';
import { useSignIn, socialAction } from './SignIn.hooks';
import { SignInProps } from './types';
import { StyleSheet, View, Image } from 'react-native';
import { ICON_EMAIL, ICON_LOCK, ICON_EYE, ICON_FACEBOOK, ICON_GOOGLE, ICON_TWITTER } from '@assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Colors } from '@resources';
import Ripple from 'react-native-material-ripple';

const _SignIn: React.FC<SignInProps> = (props) => {
  const { } = props;
  const onSignInFailed = React.useCallback(() => {
    console.warn('Success');
  }, []);
  const { isAuthenticating, submit, loginSocial } = useSignIn({ onSignInFailed });
  return (
    <PrimaryBackground>
      <SafeAreaView style={{ paddingHorizontal: 40, flex: 1 }}>
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
          <FullScreenLoadingIndicator visible={isAuthenticating} />
          <TextView text="SIGN IN" style={styles.titleText} />
          <TextField prefixIcon={ICON_EMAIL}
            // errorLabel="Lỗi"
            containerStyle={{
              marginBottom: 30,
            }}
            inputProps={{
              style: {
                color: Colors.WHITE,
                fontSize: 16,
              },
              placeholder: "Email",
              placeholderTextColor: "#dedede"
            }} />
          <TextField
            prefixIcon={ICON_LOCK}
            // errorLabel="Lỗi"
            containerStyle={{
              paddingBottom: 5
            }}
            inputProps={{
              secureTextEntry: true,
              style: {
                color: Colors.WHITE,
                fontSize: 16,
              },
              placeholder: "Password",
              placeholderTextColor: "#dedede"
            }} />
          <FlatButton title="SIGN IN" titleStyle={styles.btn} containerStyle={styles.btnContainer} onPress={submit} />
          {renderSocialAuthen()}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </PrimaryBackground>
  );
};


function renderSocialAuthen() {
  const { loginSocial } = socialAction();
  return (
    <View>
      {/* Title */}
      <View style={styles.socialTitle}>
        <View style={styles.indicator} />
        <View style={{ width: "40%", alignItems: 'center' }} >
          <TextView text='Or connect with' style={{ color: Colors.WHITE }} />
        </View>
        <View style={styles.indicator} />
      </View>
      {/* Button */}
      <View style={styles.socialBtn}>
        <Ripple style={{ borderRadius: 50, overflow: 'hidden' }} onPress={loginSocial}>
          <Image source={ICON_FACEBOOK} />
        </Ripple>
        <Ripple style={{ marginHorizontal: 12, borderRadius: 50, overflow: 'hidden' }} onPress={loginSocial}>
          <Image source={ICON_GOOGLE} style={{}} />
        </Ripple>
        <Ripple style={{ borderRadius: 50, overflow: 'hidden' }} onPress={loginSocial}>
          <Image source={ICON_TWITTER} />
        </Ripple>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  titleText: {
    alignSelf: 'center',
    color: Colors.WHITE,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 65,
  },
  btn: {
    fontSize: 16,
    fontWeight: "700",
  },
  btnContainer: {
    backgroundColor: Colors.WHITE,
    marginTop: 40
  },
  indicator: {
    width: "25%",
    backgroundColor: Colors.WHITE,
    height: 1
  },
  socialTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 100
  },
  socialBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
})


export const SignIn = React.memo(_SignIn);
