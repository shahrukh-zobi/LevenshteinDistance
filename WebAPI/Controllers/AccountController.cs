using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AccountController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Login
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        public IActionResult Login(LoginModel model)
        {
            try
            {
                // model validation
                if (!ModelState.IsValid)
                    return BadRequest(model);
                // credential verification
                if (model.Username == "admin" && model.Password == "admin")
                {
                    //generating jwt token with username
                    string token = Utilities.GenerateAccessToken(model.Username, _configuration);

                    // return generated JWT token
                    return Ok(new { token = token });
                }
                return BadRequest(model);
            }
            catch (Exception ex)
            {
                // return if there is any error
                return BadRequest(ex);
            }
        }
    }
}
