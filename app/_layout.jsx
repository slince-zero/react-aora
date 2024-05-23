import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { GlobalContextProvider } from '../context/globalContext'
// 阻止启动屏幕自动隐藏，直到我们调用 SplashScreen.hideAsync() 方法
SplashScreen.preventAutoHideAsync()
export default function RootLayout() {
  // 异步加载字体，fontsLoaded是否加载完成，error是否有错误
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  })

  useEffect(() => {
    if (error) throw error

    // 调用 SplashScreen.hideAsync() 方法隐藏启动屏幕
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null
  return (
    <>
      <GlobalContextProvider>
        <Stack>
          {/* 用于导航操作 */}
          <Stack.Screen
            name='index'
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='(auth)'
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='(tabs)'
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
          name='/search/[query]'
          options={{ headerShown: false }}
        /> */}
        </Stack>
      </GlobalContextProvider>
    </>
  )
}
