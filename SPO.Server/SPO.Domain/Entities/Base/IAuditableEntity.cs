namespace SPO.Domain.Entities.Base;
public interface IAuditableEntity<TId> : IAuditableEntity, IEntity<TId>
{
}

public interface IAuditableEntity : IEntity
{
    //string? CreatedBy { get; set; }

    DateTimeOffset CreatedAt { get; set; }

    //string? UpdatedBy { get; set; }

    DateTimeOffset? UpdatedAt { get; set; }

    //bool IsDeleted { get; set; }
}