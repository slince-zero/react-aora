import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native'
import { Link, router } from 'expo-router'
import { images } from '../../constants'
import { FormFiled, CustomButton } from '../../components'
import { useState, useContext } from 'react'
import { loginUser } from '../../lib/appwrite'
import { GlobalContext } from '../../context/globalContext'
const SignIn = () => {
  const { setUser, setIsLoggedIn } = useContext(GlobalContext)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields')
    }
    setIsSubmitting(true)
    try {
      const result = await loginUser(form.email, form.password)
      console.log(result, 'result--signIn')
      setUser(result)
      setIsLoggedIn(true)
      Alert.alert("Success", "User signed in successfully");
      router.replace('/home')
    } catch (e) {
      Alert.alert('err--signIn', e.message)
    } finally{
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

          {/* 邮箱 */}
          {/* keyboardType 属性用于指定输入类型，这会影响虚拟键盘的布局。 */}
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
            title='Sign In'
            handlePress={submit}
            contentContainerStyles={'mt-7'}
            isLoading={isSubmitting}
          />

          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link
              href='/sign-up'
              className='text-lg font-psemibold text-secondary'>
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
