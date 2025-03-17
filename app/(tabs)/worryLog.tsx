import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { add, format } from 'date-fns';
import { FontAwesome } from "@expo/vector-icons";

interface Worry {
    id: string;
    text: string;
    date: string;
    scheduledTime?: string;
}

export default function worryLog() {
    const [worries, setWorries] = useState<Worry[]>([]);
    const [newWorry, setNewWorry] = useState('');

    const loadWorries = async () => {
        try {
            const stored = await AsyncStorage.getItem('worries');
            if (stored) {
                setWorries(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading worries:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadWorries();
        }, [])
    );

    const addWorry = async () => {
        if (newWorry.trim()) {
            const worry = {
                id: (worries.length + 1).toString(),
                text: newWorry,
                date: new Date().toISOString(),
            };
            setWorries([...worries, worry]);
            setNewWorry('');
            try {
                await AsyncStorage.setItem('worries', JSON.stringify([...worries, worry]));
            } catch (error) {
                console.error('Error saving worry:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {worries.map((worry) => (
                    <View key={worry.id} style={styles.worryCard}>
                        <Text style={styles.worryText}>{worry.text}</Text>
                        <Text style={styles.dateText}>{format(new Date(worry.date), 'MMM d, yyyy')}</Text>

                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a worry..."
                    multiline
                    value={newWorry}
                    onChangeText={setNewWorry}
                />
                <Pressable style={styles.addButton} onPress={addWorry}><FontAwesome size={28} name="plus" color={"white"} /></Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#878787',
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    worryCard: {
        backgroundColor: '#adadad',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    worryText: {
        color: '#fffffe',
        fontSize: 16,
        marginBottom: 8,
    },
    dateText: {
        color: '#3d3d3d',
        fontSize: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#adadad',
    },
    input: {
        flex: 1,
        backgroundColor: '#878787',
        borderRadius: 8,
        padding: 12,
        color: '#fffffe',
        marginRight: 12,
    },
    addButton: {
        backgroundColor: '#7f5af0',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
});