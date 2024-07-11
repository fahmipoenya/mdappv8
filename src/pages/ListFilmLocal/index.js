import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Modal,
  SafeAreaView
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { HeaderComponent, Jarak, Tombol } from "../../components";
import { colors, fonts, numberWithCommas, responsiveHeight } from "../../utils";
import { IconCari } from "../../../assets/icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import base64 from "react-native-base64";
import CardFilm from "../../components/kecil/CardFilm";
import { FilterContext } from "../../../contex/GlobalState";


export default function ListFilmLocal({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalRec, setTotalRec] = useState("");
  const [totalPen, setTotaPen] = useState("");
  const [isLocal, setIsLocal] = useState(0); 
  const [film, setFilm] = useState(""); 
  const [filter, setFilter] = useContext(FilterContext); 
  // const { gendre, ph, tahun, column, sorting } = route.params;
  const user = "user!123";
  const pass = "test123test";
  const [tampilFilter, setTampilFilter] = useState("");
  useLayoutEffect(()=>{
    // setFilter({genre: 'Drama'})
    // console.log(filter.genre)
    // console.log(filter.tahun)
    // console.log(filter.ph)
    // console.log(filter.column)
    // console.log(filter.sorting)
    // console.log(film)
  }, []) 

  useEffect(() => {
    if (filter.tahun || filter.ph || filter.genre || filter.column || filter.sorting || film) {
      getData();
      setPageCurrent(1);
    } else {
      getData();
      setPageCurrent(pageCurrent + 1);
    }
    if (filter.genre && !filter.tahun && !filter.ph) {
      setTampilFilter("Genre");
    } else if (filter.genre && filter.tahun && !filter.ph) {
      setTampilFilter("Genre, Tahun");
    } else if (filter.genre && filter.tahun && filter.ph) {
      setTampilFilter("Genre, Tahun, PH");
    } else if (filter.ph && !filter.genre && !filter.tahun) {
      setTampilFilter("PH");
    } else if (filter.ph && filter.genre && !filter.tahun) {
      setTampilFilter("Genre, PH");
    } else if (filter.tahun && !filter.genre && !filter.ph) {
      setTampilFilter("Tahun");
    } else {
      setTampilFilter("");
    }
  }, [filter.tahun, filter.ph, filter.genre, filter.column, filter.sorting, film, isLocal]);

  const apiURL = "http://adminboxoffice.mdpictures.com/webapi/v1/api/getfilm.php";

  const getData = async () => {
    setLoading(true); 
    // console.log('masuk');
    const respon = await fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: "Basic " + base64.encode(user + ":" + pass),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterby: {
          tahun: filter.tahun ? filter.tahun : '',
          genre: filter.genre ? filter.genre : '',
          rmhProduksi: filter.ph ? filter.ph : '',
          film: film ? film : '',
          isLocal: isLocal,
        },
        sortby: {
          column: filter.column ? filter.column.toLowerCase() : '',
          sorting: filter.sorting ? filter.sorting : '',
        },
        limit: 10,
        page: 1,
      }),
    }); 
    const reponJson = await respon.json(); 
    reponJson ? setData(reponJson.data) : setData([]);
    reponJson ? setTotalPosts(reponJson.nextPage) : setTotalPosts("");
    reponJson ? setTotalRec(reponJson.totalFilm) : setTotalRec("");
    reponJson ? setTotaPen(reponJson.totalPenonton) : setTotaPen(""); 
    setLoading(false);
  };

  const loadMore = async () => {
    setLoading(true);
    // setFilter(dataFilter);
    setPageCurrent(pageCurrent + 1); 
    const respon1 = await fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: "Basic " + base64.encode(user + ":" + pass),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterby: {
          tahun: filter.tahun ? filter.tahun : '',
          genre: filter.genre ? filter.genre : '',
          rmhProduksi: filter.ph ? filter.ph : '',
          film: film ? film : '',
          isLocal: isLocal,
        },
        sortby: {
          column: filter.column ? filter.column.toLowerCase() : '',
          sorting: filter.sorting ? filter.sorting : '',
        },
        limit: 10,
        page: pageCurrent,
      }),
    });
    const reponJson = await respon1.json();

    reponJson ? setTotalPosts(reponJson.nextPage) : setTotalPosts("");
    reponJson
      ? setData((existingItem) => [...existingItem, ...reponJson.data])
      : setData([]);

    setLoading(false);
  };

  const handleLoadMore = () => {
    return totalPosts > 0 ? loadMore() : null;
  };

  const endComponent = () => {
    return totalPosts > 0 ? (
      <View>
        <Text style={styles.text}> Loading...</Text>
      </View>
    ) : (
      <View>
        <Text style={styles.text}> End Page</Text>
      </View>
    );
  };

  const handleSearch = (film) => {
    getData(); 
  };

  const handleTextFilter = () => {
    return tampilFilter ? (
      <Text style={styles.textfilter}>Filter by : {tampilFilter}</Text>
    ) : (
      ""
    );
  };
  const handleClearFilter = () => {
    return tampilFilter ? (
      <Pressable onPress={() => setFilter({gendre: '', tahun: '', ph: '', column: '', sorting: ''})}>
        <Text style={{textDecorationLine: 'underline', fontSize: 12}}>Clear filter</Text>
      </Pressable>
    ) : (
      ""
    );
  };
  return (
    <SafeAreaView style={styles.page}>
      {/* <HeaderComponent page="ListFilm" /> */}
      <View>
        {/* <Text>{route.params ? route.params.gendre : ''}</Text> */}
        <View style={styles.containerSearch}>
          <View style={styles.wrapperHeader}>
            {/* Input Pencarian  */}
            <View style={styles.searchSection}>
              <IconCari />
              <TextInput
                placeholder="search"
                style={styles.input}
                onChangeText={(film) => {
                  setFilm(film);
                  // handleSearch(film);
                }}
                onSubmitEditing={() => handleSearch(film)}
              />
            </View>
            <Jarak width={10} />
            <Tombol
              icon="sort"
              padding={10}
              onPress={() => navigation.navigate("SortPage")}
              // onPress={() => setModalVisible(true)}
            />
            <Jarak width={10} />
            <Tombol
              icon="filter"
              padding={10}
              onPress={() => navigation.navigate("FilterPage", {nama: 'asu'})}
            />
          </View>
        </View>  
      </View>
      <View
        style={{
          marginHorizontal: 30,
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.textfilter}>
            Total Penonton : {totalPen ? numberWithCommas(totalPen) : ""}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 30,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginTop: -10 }}>{handleTextFilter()}</View>
        <View style={{ marginTop: -10 }}>{handleClearFilter()}</View>
      </View>

      <Jarak />
      <FlatList
        style={styles.pilihJersey}
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <CardFilm film={(item)} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={endComponent}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Sort By</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>
                Tahun kjsbdfskdjbfsdbfjsbdfjlsdfsdfjb
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { 
    flex: 1, 
    backgroundColor: "#f5fcff",
    // backgroundColor: require("../../../assets/images/mdpLite.png")
  },
  container: {
    marginTop: -15,
  },
  pilihLiga: {
    marginHorizontal: 30,
  },
  pilihJersey: {
    marginHorizontal: 30,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    textTransform: "capitalize",
    textAlign: "left",
    color: "black",
    padding: 5,
  },
  containerSearch: {
    backgroundColor: "#f5fcff",
    marginTop: 40,
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 10,
    // height: responsiveHeight(70),
    borderColor:"#41738e"
  },
  textfilter: {
    color: "#b51414",
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    textTransform: "capitalize",
    textAlign: "left", 
    padding: 5,
  },
  wrapperHeader: {
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 30,
    flexDirection: "row",
    // marginHorizontal: 'auto'
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5fcff",
    borderRadius: 5,
    paddingLeft: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.primary.regular,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "gray",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
