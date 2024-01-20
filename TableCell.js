import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableCell = ({ data }) => {
  return (
    <View style={styles.cellContainer}>
      <Text>{data.name}</Text>
      <Text>{data.age}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TableCell;