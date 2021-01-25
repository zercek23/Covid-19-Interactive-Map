using KoronaMap.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace KoronaMap.DataAccess
{
    class ApiDbContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=DESKTOP-D8O50B4;Database=KoronaMap;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<VirusCase> VirusCases { get; set; }
    }
}
