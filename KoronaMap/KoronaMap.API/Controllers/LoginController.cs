using KoronaMap.DataAccess;
using KoronaMap.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KoronaMap.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ApiDbContext _ApiDbContext;
        public LoginController()
        {
            _ApiDbContext = new ApiDbContext();
        }

        [HttpPost]
        public IActionResult CheckLogin([FromBody] User user)
        {
            var selectedUser = _ApiDbContext.Users.Where(item => item.Name == user.Name && item.Password == user.Password).FirstOrDefault();
            if (selectedUser != null)
            {
                return Ok();
            }
            return NotFound();
        }
    }
}
