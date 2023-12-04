namespace api.Repository;
public class AccountRepository : IAccountRepository
{
  private const string _collectionName = "customers";
  private readonly IMongoCollection<Account>? _collection;

  // private readonly ItokenService _tokenService;


  public AccountRepository(IMongoClient client, IMongoDbSettings dbSettings)
  {
    var database = client.GetDatabase(dbSettings.DatabaseName);
    _collection = database.GetCollection<Account>(_collectionName);
    // _tokenService = tokenService;
  }
  public async Task<LoginReturnDto?> CreateAsync(RegisterDto userInput, CancellationToken cancellationToken)
  {
    bool doesUserExist = await _collection.Find<Account>(user =>
         user.Email == userInput.Email.ToLower().Trim() &&
         user.UserName == userInput.UserName.ToLower().Trim()).AnyAsync(cancellationToken);

    if (doesUserExist)
      return null;

    using var hmac = new HMACSHA512();

    Account signup = new Account(
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
          UserName: userInput.UserName,
          Email: userInput.Email
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