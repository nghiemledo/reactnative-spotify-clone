namespace SPO.Domain.Entities.Base
{
    public interface IEntity
    {
    }
    public interface IEntity<TId> : IEntity
    {
        public TId Id { get; set; }
    }
}
