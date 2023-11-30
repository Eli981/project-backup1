namespace api.Models;

public record Account(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    string UserName,
    string Email,
    byte[] PasswordSalt,
    byte[] PasswordHash
);

