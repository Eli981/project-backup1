namespace api.Interfaces;
public interface IAccountRepository
{
    public Task<LoginReturnDto?> CreateAsync(RegisterDto UserInput, CancellationToken cancellationToken);
    public Task<ActionResult<DeleteResult>> DeleteById(string userId, CancellationToken cancellationToken);
}