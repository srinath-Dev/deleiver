import {BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal} from "@gorhom/bottom-sheet";
import {forwardRef, useCallback, useMemo} from "react";
import {Button, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import Colors from "@/constants/Colors";
import {Link} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export  type Ref = BottomSheetModal

const BottomSheetItem = forwardRef<Ref>((props, ref) => {

    const snapPoints = useMemo(() => ['50%'], []);
    const renderBackDrop = useCallback(
        (props: any) =>
            <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1}/>
        ,
        [],
    );
    const {dismiss} = useBottomSheetModal();


    return (
        <BottomSheetModal
            handleIndicatorStyle={{display: 'none'}}
            overDragResistanceFactor={0}
            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackDrop}
            backgroundStyle={{backgroundColor: Colors.lightGrey, borderRadius: 0}}>
            <View style={styles.contentContainer}>
                <View style={styles.toggle}>
                    <TouchableOpacity style={styles.toggleActive}>
                        <Text style={styles.toggleActiveText}>Delivery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleInActive}>
                        <Text style={styles.toggleInActiveText}>Pickup</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subHeader}>Your Location</Text>

                <Link href={'/(modal)/location-search'} asChild>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <Ionicons name={'location-outline'} size={20} color={Colors.medium}/>
                            <Text style={{flex: 1}}>Current location</Text>
                            <Ionicons name={'chevron-forward'} size={20} color={Colors.primary}/>
                        </View>
                    </TouchableOpacity>
                </Link>
                <Text style={styles.subHeader}>Arrival Time</Text>

                <TouchableOpacity>
                    <View style={styles.item}>
                        <Ionicons name={'stopwatch-outline'} size={20} color={Colors.medium}/>
                        <Text style={{flex: 1}}>Now</Text>
                        <Ionicons name={'chevron-forward'} size={20} color={Colors.primary}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.completeBtn}
                    onPress={() => {
                        dismiss();
                    }}>
                    <Text
                        style={styles.completeText}
                    >Confirm</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
})


const styles = StyleSheet.create({
    completeText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    completeBtn: {
        backgroundColor: Colors.primary,
        padding: 16,
        margin: 16,
        borderRadius: 4,
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 32,
        alignItems: 'center'
    },
    toggleActive: {
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 32,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical:10
    },
    toggleInActive: {
        padding: 8,
        borderRadius: 32,
        alignItems: 'center',
        paddingHorizontal: 30
    },
    toggleActiveText: {
        color: '#fff',
        fontWeight: '700'
    },
    toggleInActiveText: {
        color: Colors.primary,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '600',
        margin: 16
    },
    item: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderColor: Colors.grey,
        borderWidth: 1
    }
})

export default BottomSheetItem;
