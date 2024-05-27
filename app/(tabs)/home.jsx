import { SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from 'react-native'
import { useState, useEffect } from 'react'
import { images } from '../../constants'
import { SearchInput, Trending, EmptyState } from '../../components'
import { getAllPosts } from '../../lib/appwrite'
const Home = () => {
  const [refreshing, setRefreshing] = useState(false)

  // videos data
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      try {
        const videos = await getAllPosts()
        setData(videos)
      } catch (e) {
        Alert.alert('Error', e.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [])

  console.log(data, 'data')
  const onRefresh = () => {
    setRefreshing(true)
    // call back when new videos are fetched
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        // data={[]}
        data={[{ id: '1' }, { id: '2' }, { id: '3' }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className='text-2xl text-white'>{item.id}</Text>
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
              <Trending />
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
