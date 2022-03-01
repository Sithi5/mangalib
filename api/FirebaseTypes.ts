import { Id } from 'globals/GlobalTypes';

export type FirestoreUserManga = {
    manga_id: Id;
    manga_name: string;
    volumes: number[];
    possessed_volumes: number[];
};

export type FirestoreUserAnime = {
    anime_id: Id;
    anime_name: string;
    episodes: number[];
    seen_episodes: number[];
};

export type FirestoreUser = {
    user_mangas_list: FirestoreUserManga[];
    user_animes_list: FirestoreUserAnime[];
    email?: string;
    username?: string;
};
// Functions args
export type ArgsFireforceGetUserData = {
    uid: string;
};

export type ArgsFireforceCreateUserData = {
    uid: string;
    email: string;
    username: string;
};

export type ArgsUpdateUserEmail = {
    uid: string;
    email: string;
};

export type ArgsUpdateUserUsername = {
    uid: string;
    username: string;
};

export type ArgsUpdateUserMangasList = {
    uid: string;
    user_mangas_list: FirestoreUserManga[];
};

export type ArgsAddMangaToUserMangasList = {
    uid: string;
    user_manga: FirestoreUserManga;
};

export type ArgsRemoveMangaFromUserMangasList = {
    uid: string;
    user_manga: FirestoreUserManga;
};

export type ArgsUpdateUserAnimesList = {
    uid: string;
    user_animes_list: FirestoreUserAnime[];
};

export type ArgsAddAnimeToUserAnimesList = {
    uid: string;
    user_anime: FirestoreUserAnime;
};

export type ArgsRemoveAnimeFromUserAnimesList = {
    uid: string;
    user_anime: FirestoreUserAnime;
};
// Functions returns
