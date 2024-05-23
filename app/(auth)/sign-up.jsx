import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native'
import { Link, router } from 'expo-router'
import { useState, useContext } from 'react'
import { images } from '../../constants'
import { FormFiled, CustomButton } from '../../components'
import { createUser } from '../../lib/appwrite'
import { GlobalContext } from '../../context/globalContext'

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useContext(GlobalContext)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields')
    }
    setIsSubmitting(true)
    try {
      const result = await createUser(form.username, form.email, form.password)
      console.log(result, 'result---signUp')
      setUser(result)
      setIsLoggedIn(true)
      router.replace('/home')
    } catch (e) {
      Alert.alert('err--signUp', e.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View
          className='w-full flex justify-center h-full px-4 my-6'
          style={
            {
              // minHeight: Dimensions.get('window').height - 100,
            }
          }>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px]'
          />

          <Text className='text-2xl font-semibold text-white mt-10 font-psemibold'>
            Log in to Aora
          </Text>

          {/* 用户名 */}
          <FormFiled
            title='Username'
            value={form.username}
            otherStyles='mt-7'
            placeholder={'Enter your username'}
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />

          {/* 邮箱 */}
          <FormFiled
            title='Email'
            value={form.email}
            otherStyles='mt-7'
            placeholder={'Enter your email'}
            keyboardType='email-address'
            handleChangeText={(e) => setForm({ ...form, email: e })}
          />

          {/* 密码 */}
          <FormFiled
            title='Password'
            value={form.password}
            otherStyles='mt-7'
            placeholder={'Enter your password'}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />

          <CustomButton
            title='Sign Up'
            handlePress={submit}
            contentContainerStyles={'mt-7'}
            isLoading={isSubmitting}
          />

          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Already have an account?
            </Text>
            <Link
              href='/sign-in'
              className='text-lg font-psemibold text-secondary'>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
