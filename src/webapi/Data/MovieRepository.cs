#region Using directives

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Bootcamp.WebAPI.Data.Abstractions;
using Bootcamp.WebAPI.Models;

#endregion

namespace Bootcamp.WebAPI.Data
{
    public class MovieRepository : IRepository<Movie>
    {
        /// <summary>
        /// In-memory storage for movies.
        /// Not ready for production use!
        /// </summary>
        private static readonly ICollection<Movie> movies;

        static MovieRepository()
        {
            var genreFantasy = new Genre { Id = 1, Name = "Fantasy" };
            var genreAction = new Genre { Id = 2, Name = "Action" };
            var genreAdventure = new Genre {Id = 3, Name = "Adventure"};
            var genreScifi = new Genre { Id = 4, Name = "Sci-fi" };

            movies = new Collection<Movie>
            {
                new Movie
                {
                    Id = 1, 
                    Title = "Indiana Jones and the Last Crusade",
                    Year = 1989,
                    ThumbnailUrl = "https://m.media-amazon.com/images/M/MV5BMjNkMzc2N2QtNjVlNS00ZTk5LTg0MTgtODY2MDAwNTMwZjBjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,678,1000_AL_.jpg",
                    Genres = new List<Genre> { genreAction, genreAdventure }
                    
                },
                new Movie
                {
                    Id = 2, 
                    Title = "Star Wars IV: A New Hope",
                    Year = 1977,
                    ThumbnailUrl = "https://m.media-amazon.com/images/M/MV5BMDM1NmMxMzItYWUzMC00Yzc2LTk4MzctOTdkNDVhODY2N2MxXkEyXkFqcGdeQXVyNDQ0Mjg4NTY@._V1_SY1000_CR0,0,707,1000_AL_.jpg",
                    Genres = new List<Genre> { genreAction, genreAdventure, genreScifi }
                },
                new Movie
                {
                    Id = 3, 
                    Title = "Lord of the Rings: The Return of the King",
                    Year = 2003,
                    ThumbnailUrl = "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
                    Genres = new List<Genre> { genreAdventure, genreFantasy }
                }
            };
        }

        public IEnumerable<Movie> GetAll()
        {
            return movies;
        }

        public Movie Get(int id)
        {
            return movies.FirstOrDefault(m => m.Id == id);
        }

        public Movie Save(Movie entity)
        {
            if (entity.Id > 0)
            {
                var found = movies.FirstOrDefault(m => m.Id == entity.Id);
                if (found == null)
                {
                    throw new Exception($"Movie with ID {entity.Id} not found");
                }

                found.Year = entity.Year;
                found.Title = entity.Title;
                found.Genres = entity.Genres;

                return found;
            }
            else
            {
                entity.Id = movies.Max(m => m.Id) + 1;
                movies.Add(entity);
            }

            return entity;
        }

        public void Delete(int entityId)
        {
            var movie = movies.FirstOrDefault(m => m.Id == entityId);
            if (movie != null)
            {
                movies.Remove(movie);
            }
        }
    }
}