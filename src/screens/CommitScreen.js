import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getByIdSelector, insertCollection} from '../states/reducers/db';
import Text from '../components/Text';
import Avatar from '../components/Avatar';
import Colors from '../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import getGithubCommits from '../services/getGithubCommits';
import {isEmpty, union} from 'lodash';
import styles from '../constants/styles';
import {authStateSelector} from '../states/reducers/auth';

const CommitSnippet = memo(({id}) => {
  const item = useSelector(state =>
    getByIdSelector(state, {model: 'commits', id}),
  );

  const commitMessage = useMemo(() => {
    return item.commit?.message?.substring?.(0, 60);
  }, [item.commit.message]);

  const commitDescription = useMemo(() => {
    return item.commit?.message
      ?.substring?.(60, 120)
      .replace(/(\r\n|\n|\r)/gm, ' ');
  }, [item.commit.message]);

  if (!item.commit || !item.committer || !item.author) {
    return null;
  }

  return (
    <View style={commitSnippetStyle.container}>
      <Text bold size={16} numberOfLines={1}>
        {commitMessage}
      </Text>
      {!!commitDescription && (
        <Text size={16} color={Colors.grey} numberOfLines={1}>
          ...{commitDescription}
        </Text>
      )}
      <View style={commitSnippetStyle.content}>
        <Avatar borderless={false} source={{uri: item.author?.avatar_url}} />
        <View style={commitSnippetStyle.contentExtra}>
          <Text size={14}>
            <Text bold>{item.author.login}</Text>{' '}
            <Text color={Colors.grey}>authored</Text>{' '}
            {item.author.login !== item.committer.login && (
              <>
                <Text color={Colors.grey}>and</Text>{' '}
                <Text bold>{item.committer.login}</Text>{' '}
                <Text color={Colors.grey}>committed</Text>
              </>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
});

const commitSnippetStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentExtra: {
    marginLeft: 5,
    flex: 1,
  },
});

const useInfiniteScroll = ({fetcher, query, model, modelKey}) => {
  const dispatch = useDispatch();
  const authState = useSelector(authStateSelector);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const callApi = useCallback(
    async currentPage => {
      if (isLastPage) {
        setIsLoading(false);
        setIsFetching(false);
        return;
      }
      const response = await fetcher?.({
        ...query,
        page: currentPage,
        perPage,
        token: authState.token,
      });

      if (isEmpty(response)) {
        setIsLastPage(true);
        setIsLoading(false);
        setIsFetching(false);
        return;
      }

      const newData = [];
      const mappedData = response.reduce((result, item) => {
        const key = item[modelKey];
        result[key] = item;
        newData.push(key);
        return result;
      }, {});

      //DB Update
      dispatch(
        insertCollection({
          model,
          data: mappedData,
        }),
      );

      //list state update
      setData(oldData => {
        if (currentPage === 1) {
          return newData;
        }
        return union(oldData, newData);
      });
      setIsLoading(false);
      setIsFetching(false);
    },
    [
      isLastPage,
      fetcher,
      query,
      perPage,
      authState.token,
      dispatch,
      model,
      modelKey,
    ],
  );

  const refresh = useCallback(() => {
    setIsLoading(true);
    setPage(1);
    setIsLastPage(false);

    callApi(1);
  }, [callApi]);

  const fetchMore = useCallback(() => {
    const nextPage = page + 1;
    setIsFetching(true);
    setPage(nextPage);

    callApi(nextPage);
  }, [callApi, page]);

  useEffect(() => {
    refresh();
  }, [perPage]);

  return {
    data,
    isLoading,
    isFetching,
    isLastPage,
    refresh,
    fetchMore,
    setPerPage,
  };
};

const CommitScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const repository = useSelector(state =>
    getByIdSelector(state, {model: 'repositories', id: route.params.repoId}),
  );

  const {data, isFetching, isLoading, refresh, isLastPage, fetchMore} =
    useInfiniteScroll({
      fetcher: getGithubCommits,
      query: {
        ownerSlug: repository.owner?.login,
        repoSlug: repository.name,
      },
      model: 'commits',
      modelKey: 'sha',
    });

  const renderItem = useCallback(({item}) => {
    return <CommitSnippet id={item} />;
  }, []);

  const renderSeparator = useCallback(
    () => <View style={commitStyle.separator} />,
    [],
  );

  useEffect(() => {
    navigation.setParams({
      title: `${repository.owner?.login}/${repository.name}`,
    });
  }, [repository]);

  if (isLoading && isEmpty(data)) {
    return (
      <View style={[styles.container, styles.middle]}>
        <ActivityIndicator color={Colors.blue} size={'large'} />
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        commitStyle.container,
        {paddingBottom: insets.bottom},
      ]}
      data={data}
      renderItem={renderItem}
      refreshing={isLoading}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
      ItemSeparatorComponent={renderSeparator}
      onEndReached={!isLoading && !isFetching ? fetchMore : null}
      ListFooterComponent={
        isFetching && !isLastPage && <ActivityIndicator color={Colors.blue} />
      }
    />
  );
};

const commitStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
    marginLeft: 15,
  },
});

export default CommitScreen;
