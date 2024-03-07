import {Stack, useNavigation} from 'expo-router';
import {TouchableOpacity, useColorScheme} from "react-native";
import CustomHeader from "@/components/CustomHeader";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import React from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";

export const unstable_settings = {
    initialRouteName: 'index',
};

export default function RootLayoutNav() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation()

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <Stack>
                    <Stack.Screen name="index" options={{header: () => <CustomHeader/>}}/>
                    <Stack.Screen name={'(modal)/filter'}
                                  options={
                                      {
                                          presentation: 'modal',
                                          headerTitle: 'Filters',
                                          headerShadowVisible: false,
                                          headerStyle: {
                                              backgroundColor: Colors.lightGrey
                                          },
                                          headerLeft: () => (
                                              <TouchableOpacity
                                              onPress={()=>{
                                                  navigation.goBack()
                                              }
                                              }
                                              >
                                                  <Ionicons name={'close-outline'} size={28} color={Colors.primary}/>
                                              </TouchableOpacity>
                                          )
                                      }
                                  }
                    />
                    <Stack.Screen name={'(modal)/location-search'}
                                  options={
                                      {
                                          presentation: 'fullScreenModal',
                                          headerTitle: 'Search location',
                                          headerShadowVisible: false,
                                          headerLeft: () => (
                                              <TouchableOpacity
                                                  onPress={()=>{
                                                      navigation.goBack()
                                                  }
                                                  }
                                              >
                                                  <Ionicons name={'close-outline'} size={28} color={Colors.primary}/>
                                              </TouchableOpacity>
                                          )
                                      }
                                  }
                    />
                </Stack>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
