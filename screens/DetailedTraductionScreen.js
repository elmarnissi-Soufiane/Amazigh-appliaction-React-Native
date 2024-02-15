import { View, Text , ActivityIndicator} from 'react-native'
import React from 'react'
import { SafeAreaView , TouchableOpacity} from 'react-native';
import { useLayoutEffect , useState , useEffect} from 'react'
import { useRoute , useNavigation} from '@react-navigation/native'
import axios from 'axios'
import {
  cacheDirectory,
  writeAsStringAsync,
  EncodingType
} from 'expo-file-system';
import { Audio } from 'expo-av';

const DetailedTraductionScreen = () => {
    const [resultsClasses, setResultsClasses] = useState([]);
    const [resultsLexie, setResultsLexie] = useState([]);
    const [resultsVariante, setResultsVariante] = useState([]);
    const [resultsDeclination, setResultsDeclination] = useState([]);
    const [resultsTraduction, setResultsTraduction] = useState([]);
    const [resultsConjugaison, setResultsConjugaison] = useState([]);
    const [resultsExpression, setResultsExpression] = useState([]);
    //const [SClasse, setSClasse] = useState('');
    const [sound, setSound] = useState(null);
    const [isLoading , setIsLoading] = useState(true)
    const [error , setError] = useState()
    const [audioUri, setAudioUri] = useState(null);
    const API_URL_TTS = 'http://192.168.1.102:5000/api/tts';
  
    const navigation = useNavigation();
    const {
        params :{
            id ,
        }
    } = useRoute();

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

    const TTS = async () => {
      try {

        if (audioUri) {
          // If the conditions are met, play the previously generated audio
          handlePlayAudio();
          return;
        }
        
        const response = await fetch(`${API_URL_TTS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: transformText(resultsLexie.llexie) }),
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
        } else {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error sending text to API:', error);
      }
    }

    const getContent = () =>{
      if (isLoading){
        return <ActivityIndicator className='content-center flex-1' />;
      }
      if (error){
        return <Text>{error}</Text>
      }
      return (<View className='py-2 mx-4 my-2 bg-slate-200 rounded-xl shadow-md'>
      <TouchableOpacity onPress={TTS} className='pt-2 mx-4 my-2 bg-slate-300 rounded-xl'>
          <View className='flex-row mx-3  space-x-2  items-center '>
              <Text className = 'text-lg'>{resultsLexie.llexie}</Text>
              <Text className ='text-black text-lg'>{resultsLexie.lapi} </Text>
              <Text className = 'text-lg'>
                {resultsVariante.map((result, index) => (
                  <React.Fragment key={result.dvariante}>
                    {index > 0 && ','}
                    {result.dvariante}
                  </React.Fragment>
                ))}
              </Text>
          </View>
          <View className='flex-row mx-3 mb-2 space-x-2 items-center '>
            <Text className = 'text-base'>
              {resultsClasses.map((result, index) => (
                <React.Fragment key={`class-${index}`}>
                  {index > 0 && ' et '}
                  {result.classe}
                </React.Fragment>
              ))}
            </Text>
            <Text className = 'text-base'>
              {resultsClasses.map((result, index) => (
                <React.Fragment key={`sclass-${index}`}>
                  {index > 0 && ''}
                  {result.sclasse.replace(/;/g," ")}
                </React.Fragment>
              ))}
            </Text>
          </View>
        </TouchableOpacity>
        
        <View className='pt-2 mx-4 my-2 bg-slate-200 rounded-xl'>

          {resultsConjugaison ? (
          <View className='flex-col mx-3 mb-2 items-cente '>
            {resultsConjugaison && resultsConjugaison.laccompli ? (<Text className ='text-black text-base font-semibold'>Accompli : {resultsConjugaison.laccompli} </Text>) : null}
            {resultsConjugaison && resultsConjugaison.laccompli_neg ? (<Text className ='text-black text-base font-semibold'>Accompli négatif : {resultsConjugaison.laccompli_neg} </Text>) : null}
            {resultsConjugaison && resultsConjugaison.linaccompli ? (<Text className ='text-black text-base font-semibold'>Inaccompli : {resultsConjugaison.linaccompli} </Text>) : null}
          </View>
          ) : null}
          
          {resultsDeclination && resultsDeclination.lea ? (
          <View className='flex-row mx-3 space-x-2  items-cente '>
            <Text className ='text-black text-base font-semibold'>Etat d'annexion : {resultsDeclination.lea} </Text>
          </View>
          ) : null}
          {resultsDeclination && resultsDeclination.lpl ? (
          <View className='flex-row mx-3 mb-2 space-x-2 items-center '>
            <Text className ='text-black text-base font-semibold'>Pluriel : {resultsDeclination.lpl} </Text>
          </View>
          ) : null}
          {resultsTraduction[0] ? (
          <View className='flex-row mx-3  space-x-2 items-center '>
            <Text className ='text-blue-800 font-extrabold text-lg'>Sens</Text>
          </View>
          ) : null}
          {resultsTraduction ? (
          <View className='flex-col mx-6 mb-2 items-start'>
            {resultsTraduction.map((result, index) => (
                <React.Fragment key={`traduction-${index}`}>
                  <Text className ='text-base font-semibold'>{result.fr.substring(3).replace(/9/g, "'")}</Text>
                  <Text className ='text-base font-semibold mb-3'>{result.ar.substring(3)}</Text>
                </React.Fragment>
              ))}
          </View>
          ) : null}
          {resultsExpression[0] ? (
          <React.Fragment >
            <View className='flex-col mx-3 mb-2 items-cente' >
              <Text className ='text-blue-800 font-extrabold text-lg'>Emploi</Text>
              {resultsExpression.map((result, index) => (
                <React.Fragment key={`expression-${index}`}>
                  <Text className ='text-base font-semibold ml-3'>{result.llib_exp}</Text>
                  <Text className ='text-base font-semibold ml-7'>{result.lexpfr}</Text>
                  <Text className ='text-base font-semibold mb-3 ml-7'>{result.lexpar}</Text>
                </React.Fragment>
              ))}
            </View>
          </React.Fragment>
          ) : null}
        </View>
      </View>)
    }

    const handleSearch = async (term) => {
      try {
        const resClasse = await axios.get(`https://tal.ircam.ma/dglai/service/classegs.php?lexie=${term}`);
        const resLexie = await axios.get(`https://tal.ircam.ma/dglai/service/lexie.php?lexie=${term}`);
        const resVariante = await axios.get(`https://tal.ircam.ma/dglai/service/variante.php?lexie=${term}`);
        const resDeclination = await axios.get(`https://tal.ircam.ma/dglai/service/declinison.php?lexie=${term}`);
        const resTraduction = await axios.get(`https://tal.ircam.ma/dglai/service/traduction.php?lexie=${term}`);
        const resConjugaison = await axios.get(`https://tal.ircam.ma/dglai/service/conjugaison.php?lexie=${term}`);
        const resExpression = await axios.get(`https://tal.ircam.ma/dglai/service/expression.php?lexie=${term}`);

        setResultsClasses(resClasse.data.lexie);
        setResultsLexie(resLexie.data.lexie[0]);
        setResultsVariante(resVariante.data.variantes)
        setResultsDeclination(resDeclination.data.declinison[0]);
        setResultsTraduction(resTraduction.data.lexie)
        setResultsConjugaison(resConjugaison.data.conjugaison[0])
        setResultsExpression(resExpression.data.expression)
        //setSClasse("["+resultsLexie.lapi+"]")
        //setSClasse(resultsClasses[0].sclasse.replace(/;/g," "))
        //console.log()
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error)
        setIsLoading(false);
      }
    };
    
    useLayoutEffect(() => {
      navigation.setOptions({
          headerTintColor: 'white',
          headerShown : true,
            headerStyle: {
                backgroundColor: '#0497F2',
            },
            headerTitle: 'Detail',
            headerTitleStyle: {
            color: 'white',
            },
            
        });
    }, [])

    

    useEffect(() =>{
      handleSearch(id)
    },[])
  return (
    <SafeAreaView className='bg-white flex-1'>
      {getContent()}
    </SafeAreaView>
  )
}

export default DetailedTraductionScreen