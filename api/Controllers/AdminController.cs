namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : BaseApiController
{
    private readonly IAdminRepository _adminRepository;
    public AdminController(IAdminRepository adminRepository)
    {
        _adminRepository = adminRepository;
    }

    [HttpPost("register-admin")]
    public async Task<ActionResult<LoginAdminReturnDto?>> Create(RegisterAdminDo UserInput, CancellationToken cancellationToken)
    {
        if (UserInput.password != UserInput.ConfirmPassword)
            return BadRequest("Your password doesn`t matched");
        LoginAdminDto? loginAdminReturnDto = await _adminRepository.CreateAsync(UserInput, cancellationToken);
        if (loginAdminReturnDto is null)
            return BadRequest("This Email or Username already registered");

        LoginAdminReturnDto? signupDto = new LoginAdminReturnDto(
            Username: UserInput.Username,
            Email: UserInput.Email
        );

        return signupDto;
    }


    [HttpPost("login-admin")]
    public async Task<ActionResult<LoginAdminReturnDto?>> Login(LoginAdminDto UserInpout, CancellationToken cancellationToken)
    {
        LoginAdminReturnDto? loginAdminDto = await _adminRepository.LoginAsync(UserInpout, cancellationToken);
        if (loginAdminDto is null)
            return Unauthorized("Invalid ");


        return loginAdminDto;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<LoginReturnDto>>> GetAll(CancellationToken cancellationToken)
    {
        List<LoginReturnDto> loginReturnDtos = await _adminRepository.GetAll(cancellationToken);

        if (!loginReturnDtos.Any())
            return NoContent();

        return loginReturnDtos;
    }
}