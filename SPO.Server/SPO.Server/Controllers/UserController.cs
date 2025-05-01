using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using SPO.Infrastructure.EntityFramework.DbContexts;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SPO.Domain.Entities.UserRoles;
using SPO.Infrastructure.Repositories.UserRoles;
using SPO.Application.DataTransferObjects.Request.UserRoles.User;
using SPO.Domain.Wrappers;

namespace SPO.Server.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly IRoleRepository _roleRepostitory;
        private readonly IConfiguration _configuration;


        public UserController(IUserRepository userRepository, IMapper mapper, ApplicationDbContext context, IConfiguration configuration, IUserRoleRepository userRoleRepository
            , IRoleRepository roleRepostitory)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _context = context;
            _configuration = configuration;
            _userRepository = userRepository;
            _userRoleRepository = userRoleRepository;
            _roleRepostitory = roleRepostitory;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> UserGet()
        {
            var result = await _userRepository.GetAllAsync();
            return Ok(await Result<List<User>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> UserGet(string id)
        {
            var query = await _userRepository.GetByIdAsync(id);
            if (query is null) return BadRequest(await Result<User>.FailAsync("User not found."));

            return Ok(await Result<User>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest request)
        {
            var user = _context.Users.Where(x => x.Email == request.Email).FirstOrDefault();
            if (user == null)
            {
                return BadRequest(await Result<LoginUserRequest>.FailAsync("Email không tồn tại"));
            }
            else
            {
                // Dùng mật khẩu đã lưu trong database để kiểm tra
                bool isMatch = SPO.Common.Password.BCryptPasswordService.VerifyPassword(user.Passwordhash!, request.Password);
                var userRole = _userRepository.GetRoleByUserId(user.Id);
                //var userFunction = _functionDapperRepository.GetFunctionByRoleName(userRole.Result.Name);
                if (isMatch)
                {
                    var token = GenerateJwtToken(user);

                    //return Ok(await Result<User>.SuccessAsync(user));
                    return Ok(new { Token = token, user = user, status = true, role = userRole });
                }
                else
                    return BadRequest(await Result<LoginUserRequest>.FailAsync("Mật khẩu sai"));
            }

        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] CreateUserRequest request)
        {

            request.Password = SPO.Common.Password.BCryptPasswordService.HashPassword(request.Password);
            await _userRepository.AddAsync(request);
            var role = await _roleRepostitory.GetByNameAsync("user");
            var userRoleRequest = new Application.DataTransferObjects.Request.UserRoles.UserRole.CreateUserRoleRequest { Id = Guid.NewGuid().ToString(), UserId = Guid.NewGuid().ToString(), RoleId = role.Id, IsActive = true, CreatedAt = DateTime.Now };
            await _userRoleRepository.AddAsync(userRoleRequest);
            return Ok(await Result<User>.SuccessAsync());
        }

        [HttpPut("")]
        public async Task<IActionResult> UserPut([FromBody] UpdateUserRequest request)
        {
            var item = await _userRepository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<User>.FailAsync("Không tìm thấy người dùng."));

            await _userRepository.UpdateAsync(request);
            return Ok(await Result<User>.SuccessAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> UserDelete(string id)
        {
            var item = await _userRepository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<User>.FailAsync("User not found."));

            await _userRepository.DeleteAsync(id);
            return Ok(await Result<Role>.SuccessAsync());
        }

        private string GenerateJwtToken(User user)
        {
            var secretKey = _configuration["Jwt:Secret"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())  // ID duy nhất của token
            };
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(int.Parse(_configuration["Jwt:ExpireHours"]!)),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}