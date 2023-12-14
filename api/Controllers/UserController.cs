namespace api.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("login-user")]
        public async Task<ActionResult<LoginReturnDto?>> Login(LoginDto userInput, CancellationToken cancellationToken)
        {
            LoginReturnDto? loginReturnDto = await _userRepository.LoginAsync(userInput, cancellationToken);

            if (loginReturnDto is null)

                return Unauthorized("Invalid");

            return loginReturnDto;
        }

        [HttpPut("update/{userId}")]
        public async Task<ActionResult<UpdateResult>> UpdateById(string userId, RegisterDto userInput, CancellationToken cancellationToken)
        {
            if (userInput.Password != userInput.ConfirmPassword)
                return BadRequest("Password don`t match ");

            return await _userRepository.UpdateById(userId, userInput, cancellationToken);
        }
    }
}