import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { Svg, G, Circle } from 'react-native-svg';

const FingerIcon = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  return (
    <Svg>
      <G>
        <Circle
          cx={100}
          cy={100}
          r={50}
          fill="blue"
          stroke="black"
          strokeWidth={2}
          opacity={animatedValue}
        />
      </G>
    </Svg>
  );
};

export default FingerIcon;