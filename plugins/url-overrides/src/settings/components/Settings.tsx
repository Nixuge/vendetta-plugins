import { ReactNative, React} from "@vendetta/metro/common";
import { General } from "@vendetta/ui/components";
import SingleSetting from "./Entry";
import { addOverride, getOverridesArray, subscribeArrayList } from "../settings";


const { ScrollView, KeyboardAvoidingView, TouchableOpacity, Text } = General;
const { StyleSheet, Platform } = ReactNative;
const { useState, useEffect } = React;


export const styles = StyleSheet.create({
    scrollview: {
        paddingBottom: 50,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#08080A",
        borderRadius: 15,
        margin: 10,
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    appButtonText: {
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    }
});

const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0;

export default function() {
    const [array, setArray] = useState(getOverridesArray);

    useEffect(() => {
        const unsubscribe = subscribeArrayList(setArray);
        return () => unsubscribe();
    }, []);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView contentContainerStyle={styles.scrollview}>
            {array.map(function(object, i){
                return <SingleSetting object={object} count={i}></SingleSetting>
            })}

            {/* Button except you can't style buttons (lmao) so made my own */}
            <TouchableOpacity onPress={addOverride} style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>Add more</Text>
            </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}