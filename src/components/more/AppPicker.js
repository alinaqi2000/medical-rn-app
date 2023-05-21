import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
  Text,
} from 'react-native';

import PickerItem from './PickerItem';

function AppPicker({items, onSelectItem, placeholder, selectedItem, onPress}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {selectedItem ? selectedItem.label : placeholder}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={items}
          keyExtractor={item => item.value.toString()}
          renderItem={({item}) => (
            <PickerItem
              label={item.label}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: 'row',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    top: 2,
  },
});

export default AppPicker;
