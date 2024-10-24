import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Film, Loader2 } from 'lucide-react';
import { MovieCard } from './components/MovieCard';
import { SearchBar } from './components/SearchBar';
import { ErrorMessage } from './components/ErrorMessage';
import { calculateSimilarity } from './utils/similarity';
import { fetchMovies } from './services/api';
import type { Movie } from './types';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedMovie, setLikedMovie] = useState('');

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMovies();
      setMovies(data.data.products.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching movies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const filteredMovies = useMemo(() => {
    if (!searchQuery) return movies;
    return movies.filter(movie => 
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  const recommendedMovies = useMemo(() => {
    if (!likedMovie) return filteredMovies;
    
    return [...filteredMovies].sort((a, b) => {
      const similarityA = calculateSimilarity(likedMovie, a.name);
      const similarityB = calculateSimilarity(likedMovie, b.name);
      return similarityB - similarityA;
    });
  }, [filteredMovies, likedMovie]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Film className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Stockholm Film Festival</h1>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search movies..."
          />
          <SearchBar 
            value={likedMovie}
            onChange={setLikedMovie}
            placeholder="Enter a movie you like for recommendations..."
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadMovies} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {likedMovie ? 'Recommended Movies' : 'All Movies'}
              </h2>
              <p className="text-gray-600">
                {recommendedMovies.length} {recommendedMovies.length === 1 ? 'movie' : 'movies'} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendedMovies.map(movie => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie}
                  similarity={likedMovie ? calculateSimilarity(likedMovie, movie.name) : undefined}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;