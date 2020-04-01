using DataStorage.Entities;

namespace BusinessLogic.Requests
{
    public class ProductRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Product ToEntity()
        {
            return new Product
            {
                Id = this.Id,
                Name = this.Name,
            };
        }
    }
}
