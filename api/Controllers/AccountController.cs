namespace api.Controllers;

public class AccountController(IAccountRepository _accountRepository) : BaseApiController
{


    [HttpPost("register")]
    public async Task<ActionResult<LoginReturnDto?>> Create(RegisterDto UserInput, CancellationToken cancellationToken)
    {
        if (UserInput.Password != UserInput.ConfirmPassword)
            return BadRequest("Your password doesn`t matched");

        LoginReturnDto? loginReturnDto = await _accountRepository.CreateAsync(UserInput, cancellationToken);

        if (loginReturnDto is null)
            return BadRequest("Email or username already registered");

        return loginReturnDto;

    }

    [HttpDelete("delete/{userId}")]
    public async Task<ActionResult<DeleteResult>> DeleteById(string userId, CancellationToken cancellationToken)
    {
        return await _accountRepository.DeleteById(userId, cancellationToken);

    }
}