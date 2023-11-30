namespace api.DTOS
{
    public record RegisterAdminDo(
        string? Id,

        [MinLength(3), MaxLength(15)] string Username,

        [MaxLength(50), RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")]
        string Email,

        [MinLength(11), MaxLength(11)] string phoneNumber,

        [DataType(DataType.Password), MinLength(6), MaxLength(8)]
        string password,

        [DataType(DataType.Password), MinLength(6), MaxLength(8)]
        string ConfirmPassword
    );

    public record LoginAdminDto(
        string? Id,
        [MinLength(3), MaxLength(15)] string Username,

        [MaxLength(50), RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")]
        string Email,
        
        [DataType(DataType.Password), MinLength(6), MaxLength(8)]
        string password
    );

    public record LoginAdminReturnDto(
        string? Username,
        string? Email
    );
}