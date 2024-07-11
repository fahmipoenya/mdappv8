import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
  Platform,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native"; 
import { Inputan, Jarak, Tombol } from "../../components";
import { colors, fonts, responsiveHeight } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import InputIcon from "../../components/kecil/InputIcon"; 
import base64 from "react-native-base64"; 
import Ionicons from '@expo/vector-icons/Ionicons';
 
export default function Login() {
  const navigation = useNavigation();
  const [state, setState] = useState({
    username: "",
    password: "",
    gendre: "",
    ph: "",
    tahun: "",  
  });
  const [secure, setSecure] = useState(true);
  const { username, password } = state; 
  const authLogin = () => {
    const encode = base64.encode(password);
    const user = 'user!123';
    const pass = 'test123test';
    if (username.length < 1) {
      alert("Enter Email or Username!");
    } else if (password.length < 1) {
      alert("Enter Password!");
    } else {
      fetch("http://adminboxoffice.mdpictures.com/webapi/v1/api/login.php", {
        method: "POST",
        headers: {
          Authorization: "Basic " + base64.encode(user + ":" + pass),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernm: username, pass: encode }),
      })
        .then((response) => {
          if (!response.ok) throw response;
          return response.json();
        })
        .then((responseJson) => {
          navigation.navigate("MyTabs", state);
        })
        .catch((error) => {
          if (error instanceof Error) {
            // console.log(error); 
            alert(error);
          } else {
            error.json().then((body) => {
              // if (body.message) {
              //   alert(body.message);
              // // }
              // console.log(body);
              Alert.alert(body.message);
            });
          }
        });
    } 
  };  
  const showpass = () => {
    setSecure(!secure);
  }

  return (
    <KeyboardAvoidingView 
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.pages}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../../assets/images/backgorund.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ bborderRadius: 30, padding: 10 }}>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/images/mdpLite.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.cardLogin} >  
          <View style={{flexDirection: 'row'}}>
            <InputIcon
                placeholder="Email or Username"
                value={username}
                onChangeText={(username) => setState({ ...state, username })}
                onFocus={this.handleOnFocus}
              />  
          </View> 
          <Jarak height={10} /> 
          <View style={{flexDirection: 'row'}}>
            <View>
              <InputIcon
                placeholder="Password"
                secureTextEntry={secure}
                value={password} 
                onChangeText={(password) => setState({ ...state, password })}
                 onFocus={this.handleOnFocus}
              /> 
            </View>
            <View style={{justifyContent: 'center'}} >
              <Ionicons name="eye" size={32} color="black"
              onPress={() => showpass()} />
            </View> 
          </View>
          <Jarak height={30} />
              <Tombol
                title="Login"
                type="text"
                padding={12}
                fontSize={30}
                onPress={() => authLogin()}
                // onPress={() => navigation.navigate("ListFilm")}
              />
              <Jarak height={30} />
              <View>
                <Text
                  style={styles.textBlue} 
                >
                  Forgot Password?
                </Text>
              </View> 
        </View> 
      </ImageBackground> 
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white, 
  },
  tinyLogo: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 3,
    padding: 20,
    alignSelf: "center",
    marginTop: 100
  },
  cardLogin: {
    // backgroundColor: "yellow",
    marginHorizontal: 20,
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    //height: Dimensions.get('window').height * 1, 
  },
  textBlue: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: colors.primary,
  },
});
