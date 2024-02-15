import { View, Text , Image ,TextInput} from 'react-native'
import React from 'react'
import { useLayoutEffect , useState , useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import axios from 'axios';
import {MagnifyingGlassIcon,AdjustmentsHorizontalIcon}from "react-native-heroicons/outline";
import MotCard from '../components/MotCard';

const TraductionScreen = () => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const handleSearch = async (term) => {
        try {
          console.log('a')
          const response = await axios.get(`https://tal.ircam.ma/dglai/service/ssourceauto.php?term=${term}`);
          setResults(response.data.slice(0, 60)); // Assuming the API response provides an array of results -- 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    const handleTyping = (term) => {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
    
        setTypingTimeout(
          setTimeout(() => {
            handleSearch(term);
          }, 1200) // Delay of 2 seconds (2000 milliseconds)
        );
    };
    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            return;
          }
        handleTyping(searchTerm);
    }, [searchTerm]);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : true,
            headerStyle: {
                backgroundColor: '#0497F2',
            },
            headerTitle: 'Translation',
            headerTitleStyle: {
            color: 'white',
            },
        });
    }, [])
  return (
    <SafeAreaView className='bg-white pt-5 flex-1'>
      {/*Search*/}
      <View className='flex-row items-center space-x-2 py-2 mx-4 mb-2'>
            <View className='flex-row space-x-2 flex-1 bg-gray-200 p-3 rounded-xl'>
                <MagnifyingGlassIcon size={20} color="gray" />
                <View className = 'flex-1'>
                  <TextInput placeholder="ⴰⴱⵛⴷ [abcd]..." 
                  keyboardType="default"
                  autoCapitalize="none"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  />
                </View>
            </View>
            <AdjustmentsHorizontalIcon color="#00CCBB" />
        </View>
        <ScrollView>
            {results.map((result) => (
            <MotCard
            key={result.id}
            id={result.id}
            value={result.value}
            lexie={result.lexie}
            />
            ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default TraductionScreen