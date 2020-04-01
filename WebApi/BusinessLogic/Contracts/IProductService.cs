using BusinessLogic.Requests;
using BusinessLogic.Responses;
using DataStorage.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public interface IProductService
    {
        Task<IList<ProductResponse>> GetAll();
        Task<int> Add(ProductRequest product);
        Task<Product> Get(int id);
        Task<int> Delete(int id);
    }
}
