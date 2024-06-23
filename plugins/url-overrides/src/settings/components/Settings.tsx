import { ReactNative, React} from "@vendetta/metro/common";
import { General } from "@vendetta/ui/components";
import SingleSetting from "./Entry";
import { addOverride, getOverridesArray, subscribeArrayList } from "../settings";


const { ScrollView, KeyboardAvoidingView } = General;
const { StyleSheet, Button, Platform } = ReactNative
const { useState, useEffect } = React


export const styles = StyleSheet.create({
    scrollview: {
        paddingBottom: 50,
    }
});

const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0

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
            <Button title="Add more?" onPress={addOverride}></Button>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}