interface LevenshteinResponse {
    source: string;
    target: string;
    minimumDistance: number;
    listMatrix: Array<number[]>;
}