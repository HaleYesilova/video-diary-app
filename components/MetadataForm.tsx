import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type Props = {
  name: string;
  desc: string;
  onNameChange: (text: string) => void;
  onDescChange: (text: string) => void;
};

export default function MetadataForm({ name, desc, onNameChange, onDescChange }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Video Name"
        value={name}
        onChangeText={onNameChange}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={onDescChange}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.textArea]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
