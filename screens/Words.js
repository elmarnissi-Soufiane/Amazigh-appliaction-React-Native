import { View, Text , TextInput ,Image , TouchableWithoutFeedback , Keyboard} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import {UserIcon,ChevronDownIcon,MagnifyingGlassIcon,AdjustmentsHorizontalIcon , ArrowPathRoundedSquareIcon}from "react-native-heroicons/outline";

const Words = () => {
    const navigation = useNavigation();
    const dismissKeyboard = () => {
        Keyboard.dismiss();
      };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : true,
            headerStyle: {
                backgroundColor: '#0497F2',
            },
            headerTitle: 'Translation Assistant',
            headerTitleStyle: {
            color: 'white',
            },
        });
    }, [])
  return (
    <SafeAreaView className='bg-white pt-5' style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View className='flex-row items-center space-x-2'>
        <View className='space-x-2 flex-1 bg-white p-3 h-48 text-justify border-gray-300 border-b'>
            <TextInput className="text-black text-xl" placeholder="Please Enter Text" 
                 multiline={true} textAlign='top'
            />
        </View>
    </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View className='flex-row items-center space-x-2 p-3 border-gray-300 border-b mx-auto'>
        <Image
            source={require('../assets/berber.png')}
            className='h-8 w-8 rounded-full  border-2' 
        />
        <Text className='text-xl mr-3' >Tifinagh</Text>
        <ArrowPathRoundedSquareIcon size={37} style={{marginRight : 16 }}></ArrowPathRoundedSquareIcon>
        <Image
            source={require('../assets/france.png')}
            className='h-8 w-8 rounded-full  border-2' 
        />
        <Text className='text-xl'>Francais</Text>
    </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View className='flex-row items-center space-x-2'>
        <View className='space-x-2 flex-1 bg-gray-100 p-3 h-40 text-justify border-gray-300 border-b'>
            <Text className="text-gray-400 text-xl" defaultValue="Default Text"
                keyboardType="default" selectable={true} 
            >
                Comming soon ...
            </Text>
        </View>
    </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default Words