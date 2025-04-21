using CarRent.Server.Data;
using CarRent.Server.Dtos.Account;
using CarRent.Server.Extensions;
using CarRent.Server.Interfaces;
using CarRent.Server.Mappers;
using CarRent.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Server.Controllers
{
    [Route("api/auth")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly ApplicationDbContext _context;
        private readonly IImageService _imageService;

        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser>
            signInManager,
            ITokenService tokenService,
            IImageService imageService,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _imageService = imageService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());

                if (user == null) return Unauthorized("Invalid username!");

                var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect!");

                var refreshToken = await _tokenService.GenerateRefreshToken(user, loginDto.DeviceId);

                SetRefreshTokenCookie(refreshToken.Token);

                var roles = await _userManager.GetRolesAsync(user);
                var accessToken = await _tokenService.GenerateAccessToken(user);
                var expiresAt = DateTime.UtcNow.AddMinutes(15);

                return Ok
                    (
                        new NewUserDto
                        {
                            Username = user.UserName,
                            Email = user.Email,
                            ProfileImageUrl = user.ProfileImageUrl,
                            Token = accessToken,
                            ExpiresAt = expiresAt,
                            Roles = roles.ToList()
                        }
                    );
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new ApplicationUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    PhoneNumber = registerDto.Phone
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");

                    if (roleResult.Succeeded)
                    {
                        var refreshToken = await _tokenService.GenerateRefreshToken(appUser, registerDto.DeviceId);

                        SetRefreshTokenCookie(refreshToken.Token);

                        var roles = new List<string> { "User" };

                        return Ok(new NewUserDto
                        {
                            Username = appUser.UserName,
                            Email = appUser.Email,
                            ProfileImageUrl = appUser.ProfileImageUrl,
                            Token = await _tokenService.GenerateAccessToken(appUser),
                            Roles = roles,
                            ExpiresAt = DateTime.UtcNow.AddMinutes(15)
                        });
                    }
                    else
                    {
                        return BadRequest(roleResult.Errors);
                    }
                }
                else
                {
                    return BadRequest(createdUser.Errors);
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var refreshToken = Request.Cookies["refreshToken"];
                var storedToken = await _context.RefreshTokens
                    .FirstOrDefaultAsync(t => t.Token == refreshToken && t.DeviceId == refreshTokenDto.DeviceId);

                if (storedToken == null)
                {
                    return NotFound("No refresh token found");
                }

                var userId = await _tokenService.GetUserIdFromRefreshToken(refreshToken);

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    return BadRequest("User not found");
                }

                var isValid = await _tokenService.ValidateRefreshToken(userId, refreshToken, refreshTokenDto.DeviceId);

                if (!isValid)
                {
                    RemoveRefreshTokenCookie();
                    return BadRequest("Invalid refresh token or expired");
                }

                var newRefreshToken = await _tokenService.GenerateRefreshToken(user, refreshTokenDto.DeviceId);
                var newAccessToken = await _tokenService.GenerateAccessToken(user);
                var roles = await _userManager.GetRolesAsync(user);
                var expiresAt = DateTime.UtcNow.AddMinutes(15);

                SetRefreshTokenCookie(newRefreshToken.Token);

                return Ok(new NewUserDto
                {
                    Username = user.UserName,
                    Email = user.Email,
                    ProfileImageUrl = user.ProfileImageUrl,
                    Token = newAccessToken,
                    ExpiresAt = expiresAt,
                    Roles = roles.ToList()
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout([FromBody] LogoutDto logoutDto)
        {
            try
            {
                var userId = User.GetUserId();

                if (string.IsNullOrEmpty(userId))
                    return BadRequest("User not found");

                if (!string.IsNullOrEmpty(logoutDto.DeviceId))
                {
                    await _tokenService.RevokeRefreshToken(userId, logoutDto.DeviceId);
                    RemoveRefreshTokenCookie();

                    return Ok(new { messsage = "Logged out from device successfully" });
                }

                await _tokenService.RevokeAllRefreshTokens(userId);
                RemoveRefreshTokenCookie();

                return Ok(new { messsage = "Logged out from all devices successfully" });
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPut("update-avatar")]
        [Consumes("multipart/form-data")]
        [Authorize]
        public async Task<IActionResult> UpdateProfileImage([FromForm] CreateProfileDto profileDto)
        {
            if (profileDto.ProfileImage == null)
            {
                return BadRequest("No file uploaded.");
            }
            var userId = User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            var imageUrl = await _imageService.SaveImageAsync(profileDto.ProfileImage, "profile");

            user.ProfileImageUrl = imageUrl;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest("Failed to update profile image!");
            }

            return Ok(new { ProfileImageUrl = user.ProfileImageUrl });
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetUserProfile()
        {
            var userId = User.GetUserId();
            var user = await _userManager.Users
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user.ToProfileDto());
        }
        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
                Secure = true,
                SameSite = SameSiteMode.Strict
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
        private void RemoveRefreshTokenCookie()
        {
            Response.Cookies.Delete("refreshToken");
        }

    }

}
