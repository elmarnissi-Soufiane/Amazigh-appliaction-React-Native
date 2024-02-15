import { View, Text ,SafeAreaView , ScrollView , TouchableOpacity}  from 'react-native'
import React , { useLayoutEffect , useState , useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { InformationCircleIcon ,ChevronRightIcon , ShareIcon , LightBulbIcon} from 'react-native-heroicons/outline'
const AboutScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : true,
            headerStyle: {
                backgroundColor: '#0497F2',
            },
            headerTitle: 'Me',
            headerTitleStyle: {
            color: 'white',
            },
        });
    }, [])
  return (
    <SafeAreaView className='bg-white flex-1'>
        <ScrollView>
            <View className='flex-row items-center space-x-2 pt-3 mx-4 mb-2'>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('Version')
                }} className='flex-row space-x-2 flex-1 bg-gray-50 p-3 rounded-xl items-center py-4'>
                    <InformationCircleIcon size={28}/>
                    <View className='flex-1'>
                    <Text className='ml-2 text-base'>About Me</Text>
                    </View>
                    <ChevronRightIcon/>
                </TouchableOpacity>
            </View>
            <View className='flex-row items-center space-x-2 pt-1 mx-4 mb-2'>
                <TouchableOpacity className='flex-row space-x-2 flex-1 bg-gray-50 p-3 rounded-xl items-center py-4'>
                    <ShareIcon size={28}/>
                    <View className='flex-1'>
                    <Text className='ml-2 text-base'>Share</Text>
                    </View>
                    <ChevronRightIcon/>
                </TouchableOpacity>
            </View>
            <View className='flex-row items-center space-x-2 pt-1 mx-4 mb-2'>
                <TouchableOpacity className='flex-row space-x-2 flex-1 bg-gray-50 p-3 rounded-xl items-center py-4'>
                    <LightBulbIcon size={28}/>
                    <View className='flex-1'>
                    <Text className='ml-2 text-base'>Feedback </Text>
                    </View>
                    <ChevronRightIcon/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AboutScreen