// import React from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   Button,
//   TouchableOpacity,
// } from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import {useCamera} from 'react-native-camera-hooks';
// import RNFS from 'react-native-fs';

// function Camera() {
//   const [{cameraRef}, {takePicture}] = useCamera(null);

//   const captureHandler = async () => {
//     try {
//       const data = await takePicture();
//       console.log(data.uri);
//       const filepath = data.uri;
//       const newFilePath = RNFS.ExternalDirectoryPath + '/src/assets/pill.jpg';
//       RNFS.moveFile(filepath, newFilePath)
//         .then(() => {
//           console.log('Image Moved', filepath, 'to', newFilePath);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View>
//       <RNCamera ref={cameraRef} type={RNCamera.Constants.Type.back}>
//         <Button title="Capture" onPress={() => captureHandler()} />
//       </RNCamera>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   preview: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
// export default Camera;
