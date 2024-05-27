import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, FlatList } from 'react-native'
import { useEffect } from 'react'
import { SearchInput, EmptyState, VideoCard } from '../../components'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
/**
 * useLocalSearchParams 是一个在 Expo Router 中使用的 Hook，用于获取当前组件的 URL 搜索参数。这个 Hook 只有在全局 URL 符合当前路由时更新。它可以帮助你在 React Native 应用程序中轻松地处理和获取 URL 中的查询参数。
 */

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className='flex my-6 px-4'>
              <Text className='font-pmedium text-gray-100 text-sm'>
                Search Results
              </Text>
              <Text className='text-2xl font-psemibold text-white mt-1'>
                {query}
              </Text>

              <View className='mt-6 mb-8'>
                <SearchInput
                  initialQuery={query}
                  refetch={refetch}
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No videos found for this search query'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search
