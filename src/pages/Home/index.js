import { ScrollView, StyleSheet, Text, View, Image, Pressable, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { colors, fonts, responsiveWidth } from "../../utils";
import { 
  Jarak, 
} from "../../components";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux"; 
import { useNavigation } from "@react-navigation/native"; 

export default function Home() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const onPress = () => navigation.navigate("Login");


  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.pages}>
        <View
          style={{ bborderRadius: 30, padding: 10 }}
        >
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/images/mdpLite.png")}
            resizeMode="contain"
          />
        </View>
        <Jarak height={20} />
        {/* <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text> Lorem Ipsum </Text>
          <Text> Lorem IpsumLorem Ipsum </Text>
          <Text> Lorem IpsumLorem IpsumLorem Ipsum </Text>
        </View> */}
        <Jarak height={20} />
        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            backgroundColor: "#f1f3ff",
            marginHorizontal: 20,
            borderColor: "white",
            elevation: 1,
            borderRadius: 15,
          }}
        >
          {/* <Pressable
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              paddingVertical: 20,
              borderRadius: 15,
            }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text>
              Register
            </Text>
          </Pressable> */}
          <Pressable style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f1f3ff',
                paddingVertical: 20,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              }} 
              onPress={() => navigation.navigate("Login")}
              >
            <Text>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  buton: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: fonts.primary.bold,
    color: "black",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  tinyLogo: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 2,
    padding: 20
  }
});
