using Microsoft.EntityFrameworkCore;

namespace react_medals_final.Data  
{
    public class MedalsContext : DbContext
    {
        public MedalsContext(DbContextOptions<MedalsContext> options) : base(options) { }

        public DbSet<Country> Countries { get; set; }
    }
}
