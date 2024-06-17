export interface IMovieData {
    id: number;
    name: string;
    year: number;
    rating: {
        kp: number
    };
    poster: {
        url: string
    }
}
