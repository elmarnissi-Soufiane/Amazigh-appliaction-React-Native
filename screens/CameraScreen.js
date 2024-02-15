import { View, Text , TextInput} from 'react-native'
import React from 'react'
import { SafeAreaView , TouchableOpacity , ScrollView} from 'react-native';
import {PlusIcon , CameraIcon , PhotoIcon , SpeakerWaveIcon}from "react-native-heroicons/outline";
import { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Letters from '../components/Letters';
import * as ImagePicker from 'expo-image-picker';
import {useState }from 'react'
import ImageViewer from '../components/ImageViewer';
import { ImageEditor } from "expo-image-editor";
import {
  cacheDirectory,
  writeAsStringAsync,
  EncodingType
} from 'expo-file-system';
import { Audio } from 'expo-av';
import { encode  } from 'base64-js';


const CameraScreen = () => {
    const PlaceholderImage = require('../assets/berber.png');
    const API_URL_OCR = 'http://192.168.1.102:5000/api/ocr'; /*192.168.1.171 */
    const API_URL_TTS = 'http://192.168.1.102:5000/api/tts';
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUri, setImageUri] = useState(undefined);
    const [editorVisible, setEditorVisible] = useState(false);
    const [convertedText, setConvertedText] = useState('');
    const [audioUri, setAudioUri] = useState(null);
    const [prevConvertedText, setPrevConvertedText] = useState(null);
    //const [audioLoading, setAudioLoading] = useState(false);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const fileReader = new FileReader();

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            //setSelectedImage(result.assets[0].uri);
            launchEditor(result.assets[0].uri);
            //setUri(result.assets[0].uri)
            //console.log(lasturi)
          } else {
            alert('You did not select any image.');
          }
        };

        const camera = async () => {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) {
                //setSelectedImage(result.assets[0].uri);
                launchEditor(result.assets[0].uri);
                //setUri(result.assets[0].uri)
              }
            };
        
        const launchEditor = (uri) => {
            // Then set the image uri
            setImageUri(uri);
            // And set the image editor to be visible
            setEditorVisible(true);
          };
        
          const handlePlayAudio = async () => {
            try {
              if (audioUri) {
                const { sound: audioSound } = await Audio.Sound.createAsync({ uri: audioUri });
                setSound(audioSound);
                await audioSound.playAsync();
                setIsPlaying(true);
              }
            } catch (error) {
              console.log('Error playing audio:', error);
            }
          };
        
          function transformText(inputText) {
            const mapping = {
              'ⴰ': 'a', 'ⴱ': 'b', 'ⵛ': 'c', 'ⴷ': 'd', 'ⴹ': 'ḍ', 'ⵄ': 'ɛ', 'ⴼ': 'f',
              'ⴳ': 'g', 'ⵖ': 'ɣ', 'ⵀ': 'h', 'ⵃ': 'ḥ', 'ⵊ': 'j', 'ⴽ': 'k', 'ⵍ': 'l',
              'ⵎ': 'm', 'ⵏ': 'n', 'ⵇ': 'q', 'ⵔ': 'r', 'ⵕ': 'ṛ', 'ⵙ': 's', 'ⵚ': 'ṣ',
              'ⵜ': 't', 'ⵟ': 'ṭ', 'ⵡ': 'w', 'ⵅ': 'x', 'ⵢ': 'y', 'ⵣ': 'z', 'ⵥ': 'ẓ',
              'ⴻ': 'e', 'ⵉ': 'i', 'ⵓ': 'u' , 'ⵯ':'w'
            };
          
            const transformedText = Array.from(inputText).map(char => mapping[char] || char).join('');
            return transformedText;
          }
        
          const removeNewlines = (text) => {
            return text.replace(/\n/g, ' '); // Replace all newline characters with a space
          };

        const TextToSpeech = async () => {
          try {

            if (audioUri && convertedText === prevConvertedText) {
              // If the conditions are met, play the previously generated audio
              handlePlayAudio();
              return;
            }
            
            const response = await fetch(`${API_URL_TTS}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: removeNewlines(transformText(convertedText)) }),
            });
            
            // Check if the response was successful
            if (response.ok) {
              const data = await response.json();
              const tmpFilename = `${cacheDirectory}speech.wav`;
              await writeAsStringAsync(tmpFilename, data.content, {
                encoding: EncodingType.Base64
              });
              const { sound } = await Audio.Sound.createAsync({ uri: tmpFilename });
              await sound.playAsync();
              setAudioUri(tmpFilename);
              setPrevConvertedText(convertedText);
              //const input = 'ⴰⴱⵛⴷⴹⵄⴼ ⴳⵖⵀⵃ ⵊ ⴽⵍⵎⵏⵇ ⵔ ⵕⵙⵚⵜ ⵟ ⵡⵅⵢ ⵣⵥⴻⵉⵓ';
              //const output = transformText(input);
              //console.log(output);
            } else {
              throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
          } catch (error) {
            console.error('Error sending text to API:', error);
          }
        }
        
          const convertToText = async () => {
            if (selectedImage) {
              console.log(selectedImage)
              const formData = new FormData();
              formData.append('image', {
                uri: selectedImage.replace('file://',''),
                name: 'image.jpg',
                type: 'image/jpg',
              });
        
              try {
                const response = await fetch(`${API_URL_OCR}`, {
                  method: 'POST',
                  body: formData,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
        
                if (response.ok) {
                  const data = await response.json();
                  setConvertedText(data.text);
                  console.log(data.text);
                } else {
                  console.log('Error:', response.error);
                }
              } catch (error) {
                console.log('Error:', error);
              }
            }
          };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : true,
            headerStyle: {
                backgroundColor: '#0497F2',
            },
            headerTitle: 'Image to Text',
            headerTitleStyle: {
            color: 'white',
            },
        });
    }, [])

  return (
    <SafeAreaView className='bg-white pt-5 ' style={{flex: 1}}>
        <View className='flex-row items-center mx-4 space-x-2 '>
            <ImageViewer
                placeholderImageSource={PlaceholderImage}
                selectedImage={selectedImage}
            />
        </View>
        
        <View className='flex-row items-center space-x-2 pb-2 mx-auto'>
            <TouchableOpacity className='bg-blue-400 p-4 rounded-xl' onPress={convertToText} >
                <Text className='text-white'>Convert to Text</Text>
            </TouchableOpacity>
            {convertedText !== '' && (
            <TouchableOpacity className='bg-blue-400 p-4 rounded-full' onPress={TextToSpeech} >
                <SpeakerWaveIcon size={18} color="white" />
            </TouchableOpacity>)}
        </View>
        <ScrollView className='flex-1'>
            <View className='flex-1 bg-gray-100 p-3 m-3 text-justify border-gray-300 border-b'>
                <Text className="text-gray-400 text-xl" selectable={true}>
                  {convertedText}
                </Text>
            </View>
        </ScrollView>
        <TouchableOpacity className='absolute bottom-6 right-6 bg-gray-500 rounded-full p-2' onPress={camera}>
            <CameraIcon size={40} color="white" ></CameraIcon>
        </TouchableOpacity>
        <TouchableOpacity className='absolute bottom-24 right-6 bg-gray-500 rounded-full p-2' onPress={pickImageAsync}>
            <PhotoIcon size={40} color="white" />
        </TouchableOpacity>
        <ImageEditor
        visible={editorVisible}
        onCloseEditor={() => setEditorVisible(false)}
        imageUri={imageUri}
        fixedCropAspectRatio={1 / 1}
        minimumCropDimensions={{
          width: 100,
          height: 100,
        }}
        onEditingComplete={(result) => {
            setSelectedImage(result.uri);
            //setUri(result.uri)
            console.log(result);
        }}
        mode="full"
      />
    </SafeAreaView>
  )
}

export default CameraScreen