import React from 'react';
import { FlatList } from 'react-native';
import TableCell from './TableCell'; // Import your custom TableCell component

const TableView = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TableCell data={item} />}
    />
  );
};

export default TableView;