namespace api.Models;

public record Admin(
[property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
 string UserName,
 string Email,
 string phoneNumber,
 byte[] PasswordHash,
 byte[] PasswordSalt
);
