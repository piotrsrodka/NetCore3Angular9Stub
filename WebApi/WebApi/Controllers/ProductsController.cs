using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLogic.Requests;
using BusinessLogic.Responses;
using BusinessLogic.Services;
using Core;
using DataStorage.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = Role.AdminOrClient)]
    public class ProductsController : ControllerBase
    {        
        private readonly ILogger<ProductsController> logger;
        private readonly IProductService productService;

        public ProductsController(ILogger<ProductsController> logger,
            IProductService productService)
        {
            this.logger = logger;
            this.productService = productService;
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost]
        public async Task<int> Add(ProductRequest request)
        {
            int newId = await this.productService.Add(request);
            return newId;
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<int> Delete(int id)
        {
            int deleteResult = await this.productService.Delete(id);
            return deleteResult;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductResponse>> Get()
        {
            return await this.productService.GetAll();
        }

        // GET: products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponse>> Get(int id)
        {
            Product product = await this.productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            var response = new ProductResponse(product);

            return response;
        }
    }
}
