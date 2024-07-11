import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react"; 
import { fonts } from "../../utils";
import { Pilihan, Tombol } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import base64 from "react-native-base64"; 
import { FilterContext } from "../../../contex/GlobalState";


export default function Filter({route, navigation}) {
  // const navigation = useNavigation();
  // const { gendre, totalpenonton } = state;
  const [gendre, setGendre] = useState("");
  const [ph, setPH] = useState("");
  const [tahun, setTahun] = useState("");
  const [userName, setUserName] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const user = "user!123";
  const pass = "test123test";
  const [dataGenre, setDataGenre] = useState([]);
  const [dataPH, setDataPH] = useState([]);
  const [dataTahun, setDataTahun] = useState([]);
  const [filter, setFilter] = useContext(FilterContext);

  const onContinue = () => { 
    cekParam();
    navigation.navigate("MyTabs"); 
  };

  cekParam = () => {
    // console.log(gendre, ph, tahun)
    if (gendre && ph && tahun) {
      // console.log('masuk');
      setFilter({genre: gendre, ph: ph, tahun: tahun})
    }else if(gendre && ph && !tahun) {
      // console.log('2')
        setFilter({genre: gendre, ph: ph, tahun: ''})
    } else if (gendre && !ph && !tahun){
        setFilter({genre: gendre, ph: '', tahun: ''}) 
    } else if (!gendre && ph && !tahun){
        setFilter({genre: '', ph: ph, tahun: ''}) 
    } else if (!gendre && ph && tahun){
        setFilter({genre: '', ph: ph, tahun: tahun}) 
    } else if (!gendre && !ph && tahun){
        setFilter({genre: '', ph: '', tahun: tahun})
    } else if (gendre && !ph && tahun){
        setFilter({genre: gendre, ph: '', tahun: tahun})
    } 
  }
  useEffect(()=>{
    getGendre();
    getPH();
    getTahun();
  },[])
  const onClear = () => {
    setFilter({gendre: '', tahun: '', ph: ''})
    navigation.navigate("MyTabs");
  };
  
  const apiURL = "http://adminboxoffice.mdpictures.com/webapi/v1/api/cbogenre.php";

  const getGendre = async () => { 
    const respon = await fetch(apiURL, {
      method: "GET",
      headers: {
        Authorization: "Basic " + base64.encode(user + ":" + pass),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }); 
    const reponJson = await respon.json(); 
    var count = Object.keys(reponJson.data).length;
    let genreData = [];
    for (let i = 0; i < count; i++) {
      genreData.push({
        value : reponJson.data[i].Id,
        label: reponJson.data[i].Item
      });
      // console.log(genreData);
      setDataGenre(genreData);
    }
    // console.log(reponJson.data[0].Item);
  };
 
  const apiURL2 = "http://adminboxoffice.mdpictures.com/webapi/v1/api/cboph.php";

  const getPH = async () => { 
    const respon = await fetch(apiURL2, {
      method: "GET",
      headers: {
        Authorization: "Basic " + base64.encode(user + ":" + pass),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }); 
    const reponJson = await respon.json(); 
    var count = Object.keys(reponJson.data).length;
    let PHArray = [];
    for (let i = 0; i < count; i++) {
      PHArray.push({
        value : reponJson.data[i].Id,
        label: reponJson.data[i].Item
      });
      // console.log(PHArray);
      setDataPH(PHArray);
    } 
  };
  const apiURL3 = "http://adminboxoffice.mdpictures.com/webapi/v1/api/cboyear.php";

  const getTahun = async () => { 
    const respon = await fetch(apiURL3, {
      method: "GET",
      headers: {
        Authorization: "Basic " + base64.encode(user + ":" + pass),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }); 
    const reponJson = await respon.json(); 
    var count = Object.keys(reponJson.data).length;
    let TahunArray = [];
    for (let i = 0; i < count; i++) {
      TahunArray.push({
        value : reponJson.data[i].Id,
        label: reponJson.data[i].Item.toString()
      });
      // console.log(TahunArray);
      setDataTahun(TahunArray);
    } 
  };
 
  
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.pages}>
        <View style={{ alignSelf: "center", marginTop: 50}}> 
        </View>
        <View style={styles.container}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataGenre}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Select Genre"
            searchPlaceholder="Search..."
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            value={gendre}
            onChange={(item) => { 
              setGendre(item.label); 
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataPH}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select PH"
            searchPlaceholder="Search..."
            value={ph}
            onChange={(item) => { 
              setPH(item.label); 
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataTahun}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select Year"
            searchPlaceholder="Search..."
            value={tahun}
            onChange={(item) => { 
              setTahun(item.label); 
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 20,
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
