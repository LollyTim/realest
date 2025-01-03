import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'

interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
    <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
        <View className='flex flex-row items-center gap-3'>
            <Image source={icon} className='size-6' />
            <Text className={`tex-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
        </View>
        {showArrow && <Image source={icons.rightArrow} className='size-5' />}
    </TouchableOpacity>
)
const profile = () => {
    const handleLogout = async () => {
        const result = await logout()
        if (result) {
            Alert.alert("Success", "You have been logged out")
            refetch();
        } else {
            Alert.alert("Error", "An error occurred ehile logging put")
        }
    }
    const { user, refetch } = useGlobalContext();
    return (
        <SafeAreaView className='h-full bg-white'>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerClassName=' pb-32 px-7'>

                <View className='flex flex-row items-center justify-between mt-5'>
                    <Text className=' text-xl font-rubik-bold'>Profile</Text>
                    <Image className=' size-5' source={{ uri: user?.avartar }} />
                </View>

                <View className=' flex- flex-row justify-center mt-5'>
                    <View className=' flex flex-col items-center relative mt-5 '>
                        <Image source={images.avatar} className='size-44 relative rounded-full' />
                        <TouchableOpacity className=' absolute bottom-11 right-2' >
                            <Image source={icons.edit} className=' size-9' />
                        </TouchableOpacity>
                        <Text className=' text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
                    </View>
                </View>
                <View className='flex flex-col mt-10'>
                    <SettingsItem title='My Bookings' icon={icons.calendar} />
                    <SettingsItem title='Payments' icon={icons.wallet} />
                </View>
                <View className=' flex flex-col mt-5 border-t pt-5 border-primary-200'>
                    {settings.slice(2).map((set, index) => (
                        <SettingsItem key={index} {...set} />
                    ))}
                </View>
                <View className=' flex flex-col mt-5 border-t pt-5 border-primary-200'>
                    <SettingsItem icon={icons.logout} textStyle='text-danger' showArrow={false} title='Logout' onPress={handleLogout} />
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default profile