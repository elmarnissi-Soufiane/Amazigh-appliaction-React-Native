import { View, Text , Image ,TextInput} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {UserIcon,ChevronDownIcon,MagnifyingGlassIcon,AdjustmentsHorizontalIcon}from "react-native-heroicons/outline";
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import Letters from '../components/Letters';

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : true,
            headerStyle: {
                backgroundColor: '#0497F2',
            },
            headerTitle: 'Letters',
            headerTitleStyle: {
            color: 'white',
            },
        });
    }, [])
  return (
    <SafeAreaView className='bg-white pt-5' style={{flex: 1}}>
        {/*Header
        <View className='flex-row pb-3 items-center mx-4 space-x-2 '>
            <Image
                source={{
                    uri:'https://khenifrajson.000webhostapp.com/images/user2.png'
                }}
                className='h-7 w-7 bg-gray-300 p-4 rounded-full'
            />
            <View className='flex-1'>
                <Text className='font-bold text-xl'>Anass Salhi
                    <ChevronDownIcon size={20} color="#00CCBB" />
                </Text>
            </View>

            <UserIcon size={35} color="#00CCBB" />
        </View>*/}
        {/*Search
        <View className='flex-row items-center space-x-2 pb-2 mx-4'>
            <View className='flex-row space-x-2 flex-1 bg-gray-200 p-3'>
            <MagnifyingGlassIcon size={20} color="gray" />
                <TextInput placeholder="Lettre Tifinagh" 
                keyboardType="default"
                />
            </View>
            <AdjustmentsHorizontalIcon color="#00CCBB" />
        </View>*/}
        {/*Content*/}
        <ScrollView
            contentContainerStyle={{
                paddingBottom : 15,
            }}
            showsHorizontalScrollIndicator={false}
            >
            <Letters/>
            
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen