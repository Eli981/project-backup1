namespace api.Repository;
public class AccountRepository : IAccountRepository
{
  private const string _collectionName = "customers";
  private readonly IMongoCollection<User>? _collection;

  private readonly ITokenService _tokenService;

  public AccountRepository(IMongoClient client, IMongoDbSettings dbSettings, ITokenService tokenService)
  {
    var database = client.GetDatabase(dbSettings.DatabaseName);
    _collection = database.GetCollection<User>(_collectionName);
    _tokenService = tokenService;
  }
  public async Task<LoginReturnDto?> CreateAsync(RegisterDto userInput, CancellationToken cancellationToken)
  {
    bool doesUserExist = await _collection.Find<User>(user =>
         user.Email == userInput.Email.ToLower().Trim() &&
         user.UserName == userInput.UserName.ToLower().Trim()).AnyAsync(cancellationToken);

    if (doesUserExist)
      return null;

    using var hmac = new HMACSHA512();

    User signup = new User(
      Id: null,
      UserName: userInput.UserName,
      Email: userInput.Email,
      PasswordHash: hmac.ComputeHash(Encoding.UTF8.GetBytes(userInput.Password)),
      PasswordSalt: hmac.Key
  );

    if (_collection is not null)
      await _collection.InsertOneAsync(signup, null, cancellationToken);


    if (signup.Id is not null)
    {
      LoginReturnDto loginReturnDto = new LoginReturnDto(
          Id: null,
          UserName: userInput.UserName,
          Email: userInput.Email,
          Token: _tokenService.CreateToken(signup)
      );
      return loginReturnDto;
    }
    return null;
  }

  public async Task<ActionResult<DeleteResult>> DeleteById(string userId, CancellationToken cancellationToken)
  {
    return await _collection.DeleteOneAsync(doc => doc.Id == userId);
  }
}