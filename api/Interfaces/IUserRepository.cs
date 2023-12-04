namespace api.Interfaces;

public interface IUserRepository
{
    public Task<LoginReturnDto?> LoginAsync(LoginDto UserInput, CancellationToken cancellationToken);
    public Task<ActionResult<UpdateResult>> UpdateById(string userId, RegisterDto userInput, CancellationToken cancellationToken);

}
