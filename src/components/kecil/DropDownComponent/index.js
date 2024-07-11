import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';  
import { dummyFilm } from '../../../data/dummyFilm';


const uniqueTags = [];

dummyFilm.map((item) => {
  var findItem = uniqueTags.find((x) => x.Kategori === item.Kategori);
  if (!findItem) uniqueTags.push(item.Kategori);
});
const data = [
  { label: 'Horor', value: '1' },
  { label: 'Drama', value: '2' },
  { label: 'Thiler', value: '3' },
  { label: 'Action', value: '4' },
  { label: 'Comedy', value: '5' },
  { label: 'Fantasy', value: '6' },
  { label: 'Kita', value: '7' },
  { label: 'Kamu', value: '8' },
];


const DropdownComponent = () => {
  const [value, setValue] = useState('');
  
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
        console.log("val: ", setValue);
      }}
      // renderLeftIcon={() => (
      //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      // )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 20
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});