import { View, Text, Image } from 'react-native'
import { images } from '../constants'

const EmptyState = () => {
  return (
    <View className='flex justify-center items-center px-4'>
      
      <Image
        source={images.empty}
        resizeMode='contain'
        className='w-[270px] h-[216px]'
      />
    </View>
  )
}

export default EmptyState
