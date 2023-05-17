import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = () => {
  const cameraRef = useRef(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      const face = faces[0];
      const { originX, originY, width, height } = face.bounds;

      const blockLeft = 0.3; // Adjust the block position and size as per your requirement
      const blockTop = 0.3;
      const blockWidth = 0.4;
      const blockHeight = 0.4;

      const blockLeftX = blockLeft;
      const blockRightX = blockLeft + blockWidth;
      const blockTopY = blockTop;
      const blockBottomY = blockTop + blockHeight;

      const faceCenterX = originX + width / 2;
      const faceCenterY = originY + height / 2;

      const isFaceInsideBlock =
        faceCenterX >= blockLeftX &&
        faceCenterX <= blockRightX &&
        faceCenterY >= blockTopY &&
        faceCenterY <= blockBottomY;

      setIsFaceDetected(isFaceInsideBlock);
    } else {
      setIsFaceDetected(false);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front} // Specify the front camera
        captureAudio={false}
        ref={cameraRef}
        onFacesDetected={handleFacesDetected}
        faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
      />
      <View style={styles.faceBlock} />
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.captureButtonText}>Take Picture</Text>
        </TouchableOpacity>
     
      <View>
        <Text style={styles.cameraText}>Please make sure your face is not out of frame. 
          <Text >Please keep your face inside it</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  faceBlock: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '80%',
    height: '45%',
    borderWidth: 8,
    borderColor: '#f59707',
    borderStyle: 'dotted', // Set border style to 'dotted'
    borderRadius: 130, // Make it a circle
    opacity: 0.6,
  },
  cameraText:{
    alignSelf: 'center',
    position: 'absolute',
    bottom: 150,
    width:'100%',
    padding: 15,
    backgroundColor: '#fff',
    color:'black',
    borderRadius: 50,
    opacity: 1,
  },
  // cameraTextHelp:{
  //   alignSelf: 'center',
  //   position: 'absolute',
  //   bottom: 120,
  //   padding: 15,
  //   backgroundColor: '#fff',
  //   color:'black',
  //   borderRadius: 50,
  //   opacity: 1,
  // },
  captureButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    opacity: 0.7,
  },
  captureButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CameraScreen