using Bootcamp.WebAPI.Data.Abstractions;
using Bootcamp.WebAPI.Models;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace Bootcamp.WebAPI.Data
{
    public class GenreRepository : IRepository< Genre >
    {

        private static readonly ICollection< Genre > genres;

        static GenreRepository()
        {
            genres = new Collection< Genre >
            {
                new Genre 
                {
                    Id = 1,
                    Name = "Fantasy"
                },

                new Genre
                {
                    Id = 2,
                    Name = "Action"
                },

                new Genre
                {
                    Id = 3,
                    Name = "Adventure"
                },

                new Genre
                {
                    Id = 4,
                    Name = "Sci-fi"
                }
            };
        }

        public IEnumerable<Genre> GetAll()
        {
            return genres;
        }
        public Genre Get(int id)
        {
            return genres.FirstOrDefault(m => m.Id == id);
        }

        public void Delete(int id)
        {
            var genre = genres.FirstOrDefault(m => m.Id == id);
            if (genre != null) {
                genres.Remove(genre);
            }
        }

       
        public Genre Save(Genre entity)
        {
            throw new NotImplementedException();
        }
    }
}
