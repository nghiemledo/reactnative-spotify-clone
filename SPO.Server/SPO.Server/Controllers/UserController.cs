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
using SPO.Infrastructure.Repositories;
using SPO.Application.DataTransferObjects.Request.UserToken;
using System.Security.Cryptography;

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
        private readonly IUserTokenRepository _userTokenRepository;

        public UserController(IUserRepository userRepository, IMapper mapper, ApplicationDbContext context, IConfiguration configuration, IUserRoleRepository userRoleRepository
            , IRoleRepository roleRepostitory, IUserTokenRepository userTokenRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _context = context;
            _configuration = configuration;
            _userRepository = userRepository;
            _userRoleRepository = userRoleRepository;
            _roleRepostitory = roleRepostitory;
            _userTokenRepository = userTokenRepository;
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

        //[HttpPost]
        //[Route("login")]
        //public async Task<IActionResult> Login([FromBody] LoginUserRequest request)
        //{
        //    var user = _context.Users.Where(x => x.Email == request.Email).FirstOrDefault();
        //    if (user == null)
        //    {
        //        return BadRequest(await Result<LoginUserRequest>.FailAsync("Email không tồn tại"));
        //    }
        //    else
        //    {
        //        // Dùng mật khẩu đã lưu trong database để kiểm tra
        //        bool isMatch = SPO.Common.Password.BCryptPasswordService.VerifyPassword(user.Passwordhash!, request.Password);
        //        var userRole = _userRepository.GetRoleByUserId(user.Id);
        //        //var userFunction = _functionDapperRepository.GetFunctionByRoleName(userRole.Result.Name);
        //        if (isMatch)
        //        {
        //            var token = GenerateJwtToken(user);

        //            //return Ok(await Result<User>.SuccessAsync(user));
        //            return Ok(new { Token = token, user = user, status = true, role = userRole });
        //        }
        //        else
        //            return BadRequest(await Result<LoginUserRequest>.FailAsync("Mật khẩu sai"));
        //    }

        //}

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest request)
        {
            var user = _context.Users.Where(x => x.Email == request.Email).FirstOrDefault();
            if (user == null)
            {
                return BadRequest(await Result<LoginUserRequest>.FailAsync("Email does not exist"));
            }
            else
            {
                bool isMatch = SPO.Common.Password.BCryptPasswordService.VerifyPassword(user.Passwordhash!, request.Password);
                var userRole = await _userRoleRepository.GetRoleByUserId(user.Id);
                if (isMatch)
                {
                    var token = GenerateJwtToken(user);
                    var refreshToken = GenerateRefreshToken();
                    var userToken = new CreateUserTokenRequest
                    {
                        UserId = user.Id,
                        Value = refreshToken,
                        LoginProvider = "Local",
                        Name = "RefreshToken",
                        Expires = DateTime.UtcNow.AddDays(7)
                    };
                    _userTokenRepository.AddAsync(userToken);

                    return Ok(new { Token = token, RefreshToken = refreshToken, user = user, status = true, role = userRole });
                }
                else
                    return BadRequest(await Result<LoginUserRequest>.FailAsync("Wrong password"));
            }
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest ReToken)
        {
            var refreshToken = await _userTokenRepository.GetByValueAsync(ReToken.token);
            if (refreshToken == null || refreshToken.Expires < DateTime.Now)
                return Unauthorized();

            var user = await _userRepository.GetByIdAsync(refreshToken.UserId);
            var newAccessToken = GenerateJwtToken(user);

            return Ok(new { token = newAccessToken });
        }

       
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
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