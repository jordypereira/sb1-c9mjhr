import { Movie, MovieDetails } from '../types';

export function transformMovieData(movie: Movie): MovieDetails {
  const details: MovieDetails = {
    name: movie.name,
    genre: [],
    sections: [],
    filmTitle: movie.name,
  };

  movie.custom_attributes.forEach(attr => {
    const code = attr.attribute_metadata.code;
    const options = attr.selected_attribute_options.attribute_option;

    if (!options) return;

    switch (code) {
      case 'genre':
        details.genre = options.map(opt => opt.label);
        break;
      case 'sektion':
        details.sections = options.map(opt => opt.label);
        break;
      case 'filmtitle':
        details.filmTitle = options[0]?.label || movie.name;
        break;
      case 'productionyear':
        if (options[0]?.label) {
          details.year = options[0].label;
        }
        break;
      case 'length':
        if (options[0]?.label) {
          details.length = options[0].label;
        }
        break;
    }
  });

  return details;
}