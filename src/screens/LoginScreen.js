import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Text from '../components/Text';
import styles from '../constants/styles';
import Colors from '../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import {ItemType} from 'react-native-dropdown-picker';

const GIT_PROVIDERS: Array<ItemType> = [
  {label: 'GitHub', value: 'github'},
  {label: 'GitLab', value: 'gitlab', disabled: true},
  {label: 'Bitbucket', value: 'bitbucket', disabled: true},
  {label: 'GCP', value: 'gcp', disabled: true},
  {label: 'Phabricator', value: 'phabricator', disabled: true},
  {label: 'RhodeCode', value: 'rhodecode', disabled: true},
];

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const [provider, setProvider] = useState('github');
  const [username, setUsername] = useState(null);

  const onUsernameChange = useCallback(text => {
    setUsername(text);
  }, []);

  return (
    <View
      style={[
        styles.container,
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
          />
          <TextInput
            onChangeText={onUsernameChange}
            autoCapitalize={'none'}
            placeholder={'username'}
          />
        </ScrollView>
        <View style={loginStyle.footerContainer}>
          <Button label={'Submit'} />
        </View>
      </KeyboardAvoidingView>
    </View>
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
    marginBottom: 15,
  },
});

export default LoginScreen;
