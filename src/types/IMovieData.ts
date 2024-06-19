export interface IMovieData {
    id: number;
    name: string;
    year: number;
    rating: {
        kp: number
    };
    poster: {
        url: string
    };
    genres: IGenre[];
    countries: ICountry[];
    shortDescription: string;
    persons: IPerson[];
}

export interface IGenre {
    name: string
}

export interface ICountry {
    name: string
}

export interface IPerson {
    id: number;
    name: string
}