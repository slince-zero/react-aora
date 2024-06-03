import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FormFiled, CustomButton } from '../../components'
import { useState } from 'react'
import { Video } from 'expo-av'
import { router } from 'expo-router'
import * as DocumentPicker from 'expo-document-picker'
import { icons } from '../../constants'
import { createVideoPost } from '../../lib/appwrite'
const Create = () => {
  const [upLoading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: '',
    thumbnail: '',
    prompt: '',
  })

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === 'image'
          ? ['image/png', 'image/jpg', 'image/jpeg']
          : ['video/mp4', 'video/gif'],
    })

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        })
      }

      if (selectType === 'video') {
        setForm({
          ...form,
          video: result.assets[0],
        })
      }
    } else {
      setTimeout(() => {
        Alert.alert('document picked', JSON.stringify(result, null, 2))
      })
    }
  }

  const submit = async () => {
    if (
      (form.prompt === '') |
      (form.title === '') |
      !form.thumbnail |
      !form.video
    ) {
      return Alert.alert('Please provide all fields')
    }
    setUploading(true)
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      })

      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      })

      setUploading(false)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-white text-2xl font-pmedium'>Upload Video</Text>

        <FormFiled
          title='Video Title'
          value={form.title}
          placeholder='Give your video a catchy title...'
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />

        <View className='my-7 space-y-2'>
          <Text className='text-base text-gray-100'>upload video</Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    alt='upload'
                    className='w-1/2 h-1/2'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className='my-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            {/* 缩略图 */}
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{
                  uri: form.thumbnail,
                }}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) : (
              <View className='w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2'>
                <Image
                  source={icons.upload}
                  resizeMode='contain'
                  alt='upload'
                  className='w-5 h-5'
                />
                <Text className='text-sm text-gray-100 font-pmedium'>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormFiled
          title='AI Prompt'
          value={form.prompt}
          placeholder='The AI prompt of your video....'
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-7'
        />
        <CustomButton
          title='Submit & Publish'
          handlePress={submit}
          isLoading={upLoading}
          contentContainerStyles='mt-7'
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
