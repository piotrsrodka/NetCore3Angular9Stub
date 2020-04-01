using System.Threading.Tasks;
using BusinessLogic.Requests;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {        
        private readonly ILogger<UsersController> logger;
        private readonly ILoginService loginService;

        public LoginController(ILogger<UsersController> logger,
            ILoginService userService)
        {
            this.logger = logger;
            this.loginService = userService;
        }
        
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest request)
        {
            var user = await this.loginService.Authenticate(request.Username, request.Password);

            if (user != null)
            {
                return Ok(user);
            }

            return Unauthorized();
        }
    }
}
