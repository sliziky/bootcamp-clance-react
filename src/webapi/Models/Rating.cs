using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootcamp.WebAPI.Models
{
    public class Rating : EntityBase
    {
        public float ActualRating { get; set; }
        public float MaxRating { get; set; }
        public float MinRating { get; set; }
    }
}
