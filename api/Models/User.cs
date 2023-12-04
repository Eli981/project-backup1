namespace api.Models;

public record User(
[property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
string UserName,
[EmailAddress] string Email,
byte[] PasswordSalt,
byte[] PasswordHash
);

