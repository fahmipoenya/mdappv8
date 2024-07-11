import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts, responsiveHeight} from '../../../utils';
import { Picker } from '@react-native-picker/picker';

const Pilihan = ({label, datas, width, height, fontSize, selectedValue, onValueChange}) => {
// console.log(datas)
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize)}>{label} :</Text>
      <View style={styles.wrapperPicker}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker(width, height, fontSize)}
          onValueChange={onValueChange}>
          <Picker.Item label="-" value=""/>
          {datas.map((item, index) => { 
                if(label == "Gendre") {
                  return <Picker.Item label={item.label} value={item.label} key={item.value} />
                }else if(label == "PH"){
                  return <Picker.Item label={item.name} value={item.name} key={item.value} />
                }else if(label == "Tahun"){
                  return <Picker.Item label={item.name} value={item.name} key={item.value} />
                }else if(label == "Sort By"){
                  return <Picker.Item label={item.name} value={item.name} key={item.value} />
                }else if(label == "Sort Set"){
                  return <Picker.Item label={item.name} value={item.name} key={item.value} />
                }
                
          })}
        </Picker>
      </View>
    </View>
  );
};

export default Pilihan;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: (fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.regular,
  }),
  picker: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.regular,
    width: width,
    height: height ? height : responsiveHeight(46),
    marginTop: -10,
    marginBottom: 10
  }),
  wrapperPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
  }
});
