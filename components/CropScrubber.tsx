import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

type Props = {
  startTime: number;
  setStartTime: (val: number) => void;
  duration: number;
};

export default function CropScrubber({ startTime, setStartTime, duration }: Props) {
  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ marginBottom: 6 }}>Select start time for 5-second crop:</Text>
      <Slider
        minimumValue={0}
        maximumValue={Math.max(duration - 5, 0)}
        step={1}
        value={startTime}
        onValueChange={setStartTime}
      />
      <Text style={{ marginTop: 6 }}>Start at: {startTime}s</Text>
    </View>
  );
}
