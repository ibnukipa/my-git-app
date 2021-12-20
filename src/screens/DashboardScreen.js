import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import styles from '../constants/styles';
import SearchInput from '../components/SearchInput';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import getGithubRepo from '../services/getGithubRepo';
import Text from '../components/Text';
import Colors from '../constants/colors';
import {insertModel} from '../states/reducers/db';
import { useDispatch, useSelector } from "react-redux";
import { authStateSelector } from "../states/reducers/auth";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const authState = useSelector(authStateSelector);
  const [repoPath, setRepoPath] = useState('facebook/react-native');
  const [repoPathIsLoading, setRepoPathIsLoading] = useState(false);
  const [repoPathError, setRepoPathError] = useState(false);
  const [repoPathErrorMsg, setRepoPathErrorMsg] = useState(null);

  const onChangeRepoPath = useCallback(text => {
    const [repoOwner, repoSlug] = text.trim().split('/');

    if (!repoOwner || !repoSlug) {
      setRepoPathError(true);
    } else {
      setRepoPathError(false);
    }

    setRepoPathErrorMsg(null);
    setRepoPath(text);
  }, []);

  const searchPress = useCallback(async () => {
    setRepoPathIsLoading(true);
    const [repoOwner, repoSlug] = repoPath.trim().split('/');

    const response = await getGithubRepo({ repoOwner, repoSlug, token: authState.token });

    setRepoPathIsLoading(false);

    if (!response.id) {
      setRepoPathErrorMsg(response.message);
    } else {
      dispatch(
        insertModel({model: 'repositories', id: response.id, data: response}),
      );
      navigation.navigate('Commit', {repoId: response.id});
    }
  }, [dispatch, navigation, repoPath]);

  return (
    <View style={[styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={dashboardStyle.container}>
        <SearchInput
          onChangeText={onChangeRepoPath}
          autoFocus={false}
          value={repoPath}
          placeholder={'Search'}
          autoCapitalize={'none'}
        />
        <Button
          disabled={repoPathError}
          onPress={searchPress}
          compact
          label={'Search'}
          isLoading={repoPathIsLoading}
        />
        <View>
          {repoPathErrorMsg && (
            <View style={dashboardStyle.errorMessage}>
              <Text color={Colors.red}>{repoPathErrorMsg}</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const dashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  errorMessage: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 15,
    top: 0,
  },
});

export default DashboardScreen;
