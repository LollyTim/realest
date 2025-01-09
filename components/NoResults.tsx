import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoResults = () => {
    return (
        <View className=' flex items-center my-4'>
            <Image source={images.noResult} className=' w-11/12 h-80' resizeMode='contain' />
            <Text className='font-rubik-bold text-black-300 text-2xl text-center'>No results found.</Text>
            <Text className=' text-base text-black-100'>We could not find any results</Text>
        </View>
    )
}

export default NoResults