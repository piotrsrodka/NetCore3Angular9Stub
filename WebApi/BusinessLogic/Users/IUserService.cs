using BusinessLogic.Requests;
using BusinessLogic.Responses;
using DataStorage.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public interface IUserService
    {
        Task<IList<UserResponse>> GetAll();
        Task<int> Add(UserRequest user);
        Task<UserResponse> Get(int id);
        Task<int> Delete(int id);
    }
}
