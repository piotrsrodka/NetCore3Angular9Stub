using BusinessLogic.Requests;
using BusinessLogic.Responses;
using Core;
using DataStorage;
using DataStorage.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class UserService : IUserService
    {
        private readonly DataStorage.AppContext context;

        public UserService(DataStorage.AppContext context)
        {
            this.context = context;
        }

        public async Task<int> Add(UserRequest userRequest)
        {
            User user = userRequest.ToEntity(); ;

            if (user.Role != Role.Admin && user.Role != Role.Client)
            {
                throw new InvalidOperationException("New user should have either Admin or Client role.");
            }

            if (userRequest.Id == 0)
            {
                user.Password = HashPassword.GetHashString(user.Password);
                this.context.Users.Add(user);
            }
            else
            {
                User dbUser = await this.context.Users.SingleAsync(u => u.Id == userRequest.Id);
                dbUser.Name = user.Name;
                dbUser.Email = user.Email;
                dbUser.Role = user.Role;
                dbUser.IsActive = user.IsActive;
                this.context.Users.Update(dbUser);
            }
            
            await this.context.SaveChangesAsync();
            return user.Id;
        }

        public async Task<int> Delete(int id)
        {
            User user = await this.context.Users.FindAsync(id);
            this.context.Users.Remove(user);
            return await this.context.SaveChangesAsync();
        }

        public async Task<UserResponse> Get(int id)
        {
            User user = await this.context.Users.FindAsync(id);
            var response = new UserResponse(user);
            return response;
        }

        public async Task<IList<UserResponse>> GetAll()
        {
            var users = await this.context.Users.Select(c => new UserResponse(c)).ToListAsync();
            return users;
        }
    }
}
