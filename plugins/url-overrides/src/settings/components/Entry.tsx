import { ReactNative, React} from "@vendetta/metro/common";
import { General, Forms } from "@vendetta/ui/components";
import { Override } from "../../types";
import { removeOverride } from "../settings";
import { validateRegex } from "../validator";


const { View, Text, TouchableOpacity, Animated } = General;
const { FormSwitchRow } = Forms;
const { TextInput, StyleSheet } = ReactNative
const { useState, useEffect, useRef } = React

const styles = StyleSheet.create({
    view: {
        backgroundColor: "#08080A",
        borderRadius: 15,
        margin: 10,
        padding: 10
    },
    title: {
        color: "#fff",
        textAlign: "center",
        fontSize: 15
    },
    text: {
        color: "#fff",
        textAlign: "center",
        transform: "rotate(90deg)",
    },
    fromInputWrap: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "#fff",
        borderColor: "#222",
        borderRadius: 7,
    },
    fromInput: {
        color: "#fff",
    },
    toInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "#fff",
        borderColor: "#222",
        borderRadius: 7,
    },
    crossView: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 35,
        height: 35,
        backgroundColor: '#111',
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    cross: {
        color: "white",
        fontSize: 17,
        textAlign: "center",
        lineHeight: 32
    }
})

interface SettingProperties {
    object: Override,
    count: number
}

export default function(properties: SettingProperties) {
    const [reactObject, updateReactObject] = useState(properties.object);
    const [isRegexValid, setRegexValid] = useState(validateRegex(properties.object))
    // Below is because I wanted to have a background that fades in red when the regex is invalid :/
    const backgroundColorAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(backgroundColorAnim, {
            toValue: isRegexValid ? 0 : 1,
            duration: 150,
            useNativeDriver: false
        }).start();
    }, [isRegexValid]);
    const backgroundColor = backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#08080A', '#ff5757']
    });

    function updateFrom(event: any) {
        properties.object.from = event.nativeEvent.text;
        setRegexValid(validateRegex(properties.object));
    }
    function updateTo(event: any) {
        properties.object.to = event.nativeEvent.text;
    }

    function toggleRegex() {
        updateReactObject({...reactObject, useRegex: !reactObject.useRegex});
        properties.object.useRegex = !properties.object.useRegex;
        setRegexValid(validateRegex(properties.object));
    }
    function toggleInAppBrowser() {
        updateReactObject({...reactObject, bypassInApp: !reactObject.bypassInApp});
        properties.object.bypassInApp = !properties.object.bypassInApp;
    }

    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.crossView} onPress={() => removeOverride(properties.object)}>
                <Text style={styles.cross}>x</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Override n°{properties.count+1}</Text>

            <Animated.View style={[styles.fromInputWrap, { backgroundColor }]}>
                {/* Note: was using onSubmitEditing instead of onTextInput, but it doesn't cover all cases. 
                It's not like this is really a performance issue, it really won't use a lot of cpu. 
                I prefer something being working properly than a bit more optimized 
                Edit: nvm onTextInput doesnt give a proper full text prop in the event, so using onChange*/}
                <TextInput style={styles.fromInput} onChange={(e) => updateFrom(e)} defaultValue={properties.object.from}/>
            </Animated.View>
            <Text style={styles.text}>-&gt;</Text>
            <TextInput style={styles.toInput} onChange={(e) => updateTo(e)} defaultValue={properties.object.to}/>
            
            <FormSwitchRow label="Bypass in-app browser" subLabel="Enable to open the link in your default browser/in app directly" value={reactObject.bypassInApp} onValueChange={toggleInAppBrowser}></FormSwitchRow>
            <FormSwitchRow label="Regex" subLabel="Use Regex instead of normal string matching" value={reactObject.useRegex} onValueChange={toggleRegex}></FormSwitchRow>
        </View>
    )
}
