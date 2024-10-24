export interface MovieAttribute {
  selected_attribute_options: {
    attribute_option: Array<{
      label: string;
    }> | null;
  };
  attribute_metadata: {
    code: string;
  };
}

export interface Movie {
  id?: string;
  name: string;
  custom_attributes: MovieAttribute[];
}

export interface MovieDetails {
  name: string;
  genre: string[];
  sections: string[];
  filmTitle: string;
  year?: string;
  length?: string;
}

export interface MovieResponse {
  data: {
    products: {
      items: Movie[];
      total_count: number;
    };
  };
}