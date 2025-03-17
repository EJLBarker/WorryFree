import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'black', tabBarInactiveTintColor: 'grey' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: () => <FontAwesome size={28} name="home" color={"grey"} />,
                }}
            />
            <Tabs.Screen
                name="worryLog"
                options={{
                    title: 'Worry Log',
                    tabBarIcon: () => <FontAwesome size={28} name="book" color={"grey"} />,
                }}
            />
        </Tabs>
    );
}