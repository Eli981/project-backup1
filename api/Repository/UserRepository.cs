namespace api.Repository;

public class UserRepository : IUserRepository
{
    private const string _collectionName = "customers";
    private readonly IMongoCollection<User>? _collection;

    public UserRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<User>(_collectionName);
    }


    public async Task<LoginReturnDto?> LoginAsync(LoginDto userInput, CancellationToken cancellationToken)
    {
        var doesUserExist = await _collection.Find<User>(user =>
        user.Email == userInput.Email.Trim().ToLower()).FirstOrDefaultAsync(cancellationToken);

        if (doesUserExist is null)
            return null;

        using var hmac = new HMACSHA512(doesUserExist.PasswordSalt!);

        var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userInput.Password));

        if (doesUserExist.PasswordHash is not null && doesUserExist.PasswordHash.SequenceEqual(ComputeHash))
        {
            if (doesUserExist.Id is not null)
            {
                return new LoginReturnDto(
                    UserName: userInput.UserName,
                    Email: userInput.Email
                );
            }
        }

        return null;
    }

    public async Task<ActionResult<UpdateResult>> UpdateById(string userId, RegisterDto userInput, CancellationToken cancellationToken)
    {
        var updateAccount = Builders<User>.Update
        .Set((User doc) => doc.Email, userInput.Email)
        .Set(doc => doc.UserName, userInput.UserName);
        // .Set(doc => doc.Password, userInput.Password)
        // .Set(doc => doc.confirmPassword, userInput.ConfirmPassword);

        return await _collection.UpdateOneAsync<User>(doc => doc.Id == userId, updateAccount);
    }
}
