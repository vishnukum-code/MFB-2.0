using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFightBook.Domain
{
    public interface IBaseRepository<T> where T : class, IBaseEntity
    {
        IQueryable<T> All();
        void Add(T entity);
        void AddRange(List<T> entities);
        void Update(T entityToUpdate);

        Task BulkInsertOrUpdateAsync(List<T> entities);

        void Delete(T entityToDelete);
        void DeleteRange(List<T> entities);

        /// <summary>
        /// Get modified columns for specific entity.
        /// </summary>
        List<string> GetModifiedColumns();
    }
}
