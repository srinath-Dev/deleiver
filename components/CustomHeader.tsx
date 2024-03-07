import {SafeAreaView, View, StyleSheet, Image, TouchableOpacity, Text, TextInput} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFValue} from "react-native-responsive-fontsize";
import {externalSize, screenHeight, screenWidth} from "@/constants/Utils";
import {Ionicons} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {Link} from "expo-router";
import BottomSheet, {BottomSheetModal} from "@gorhom/bottom-sheet";
import {useMemo, useRef} from "react";
import BottomSheetItem from "@/components/BottomSheet";

const SearchBar = () => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchSection}>
                <View style={styles.searchField}>
                    <Ionicons style={styles.searchIcon} name={'search'} size={RFValue(20,externalSize)} color={Colors.mediumDark}/>
                    <TextInput style={styles.searchInput} placeholder='Restaurants, groceries, dishes' />
                </View>
                <Link href={'/(modal)/filter'} asChild>
                    <TouchableOpacity style={styles.optionButton}>
                        <Ionicons name={'options-outline'} size={RFValue(20, externalSize)} color={Colors.primary}/>
                    </TouchableOpacity>
                </Link>

            </View>
        </View>
    )
}

const CustomHeader = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const openModal = () =>{
        console.log('open modal')
        bottomSheetRef.current?.present()
    }

    const snapPoints = useMemo(() => ['25%', '50%'], []);


    return (
        <SafeAreaView style={styles.safeArea}>
            <BottomSheetItem  ref={bottomSheetRef}/>

            <View style={styles.container}>
                <TouchableOpacity onPress={openModal}>
                    <Image style={styles.bike} source={require('../assets/images/bike.png')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={openModal} style={styles.titleContainer}>
                    <Text style={styles.title}>Delivery-Now</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                        <Text style={styles.subTitle}>Coimbatore</Text>
                        <Ionicons name={'chevron-down'} size={RFValue(20, externalSize)} color={Colors.primary}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profileButton}>
                    <Ionicons name={'person-outline'} size={RFValue(RFValue(18, externalSize))} color={Colors.primary}/>
                </TouchableOpacity>

            </View>
            <SearchBar/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, backgroundColor: '#fff'
    },
    container: {
        height: RFValue(60, externalSize),
        alignItems: 'center',
        justifyContent: "space-between",
        gap: 20,
        flexDirection: 'row',
        paddingHorizontal: RFValue(20, externalSize),
        backgroundColor: '#fff'
    },
    bike: {
        width: RFValue(30, externalSize),
        height: RFValue(30, externalSize)
    },
    titleContainer: {
        flex: 1
    },
    profileButton: {
        backgroundColor: Colors.lightGrey,
        padding: 10,
        borderRadius: 50,
    },
    title: {
        fontSize: RFValue(14, externalSize),
        color: Colors.medium
    },
    subTitle: {
        fontSize: RFValue(18, externalSize),
        fontWeight: 'bold'
    },
    searchContainer: {
        height: RFValue(60, externalSize),
        backgroundColor: '#fff'
    },
    searchSection:{
        flexDirection:'row',
        gap:10,
        flex:1,
        paddingHorizontal:RFValue(20,externalSize),
        alignItems:'center'
    },
    searchField:{
        flex:1,
        backgroundColor:Colors.lightGrey,
        borderRadius:8,
        flexDirection:'row',
        alignItems:'center'
    },
    optionButton:{
        padding:RFValue(10,externalSize),
        borderRadius:50
    },
    searchInput:{
        padding:RFValue(10,externalSize),
        color:Colors.mediumDark,
        flex:1
    },
    searchIcon:{
        paddingLeft:5
    }
})

export default CustomHeader;
