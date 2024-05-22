import { StatusBar } from 'expo-status-bar'
import { Text, View, ScrollView, Image } from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants'
import CustomButton from '../components/CustomButton'
export default function App() {
  return (
    <>
      {/* 是一个视图容器，它会自动调整自身的布局，以确保其子组件不会被设备的物理特性（如刘海、圆角、状态栏等）遮挡。这个组件通常用于 iOS 设备，但也可以在 Android 上使用 */}
      <SafeAreaView className='bg-primary h-full'>
        {/* 是一个可以滚动的容器组件，用于显示超过屏幕可视区域的内容。它可以包含多个子组件，并允许用户通过滑动来查看所有内容 */}
        <ScrollView
          contentContainerStyle={{
            height: '100%',
          }}>
          <View className='w-full flex justify-center items-center min-h-[85px] px-4'>
            <Image
              source={images.logo}
              className='w-[130px] h-[84px]'
              resizeMode='contain'
            />
            <Image
              source={images.cards}
              className='max-w-[380px] w-full h-[298px]'
              resizeMode='contain'
            />

            <View className='relative mt-5'>
              <Text className='text-3xl text-white font-bold text-center'>
                Discover Endless{'\n'}
                Possibilities with{' '}
                <Text className='text-secondary-200'>Aora</Text>
              </Text>

              <Image
                source={images.path}
                className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
                resizeMode='contain'
              />
            </View>

            <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora
            </Text>
            <CustomButton
              title='Continue with Email'
              handlePress={() => router.push('/sign-in')}
              contentContainerStyles='w-full mt-7'
            />
          </View>
        </ScrollView>
        <StatusBar style='light' />
      </SafeAreaView>
    </>
  )
}
