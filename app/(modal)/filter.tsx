import {View, StyleSheet, Text, TouchableOpacity, FlatList, ListRenderItem} from "react-native";
import Colors from "@/constants/Colors";
import {useNavigation} from "expo-router";
import categories from '@/assets/data/filter.json'
import {Ionicons} from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, {useEffect, useState} from "react";

// @ts-ignore
import CheckBox from 'react-native-check-box';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToDP
} from 'react-native-responsive-screen';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";


interface category {
    name: string;
    count: number;
    checked: boolean;

}

const ItemBox = () => {
    return (
        <>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name={'arrow-up-outline'} size={20} color={Colors.medium}/>
                    <Text style={{flex: 1}}>Sort</Text>
                    <Ionicons name={'chevron-forward'} size={20} color={Colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name={'fast-food-outline'} size={20} color={Colors.medium}/>
                    <Text style={{flex: 1}}>Hygiene rating</Text>
                    <Ionicons name={'chevron-forward'} size={20} color={Colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name={'pricetag-outline'} size={20} color={Colors.medium}/>
                    <Text style={{flex: 1}}>Offers</Text>
                    <Ionicons name={'chevron-forward'} size={20} color={Colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.item}>
                    <Ionicons name={'nutrition-outline'} size={20} color={Colors.medium}/>
                    <Text style={{flex: 1}}>Sort</Text>
                    <Ionicons name={'chevron-forward'} size={20} color={Colors.primary}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.header}>Categories</Text>
        </>
    )
}

const Filter = () => {
    const navigation = useNavigation();
    const [itemss, setItemss] = useState<category[]>(categories)
    const [selected, setSelected] = useState<category[]>([]);
    const flexWiidth = useSharedValue(0);
    const scale  = useSharedValue(0);

    useEffect(()=>{
        const hasSelected = selected.length > 0;
        const selectedItems = itemss.filter((items)=> items.checked)
        const newSelected = selectedItems.length>0;
        console.log(selectedItems)
        if (hasSelected !== newSelected){
          flexWiidth.value = withTiming(newSelected ? widthPercentageToDP(40) : 0)
            scale.value = withTiming(newSelected ? 1:0)
        }
        setItemss(itemss)
        setSelected(selectedItems);
    },[itemss])


    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: flexWiidth.value,
            opacity: flexWiidth.value > 0 ? 1 :0
        }
    })

    const animatedText = useAnimatedStyle(() => {
        return {
            transform:[{scale:scale.value}]
        }
    })

    const handleClearAll = ()=>{
        const updatedItems = itemss.map((item)=>{
            console.log(item.checked)
           // item.name = "srina"
            item.checked = false;
            return item;
        })

        setItemss(updatedItems)
    }

    const renderItem: ListRenderItem<category> = ({item, index}) => (
        <View style={styles.flatItem}>
            <Text style={styles.itemText}>{item.name} ({item.count})</Text>

            {/*<BouncyCheckbox*/}
            {/*    isChecked={item.checked ===true ? true : false}*/}
            {/*    fillColor={Colors.primary}*/}

            {/*    unfillColor='#fff'*/}
            {/* //   innerIconStyle={{borderWidth: 2, borderRadius: 4}}*/}
            {/*    iconStyle={{borderRadius: 4, borderColor: Colors.primary, borderWidth: 2}}*/}
            {/*    onPress={(is) => {*/}
            {/*        const isCheckedItem = itemss[index].checked*/}
            {/*        const updatedItem = itemss.map((item) => {*/}
            {/*            if (item.name === itemss[index].name) {*/}
            {/*                item.checked = is*/}
            {/*            }*/}
            {/*            return item;*/}
            {/*        })*/}
            {/*        setItemss(updatedItem);*/}
            {/*    }}/>*/}

            <CheckBox
                onClick={()=>{
                    const isCheckedItem = itemss[index].checked
                    const updatedItem = itemss.map((item) => {
                        if (item.name === itemss[index].name) {
                            item.checked = !isCheckedItem
                        }
                        return item;
                    })
                    setItemss(updatedItem);
                }}
                isChecked={itemss[index].checked}

            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList data={itemss} renderItem={renderItem}
                      ListHeaderComponent={ItemBox}
                      showsVerticalScrollIndicator={false}
            />
            <View style={{height: 90}}/>

            <View style={styles.footer}>
                <View style={styles.buttonContainer}>
                    <Animated.View  style={[animatedStyles,styles.outlineBtn]} >
                        <TouchableOpacity onPress={handleClearAll}>

                                <Animated.Text style={[animatedText,styles.outlineBtnTxt]}>Clear all</Animated.Text>

                        </TouchableOpacity>
                    </Animated.View>

                    <TouchableOpacity style={styles.doneBtn} onPress={() => {
                        navigation.goBack()
                    }}>
                        <Text style={styles.footerText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        padding: 24,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: -10
        },
        backgroundColor: '#fff',
    },
    doneBtn: {
        padding: 16,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        borderRadius: 5,
       width:widthPercentageToDP(40),
        paddingHorizontal:20,
        height:52
    },
    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 8,
        marginBottom: 8
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16
    },
    item: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderColor: Colors.grey,
    },
    flatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 20,
        backgroundColor: '#fff'
    },
    itemText: {
        flex: 1,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,

        alignSelf:'center'
    },
    outlineBtn:{
        borderColor:Colors.primary,
        borderWidth:0.5,
        alignItems:'center',
        justifyContent:'center',
       width:widthPercentageToDP(40),
        borderRadius:8,
        height:52
    },
    outlineBtnTxt:{
        color:Colors.primary,
        fontWeight:'bold',
        fontSize:16,
    }
})

export default Filter;
