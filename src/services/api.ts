import { MovieResponse } from '../types';
import { movieData } from './movieData';

export async function fetchMovies(): Promise<MovieResponse> {
  // Simulate API call with local data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          products: {
            items: movieData.data.products.items,
            total_count: movieData.data.products.items.length
          }
        }
      });
    }, 500); // Simulate network delay
  });
}