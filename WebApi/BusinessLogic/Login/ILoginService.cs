using BusinessLogic.Responses;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public interface ILoginService
    {
        Task<UserResponse> Authenticate(string username, string password);
    }
}
