import { View, Text ,SafeAreaView , ScrollView , TouchableOpacity}  from 'react-native'
import React , { useLayoutEffect , useState , useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const VersionScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: 'white',
            headerShown : true,
              headerStyle: {
                  backgroundColor: '#0497F2',
              },
              headerTitle: 'Version',
              headerTitleStyle: {
              color: 'white',
              },
              
          });
      }, [])
  return (
    <View>
      <Text>VersionScreen</Text>
    </View>
  )
}

export default VersionScreen