import { ReactNative, React} from "@vendetta/metro/common";
import { General } from "@vendetta/ui/components";
import SingleSetting from "./Entry";
import { addOverride, getOverridesArray, subscribeArrayList } from "../settings";


const { ScrollView } = General;
const { StyleSheet, Button } = ReactNative
const { useState, useEffect } = React


export const styles = StyleSheet.create({
    scrollview: {
        marginBottom: 20
    }
});

export default function() {
    const [array, setArray] = useState(getOverridesArray);

    useEffect(() => {
        const unsubscribe = subscribeArrayList(setArray);
        return () => unsubscribe();
    }, []);

    return (
        <ScrollView style={styles.scrollview}>
            {array.map(function(object, i){
                return <SingleSetting object={object} count={i}></SingleSetting>
            })}
            <Button title="Add more?" onPress={addOverride}></Button>
        </ScrollView>
    )
}