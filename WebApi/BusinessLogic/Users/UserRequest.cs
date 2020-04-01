using DataStorage.Entities;

namespace BusinessLogic.Requests
{
    public class UserRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; }

        public User ToEntity()
        {
            return new User
            {
                Id = this.Id,
                Name = this.Name,
                Email = this.Email,
                Password = this.Password,
                Role = this.Role,
                IsActive = this.IsActive
            };
        }
    }
}
