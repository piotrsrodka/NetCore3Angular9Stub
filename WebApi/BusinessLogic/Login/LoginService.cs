using BusinessLogic.Responses;
using Core;
using DataStorage;
using DataStorage.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class LoginService : ILoginService
    {
        private readonly AppContext context;

        public LoginService(AppContext context)
        {
            this.context = context;
        }

        public async Task<UserResponse> Authenticate(string username, string password)
        {
            User user = await this.context.Users.SingleOrDefaultAsync(u => u.Email == username);

            if (user == null)
            {
                return null;
            }

            if (user.Password == HashPassword.GetHashString(password))
            {
                var response = new UserResponse(user);
                return response;
            }

            return null;
        }
    }
}
