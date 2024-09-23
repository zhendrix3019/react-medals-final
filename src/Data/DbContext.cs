using Microsoft.EntityFrameworkCore;

.Data  // Update this to your actual namespace
{
    public class MedalsContext : DbContext
    {
        public MedalsContext(DbContextOptions<MedalsContext> options) : base(options) { }

        public DbSet<Country> Countries { get; set; }
    }
}
