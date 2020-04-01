using DataStorage.Entities;

namespace BusinessLogic.Responses
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ProductResponse(Product product)
        {
            Id = product.Id;
            Name = product.Name;
        }
    }
}
