import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { useState } from 'react'
import { images } from '../../constants'
import { SearchInput, Trending, EmptyState, VideoCard } from '../../components'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestsPosts } = useAppwrite(getLatestPosts)

  const onRefresh = async () => {
    setRefreshing(true)
    // call back when new videos are fetched
    await refetch()
    setRefreshing(false)
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        // data={[]}
        // data={[{ id: '1' }, { id: '2' }, { id: '3' }]}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            key={item.$id}
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4 space-y-6'>
            <View className='flex justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome Back
                </Text>
                <Text className='text-2xl font-psemibold text-white'>
                  JSMastery
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-lg font-pregular text-gray-100 mb-3'>
                Latest Videos
              </Text>
              <Trending posts={latestsPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No videos created yet'
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home
