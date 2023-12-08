namespace api.Models;

public record User(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    string UserName,
    string Email,
    byte[] PasswordSalt,
    byte[] PasswordHash
);

