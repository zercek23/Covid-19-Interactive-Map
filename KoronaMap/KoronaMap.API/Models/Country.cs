using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace KoronaMap.Entities
{
    public class Country
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [NotMapped]
        public int TotalCase { get; set; }
        [NotMapped]
        public int TotalRecovered { get; set; }
        [NotMapped]
        public int TotalDeaths { get; set; }
    }
}
