using DataStorage.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataStorage
{
    public class AppContext : DbContext
    {
        public AppContext(DbContextOptions options) : base(options)
        {
            this.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            builder.Entity<User>().HasData(
                new User
                {
                    Id = -1,
                    Email = "admin@admin.com",
                    Name = "Admin",
                    Password = "you know it, after hash",
                    Role = "Admin"
                });
        }
    }
}
