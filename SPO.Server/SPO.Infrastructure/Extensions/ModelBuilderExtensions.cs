using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SPO.Domain.Entities.UserRoles;

namespace SPO.Infrastructure.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void AddConfiguration<TEntity>(
         this ModelBuilder modelBuilder,
         DbEntityConfiguration<TEntity> entityConfiguration) where TEntity : class
        {
            modelBuilder.Entity<TEntity>(entityConfiguration.Configure);
        }

        public static void Seed(this ModelBuilder builder)
        {

            //Insert into for Role
            var roleId1 = new Guid("8d04dce2-969a-435d-bba4-df3f325983dc").ToString();
            var roleId2 = new Guid("8d04dce2-969a-435d-bba4-df3f325984dd").ToString();
            var roleId3 = new Guid("8d04dce2-969a-435d-bba4-df3f325985de").ToString();
            builder.Entity<Role>().HasData(new Role { Id = roleId1, Name = "SysAdmin" });
            builder.Entity<Role>().HasData(new Role { Id = roleId2, Name = "Admin" });
            builder.Entity<Role>().HasData(new Role { Id = roleId3, Name = "User" });

            //Insert into for User
            var userId1 = new Guid("8d04dce2-969a-435d-bba4-df3f325083da").ToString();
            var userId2 = new Guid("8d04dce2-969a-435d-bba4-df3f325184db").ToString();
            var userId3 = new Guid("8d04dce2-969a-435d-bba4-df3f325285dc").ToString();
            //pass: string
            string passhash = "$2a$10$uy.4JI.KZh90HszFKU.MWu/JxxJhlJ0MYdTn5pLtJpKNOLqcdRfmW";

            builder.Entity<User>().HasData(new User { Id = userId1, FirstName = "Nghiem", LastName = "Le Do", FullName = "Le Do Nghiem", Gender = true, Email = "nghiemledo@gmail.com", Passwordhash = passhash });
            builder.Entity<User>().HasData(new User { Id = userId2, FirstName = "Truong", LastName = "Nguyen Xuan", FullName = "Nguyen Xuan Truong", Gender = true, Email = "nxtruong@gmail.com", Passwordhash = passhash });
            builder.Entity<User>().HasData(new User { Id = userId3, FirstName = "Long", LastName = "Hoang Hai", FullName = "Hoang Hai Long", Gender = true, Email = "long2k7it@gmail.com", Passwordhash = passhash });

            //Insert into UserRole
            var userRoleId1 = new Guid("8d04dce2-969a-435d-bba4-df3f315083da").ToString();
            var userRoleId2 = new Guid("8d04dce2-969a-435d-bba4-df3f335184db").ToString();
            var userRoleId3 = new Guid("8d04dce2-969a-435d-bba4-df3f345285dc").ToString();
            builder.Entity<UserRole>().HasData(new UserRole { Id = userRoleId1, UserId = userId1, RoleId = roleId1, IsActive = true });
            builder.Entity<UserRole>().HasData(new UserRole { Id = userRoleId2, UserId = userId2, RoleId = roleId2, IsActive = true });
            builder.Entity<UserRole>().HasData(new UserRole { Id = userRoleId3, UserId = userId3, RoleId = roleId3, IsActive = true });
        }
        public abstract class DbEntityConfiguration<TEntity> where TEntity : class
        {
            public abstract void Configure(EntityTypeBuilder<TEntity> entity);
        }
    }
}
