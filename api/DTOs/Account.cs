namespace api.DTOS
{
    public record RegisterDto(
    string? Id,

    [MinLength(3), MaxLength(15)] string UserName,

    [MaxLength(50), RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")]
    string Email,

    [DataType(DataType.Password), MinLength(6), MaxLength(8)]
    string Password,

    [DataType(DataType.Password), MinLength(6), MaxLength(8)]
    string ConfirmPassword

    );

    public record LoginDto(
    [MinLength(3), MaxLength(15)] string UserName,

    [MaxLength(50), RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")]
    string Email,

    [DataType(DataType.Password), MinLength(6), MaxLength(8)]
    string Password
    );

    public record LoginReturnDto(
        string? Id,
        string UserName,
        string Email,
        string Token
    );



    
}
