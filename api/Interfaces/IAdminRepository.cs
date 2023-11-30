namespace api.Interfaces
{
    public interface IAdminRepository
    {
        public Task<LoginAdminDto?> CreateAsync(RegisterAdminDo UserInput, CancellationToken cancellationToken);
        public Task<LoginAdminReturnDto?> LoginAsync(LoginAdminDto UserInput, CancellationToken cancellationToken);
        public Task<List<LoginReturnDto>> GetAll(CancellationToken cancellationToken);

    }

}