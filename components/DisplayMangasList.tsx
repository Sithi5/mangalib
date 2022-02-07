import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

// Components
import MoviesItems from './MovieItem';

// Types
import type { SearchNavigationProp } from './SearchScreen';
import type { FavoritesNavigationProp } from './FavoritesScreen';
import type { MangaData } from './PersonalPersonalLibraryScreen';
import type { Id } from '../types/Id';

type Navigation = SearchNavigationProp | FavoritesNavigationProp;

type Props = {
    navigation: Navigation;
    mangas_list: MangaData[];
    page: number;
    total_page: number;
};

function isSearchNavigationProp(
    navigation: Navigation
): navigation is SearchNavigationProp {
    return (navigation as SearchNavigationProp).navigate !== undefined;
}

export default function DisplayMangasList(props: Props) {
    const { navigation, mangas_list, page, total_page } = props;

    function _navigateToMovieDetails(id: Id) {
        if (isSearchNavigationProp(navigation)) {
            // Tricks with user-defined type guard for TypeScript to be happy,  the else is actually useless here.
            navigation.navigate('MovieDetails', { id: id });
        } else {
            navigation.navigate('MovieDetails', { id: id });
        }
    }

    return (
        <FlatList
            data={movies_data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.movie_items_container}>
                    <MoviesItems
                        movie={item}
                        _navigateToMovieDetails={_navigateToMovieDetails}
                    />
                </View>
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if (page < total_page && _loadMovies !== undefined) {
                    _loadMovies();
                }
            }}
        />
    );
}

const styles = StyleSheet.create({
    movie_items_container: {
        backgroundColor: 'white',
        paddingTop: 5,
        paddingLeft: 5,
    },
});
