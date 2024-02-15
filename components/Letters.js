import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import LetterCard from './LetterCard'

const Letters = () => {
    const images = 'https://khenifrajson.000webhostapp.com/images/';
    const audios = 'https://khenifrajson.000webhostapp.com/audio/';

    const letters = [
        { letter: 'ⴰ', pronunciation: 'ya', audioUrl: `${audios}bye.mp3` },
        { letter: 'ⴱ', pronunciation: 'yab', audioUrl: `${audios}audio2.mp3` },
        { letter: 'ⵛ', pronunciation: 'yach', audioUrl: `${audios}audio3.mp3` },
        { letter: 'ⴷ', pronunciation: 'yad', audioUrl: `${audios}audio4.mp3` },
        { letter: 'ⴹ', pronunciation: 'yadd', audioUrl: `${audios}audio5.mp3` },
        { letter: 'ⵄ', pronunciation: 'yae', audioUrl: `${audios}audio6.mp3` },
        { letter: 'ⴼ', pronunciation: 'yaf', audioUrl: `${audios}audio7.mp3` },
        { letter: 'ⴳ', pronunciation: 'yag', audioUrl: `${audios}audio8.mp3` },
        { letter: 'ⵖ', pronunciation: 'yagh', audioUrl: `${audios}audio9.mp3` },
        { letter: 'ⴳⵯ', pronunciation: 'yagw', audioUrl: `${audios}audio10.mp3` },
        { letter: 'ⵀ', pronunciation: 'yah', audioUrl: `${audios}audio11.mp3` },
        { letter: 'ⵃ', pronunciation: 'yahh', audioUrl: `${audios}audio12.mp3` },
        { letter: 'ⵊ', pronunciation: 'yaj', audioUrl: `${audios}audio13.mp3` },
        { letter: 'ⴽ', pronunciation: 'yak', audioUrl: `${audios}audio14.mp3` },
        { letter: 'ⴽⵯ', pronunciation: 'yakw', audioUrl: `${audios}audio15.mp3` },
        { letter: 'ⵍ', pronunciation: 'yal', audioUrl: `${audios}audio16.mp3` },
        { letter: 'ⵎ', pronunciation: 'yam', audioUrl: `${audios}audio17.mp3` },
        { letter: 'ⵏ', pronunciation: 'yan', audioUrl: `${audios}audio18.mp3` },
        { letter: 'ⵇ', pronunciation: 'yaq', audioUrl: `${audios}audio19.mp3` },
        { letter: 'ⵔ', pronunciation: 'yar', audioUrl: `${audios}audio20.mp3` },
        { letter: 'ⵕ', pronunciation: 'yarr', audioUrl: `${audios}audio21.mp3` },
        { letter: 'ⵙ', pronunciation: 'yas', audioUrl: `${audios}audio22.mp3` },
        { letter: 'ⵚ', pronunciation: 'yass', audioUrl: `${audios}audio23.mp3` },
        { letter: 'ⵜ', pronunciation: 'yat', audioUrl: `${audios}audio24.mp3` },
        { letter: 'ⵟ', pronunciation: 'yatt', audioUrl: `${audios}audio25.mp3` },
        { letter: 'ⵡ', pronunciation: 'yaw', audioUrl: `${audios}audio26.mp3` },
        { letter: 'ⵅ', pronunciation: 'yax', audioUrl: `${audios}audio27.mp3` },
        { letter: 'ⵢ', pronunciation: 'yay', audioUrl: `${audios}audio28.mp3` },
        { letter: 'ⵣ', pronunciation: 'yaz', audioUrl: `${audios}audio29.mp3` },
        { letter: 'ⵥ', pronunciation: 'yazz', audioUrl: `${audios}audio30.mp3` },
        { letter: 'ⴻ', pronunciation: 'yey', audioUrl: `${audios}audio31.mp3` },
        { letter: 'ⵉ', pronunciation: 'yi', audioUrl: `${audios}audio32.mp3` },
        { letter: 'ⵓ', pronunciation: 'yu', audioUrl: `${audios}audio33.mp3` },
      ];
      
      
  return (
    <ScrollView>
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
        {letters.map((letterObj, index) => (
          <LetterCard
            key={index}
            title={letterObj.letter}
            audioUrl={letterObj.audioUrl}
            pronunciation={letterObj.pronunciation}
          />
        ))}
    </View>
    </ScrollView>
  )
}

export default Letters