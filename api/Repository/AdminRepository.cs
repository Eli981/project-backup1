using MongoDB.Driver;

namespace api.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private const string _collectionName = "customers";
        private readonly IMongoCollection<Admin>? _collection;

        public AdminRepository(IMongoClient client, IMongoDbSettings dbSettings)
        {
            var database = client.GetDatabase(dbSettings.DatabaseName);
            _collection = database.GetCollection<Admin>(_collectionName);
        }

        public async Task<LoginAdminDto?> CreateAsync(RegisterAdminDo userInput, CancellationToken cancellationToken)
        {
            var doesAdminExist = await _collection.Find<Admin>(adm =>
            adm.Email == userInput.Email.ToLower().Trim()).AnyAsync();

            if (doesAdminExist)
                return null;

            using var hmac = new HMACSHA512();

            Admin admin = new Admin(
            Id: null,
            UserName: userInput.Username,
            Email: userInput.Email,
            phoneNumber: userInput.phoneNumber,
            PasswordHash: hmac.ComputeHash(Encoding.UTF8.GetBytes(userInput.password)),
            PasswordSalt: hmac.Key
            );

            if (_collection is not null)
                await _collection.InsertOneAsync(admin, null, cancellationToken);

            if (admin.Id is not null)
            {
                LoginAdminDto loginAdminReturnDto = new LoginAdminDto(
                    Id: null,
                    Username: userInput.Username,
                    Email: userInput.Email,
                    password: userInput.password
                );
                return loginAdminReturnDto;
            }
            return null;
        }

        public async Task<LoginAdminReturnDto?> LoginAsync(LoginAdminDto UserInput, CancellationToken cancellationToken)
        {
            var doesAdminExist = await _collection.Find<Admin>(admin =>
            (admin.UserName == UserInput.Username.Trim().ToLower()) || admin.Email == UserInput.Email).FirstOrDefaultAsync(cancellationToken);

            if (doesAdminExist is null)
                return null;
                
            using var hmac = new HMACSHA512(doesAdminExist.PasswordSalt!);

            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(UserInput.password));

            if (doesAdminExist.PasswordHash is not null && doesAdminExist.PasswordHash.SequenceEqual(ComputeHash))
                if (doesAdminExist.Id is not null)

                    return new LoginAdminReturnDto(
                        Username: UserInput.Username,
                        Email: UserInput.Email
                    );

            return null;
        }

        public async Task<List<LoginReturnDto>> GetAll(CancellationToken cancellationToken)
        {
            List<Admin> admins = await _collection.Find<Admin>(new BsonDocument()).ToListAsync(cancellationToken);//soal porside shavad .

            List<LoginReturnDto> loginReturnDtos = new List<LoginReturnDto>();

            if (admins.Any())
            {
                foreach (Admin account in admins)
                {
                    LoginReturnDto ReturnDto = new LoginReturnDto(
                        UserName: account.UserName,
                        Email: account.Email
                    );
                    loginReturnDtos.Add(ReturnDto);
                }
                return loginReturnDtos;
            }
            return loginReturnDtos;
        }
    }
}




