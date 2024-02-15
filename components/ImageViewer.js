import { StyleSheet, Image , View} from 'react-native';

export default function ImageViewer({ placeholderImageSource , selectedImage}) {
    const imageSource = selectedImage !== null 
    ? { uri: selectedImage }
    : placeholderImageSource;
  return (
    <View className='relative items-center flex-1'>
        <Image source={imageSource} className='h-80 w-72 m-7 rounded-3xl resi border-2' resizeMode='contain'/>
    </View>
  );
}