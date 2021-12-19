import React, {useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
} from 'react-native';
import Text from '../components/Text';
import styles from '../constants/styles';
import Colors from '../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import {ItemType} from 'react-native-dropdown-picker';
import checkGithubUsername from '../services/checkGithubUsername';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import useBackdropBS from '../hooks/useBackdropBS';
import Divider from '../components/Divider';
import authenticateGithub from '../services/authenticateGithub';
import {useDispatch} from 'react-redux';
import {login} from '../states/reducers/auth';
import {insertModel} from '../states/reducers/db';

const GIT_PROVIDERS: Array<ItemType> = [
  {label: 'GitHub', value: 'github'},
  {label: 'GitLab', value: 'gitlab', disabled: true},
  {label: 'Bitbucket', value: 'bitbucket', disabled: true},
  {label: 'GCP', value: 'gcp', disabled: true},
  {label: 'Phabricator', value: 'phabricator', disabled: true},
  {label: 'RhodeCode', value: 'rhodecode', disabled: true},
];

const openHowToCreatePersonalTokenPress = () =>
  Linking.openURL(
    'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token',
  );

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [provider, setProvider] = useState('github');
  const [username, setUsername] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [checkIsLoading, setCheckIsLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [authenticateIsLoading, setAuthenticateIsLoading] = useState(false);

  const passwordFormBS = useRef(null);
  const {renderBackdrop} = useBackdropBS();

  const onUsernameChange = useCallback(text => {
    setUsernameError(null);
    setUsername(text);
  }, []);

  const onPasswordChange = useCallback(text => {
    setPasswordError(null);
    setPassword(text);
  }, []);

  const onCheckPress = useCallback(async () => {
    switch (provider) {
      case 'github':
        setCheckIsLoading(true);
        const response = await checkGithubUsername(username);
        if (!response.id) {
          setUsernameError(response.message);
        } else {
          passwordFormBS.current.present();
        }
        setCheckIsLoading(false);
        break;
      default:
        break;
    }
  }, [provider, username]);

  const onAuthenticatePress = useCallback(async () => {
    switch (provider) {
      case 'github':
        setAuthenticateIsLoading(true);
        const response = await authenticateGithub(username, password);
        if (!response.id) {
          setPasswordError(response.message);
        } else {
          dispatch(
            insertModel({model: 'users', id: response.id, data: response}),
          );
          dispatch(login({username, token: response.token, id: response.id}));
        }
        setAuthenticateIsLoading(false);
        break;
      default:
        break;
    }
  }, [dispatch, password, provider, username]);

  return (
    <>
      <View
        style={[
          styles.container,
          styles.containerWhite,
          {paddingTop: insets.top, paddingBottom: insets.bottom},
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={loginStyle.container}>
          <View style={loginStyle.headerContainer}>
            <Text bold size={42}>
              Let's sign you in.
            </Text>
            <Text size={34}>Welcome back.</Text>
            <Text size={34}>You've been missed!</Text>
          </View>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            bounces={false}
            contentContainerStyle={loginStyle.formContainer}>
            <Dropdown
              width={120}
              setValue={setProvider}
              value={provider}
              items={GIT_PROVIDERS}
              disabled={checkIsLoading}
            />
            <TextInput
              editable={!checkIsLoading}
              onChangeText={onUsernameChange}
              autoCapitalize={'none'}
              placeholder={`${provider} username`}
              errorMessage={usernameError}
            />
          </ScrollView>
          <View style={loginStyle.footerContainer}>
            <Button
              onPress={onCheckPress}
              disabled={!username || usernameError || checkIsLoading}
              isLoading={checkIsLoading}
              label={'Submit'}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
          enablePanDownToClose={false}
          backdropComponent={renderBackdrop}
          ref={passwordFormBS}
          style={loginStyle.bsPasswordContainer}
          keyboardBlurBehavior={'restore'}
          snapPoints={[400]}>
          <View style={loginStyle.bsPasswordContentContainer}>
            <View>
              <Text bold size={42}>
                Hi, {username}
              </Text>
              <Text size={18}>
                Password authentication has been discontinued, use Personal
                Token instead.
              </Text>
              <Text
                color={Colors.blue}
                onPress={openHowToCreatePersonalTokenPress}>
                How to generate Personal Token?
              </Text>
            </View>
            <View>
              <TextInput
                editable={!authenticateIsLoading}
                onChangeText={onPasswordChange}
                secureTextEntry
                placeholder={'Personal Token'}
                errorMessage={passwordError}
              />
              <Divider height={30} />
              <Button
                style={{marginBottom: insets.bottom + 15}}
                onPress={onAuthenticatePress}
                disabled={!password || passwordError || authenticateIsLoading}
                isLoading={authenticateIsLoading}
                label={'Login'}
              />
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  headerContainer: {
    marginTop: 15,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  footerContainer: {
    marginVertical: 15,
  },
  bsPasswordContainer: {
    paddingHorizontal: 15,
  },
  bsPasswordContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default LoginScreen;
