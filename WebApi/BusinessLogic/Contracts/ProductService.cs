using BusinessLogic.Requests;
using BusinessLogic.Responses;
using DataStorage;
using DataStorage.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class ProductService : IProductService
    {
        private readonly AppContext context;

        public ProductService(AppContext context)
        {
            this.context = context;
        }

        public async Task<int> Add(ProductRequest productRequest)
        {
            Product product = productRequest.ToEntity();
            this.context.Products.Add(product);
            await this.context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<int> Delete(int id)
        {
            Product product = await this.context.Products.FindAsync(id);
            this.context.Products.Remove(product);
            return await this.context.SaveChangesAsync();
        }

        public async Task<Product> Get(int id)
        {
            Product product = await this.context.Products.FindAsync(id);
            return product;
        }

        public async Task<IList<ProductResponse>> GetAll()
        {
            var products = await this.context.Products.Select(c => new ProductResponse(c)).ToListAsync();
            return products;
        }
    }
}
