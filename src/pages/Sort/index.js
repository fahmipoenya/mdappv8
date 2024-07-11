import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react' 
import { fonts } from '../../utils';
import { Jarak, Pilihan, Tombol } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown'; 
import { FilterContext } from "../../../contex/GlobalState";

export default function Sort({navigation}) {
    // const navigation = useNavigation();
    const [column, setColumn] = useState('');
    const [sorting, setSorting] = useState(''); 
    
  const [filter, setFilter] = useContext(FilterContext);

    const onClear = () => {
      setColumn(""); 
      setSorting(""); 
      setFilter({column: '', sorting: ''})
      navigation.navigate("MyTabs");
    };

    const onContinue = () => {
        cekParam();
        navigation.navigate("MyTabs"); 
    };

    const cekParam = () => { 
      if(column && sorting) {
        setFilter({column: column, sorting: sorting})
      } else if (column && !sorting){ 
        setFilter({column: column, sorting: ''})
      } else if (!column && sorting){ 
        setFilter({column: '', sorting: sorting})
      }
    }

    const dataSort = [
      { name: "Judul", value: "1" },
      { name: "Tahun", value: "2" }, 
      { name: "penonton", value: "3" }, 
    ];
    const dataSortBy = [
      { name: "asc", value: "1" },
      { name: "desc", value: "2" }, 
    ];

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.pages}>
          <View style={{alignSelf: 'center', marginTop: 50}}> 
          <Text style={{ fontFamily: fonts.primary.bold, fontSize: 40 }}>
            Sort
          </Text>
          </View>
          <View style={styles.container}>
          {/* <Pilihan
            label="Sort By"
            datas={dataSort}
            selectedValue={column}
            onValueChange={(column) => setColumn(column)}
          />
          <Pilihan
            label="Sort Set"
            datas={dataSortBy}
            selectedValue={sorting}
            onValueChange={(sorting) => setSorting(sorting)}
          /> */} 
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataSort}
            search
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder="Sort By"
            searchPlaceholder="Search..."
            value={column}
            onChange={(item) => { 
              setColumn(item.name);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataSortBy}
            search
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder="asc or desc" 
            value={sorting}
            onChange={(item) => { 
              setSorting(item.name);
            }}
          />
          </View>
          <View style={{ margin: 30 }}>
          <Tombol
            title="Apply"
            type="text"
            padding={10}
            onPress={() => onContinue()}
            param="test"
          />
        </View>
        {/* <View style={{ marginHorizontal: 30 }}>
          <Tombol
            title="Clear All"
            type="text"
            padding={10}
            onPress={() => onClear()}
            param="test"
          />
        </View> */}
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
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