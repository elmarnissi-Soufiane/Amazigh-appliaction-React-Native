import { View, Text , Image } from 'react-native'
import React ,{useState , useEffect}from 'react'
import { TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av';

const LetterCard = ({ title , audioUrl , pronunciation}) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const colors = ['#FE9391', '#78C7C7', '#757EFD', '#F8A971'];

  const handlePlayAudio = async () => {
    try {
      const { sound: audioSound } = await Audio.Sound.createAsync({ uri : audioUrl });
      setSound(audioSound);
      await audioSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

    const [bgColor, setBgColor] = useState(getRandomColor());

    React.useEffect(() => {
        setBgColor(getRandomColor());
      }, []);

    React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  
    
  return (
    <TouchableOpacity onPress={handlePlayAudio} className="relative mx-auto my-3 px-3 " >
        <View
            className='w-24 items-center rounded-tl-3xl bg-purple-950 rounded-tr-3xl m-auto'
        >
            <Text className='text-center text-white font-bold pb-2 text-2xl'>{pronunciation}</Text>
        </View>
        <View
        className='w-24 rounded-br-3xl rounded-bl-3xl m-auto' style={{ backgroundColor: bgColor }}
        >
          <Text className='top-5 text-center text-white font-bold pb-2 text-5xl mb-5'>{title}</Text>
        </View>
      
    </TouchableOpacity>
  )
}

export default LetterCard