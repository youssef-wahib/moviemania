export type Content = {
  readonly id: number;
  readonly media_type: string;
  readonly title: string;
  readonly overview: string;
  readonly name: string;
  readonly original_name: string;
  readonly release_date: string;
  readonly first_air_date: string;
  readonly vote_average: number;
  readonly poster_path: string | null;
};
export type Results = {
  readonly page: number;
  readonly results: Content[];
  readonly total_pages: number;
  readonly total_results: number;
};
