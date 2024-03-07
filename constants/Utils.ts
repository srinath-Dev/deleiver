import {Dimensions, Platform} from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const externalSize = Platform.OS === "web" ? screenWidth :screenHeight

export {screenWidth,screenHeight,externalSize}
