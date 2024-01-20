import React from 'react';
import { View } from 'react-native';
import TableView from './TableView';

const MainScreen = () => {
  const tableData = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    // Add more data as needed
  ];

  return (
    <View>
      <TableView data={tableData} />
    </View>
  );
};

export default YourScreen;