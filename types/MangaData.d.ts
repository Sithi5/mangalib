import type { Id } from './Id';

export type MovieData = {
    id: Id;
    title: string;
    poster_path?: string;
    vote_average?: number;
    vote_count?: number;
    vote_count?: number;
    production_companies: ProductionCompany[];
    budget?: number;
    overview?: string;
    release_date?: string;
};
