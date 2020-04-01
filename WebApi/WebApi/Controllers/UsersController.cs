using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using BusinessLogic.Requests;
using BusinessLogic.Responses;
using BusinessLogic.Services;
using Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = Role.Admin)]
    public class UsersController : ControllerBase
    {        
        private readonly ILogger<UsersController> logger;
        private readonly IUserService userService;

        public UsersController(ILogger<UsersController> logger,
            IUserService userService)
        {
            this.logger = logger;
            this.userService = userService;
        }

        [HttpPost]
        public async Task<int> Add(UserRequest request)
        {
            int newId = await this.userService.Add(request);
            return newId;
        }

        [HttpDelete("{id}")]
        public async Task<int> Delete(int id)
        {
            int deleteResult = await this.userService.Delete(id);
            return deleteResult;
        }

        [HttpGet]
        public async Task<IEnumerable<UserResponse>> Get()
        {
            return await this.userService.GetAll();
        }

        
        // GET: users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponse>> Get(int id)
        {
            UserResponse user = await this.userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}
