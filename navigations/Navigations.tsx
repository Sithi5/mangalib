import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Components
import TestScreen from '../components/TestScreen';

type RootTabParamList = {
    Test: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarActiveTintColor: 'green',
                tabBarActiveBackgroundColor: 'lightgrey',
                tabBarInactiveBackgroundColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen
                name="Test"
                component={TestScreen}
                options={{
                    title: 'Test',
                    tabBarIcon: () => {
                        const image_name = '../images/icon_testing.png';
                        return (
                            <Image
                                style={styles.tab_bar_icon}
                                source={require(image_name)}
                            ></Image>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab_bar_icon: {
        width: 30,
        height: 30,
    },
});
