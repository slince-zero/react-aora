import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, contentContainerStyles, isLoading }) => {
  return (
    // 可触摸组件，当用户点击时会有一些视觉反馈
    // 确定触摸激活时所包裹视图的不透明度应为多少
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${contentContainerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}>

      <Text className='text-primary font-psemibold  text-lg'>{title}</Text>


    </TouchableOpacity>
  )
}

export default CustomButton
