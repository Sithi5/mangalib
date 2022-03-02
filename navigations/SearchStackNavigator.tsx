import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ORANGE } from 'globals/AppStyles';
import { ItemDetailsScreen } from 'screens';
import { SearchStackParamList } from './NavigationsTypes';
import SearchTopTabNavigator from './SearchTopTabNavigator';

const SearchStack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchStackNavigator() {
    return (
        <SearchStack.Navigator initialRouteName="SearchTopTab">
            <SearchStack.Screen
                name="SearchTopTab"
                component={SearchTopTabNavigator}
                options={{
                    headerShown: true,
                    title: 'Search',
                    headerTitleStyle: { color: ORANGE },
                }}
            />
            <SearchStack.Screen
                name="ItemDetails"
                component={ItemDetailsScreen}
                options={() => ({
                    headerShown: false,
                })}
            />
        </SearchStack.Navigator>
    );
}
