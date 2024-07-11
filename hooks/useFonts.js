import * as Font from "expo-font";

export default useFonts = async () => {
   await Font.loadAsync({
    'PublicSansLight': require('../assets/fonts/PublicSans-Light.ttf'),
    'PublicSansRegular': require('../assets/fonts/PublicSans-Regular.ttf'),
    'PublicSansSemiBold': require('../assets/fonts/PublicSans-SemiBold.ttf'),
    'PublicSansBold': require('../assets/fonts/PublicSans-Bold.ttf'), 
    });
};