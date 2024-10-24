import React from 'react';
import { Movie } from '../types';
import { transformMovieData } from '../utils/movieTransform';
import { Tag } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  similarity?: number;
}

export function MovieCard({ movie, similarity }: MovieCardProps) {
  const details = transformMovieData(movie);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      {/* <div className="relative aspect-[2/3] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <Tag className="w-12 h-12 text-gray-600" />
        </div>
        {similarity !== undefined && (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
            {Math.round(similarity * 100)}% match
          </div>
        )}
      </div> */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">
          {details.filmTitle}
        </h3>
        <div className="space-y-2">
          {details.year && (
            <p className="text-sm text-gray-600">Year: {details.year}</p>
          )}
          {details.length && (
            <p className="text-sm text-gray-600">Length: {details.length}</p>
          )}
          {details.genre.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {details.genre.map((genre, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
          {details.sections.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {details.sections.map((section, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                >
                  {section}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
