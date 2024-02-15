import { View, Text , Image ,TextInput} from 'react-native'
import React  from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

const MotCard = ({id , value , lexie}) => {
    const navigation = useNavigation();
    const wordPattern = /(\[[^\]]+\])/;
    const meaningPattern = /\(([^)]+)\)/;

    const wordMatch = value.match(wordPattern);
    const meaningMatch = value.match(meaningPattern);

    const word = wordMatch ? wordMatch[0] : '';
    const meaning = meaningMatch ? meaningMatch[1] : '';
    //console.log(word)
    //console.log(meaning)
  return (
    <TouchableOpacity 
    onPress={() => {
        navigation.navigate('Detailed',{
            id
        })
    }}
    >
        <View className='py-2 mx-4 mb-2 bg-slate-200 rounded-xl'>
            <View className='flex-row space-x-2  px-3 pt-3 rounded-xl items-center'>
                <Text className = 'text-xl font-extrabold'>{lexie}</Text>
                <Text className ='text-black text-l'>{word}</Text>
            </View>
            <View className='flex-row space-x-2 flex-1  px-3 pb-3 rounded-xl items-center'>
                <Text className = 'text-x text-gray-500'>{meaning}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default MotCard