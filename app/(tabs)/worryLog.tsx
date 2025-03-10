import { View, Text } from "react-native";

export default function worryLog() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text className="title">Worry Log</Text>
        </View>
    );
}