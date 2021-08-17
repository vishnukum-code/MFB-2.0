using Microsoft.EntityFrameworkCore;
using MyFightBook.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EFCore.BulkExtensions;

namespace MyFightBook.Infrastructure.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class, IBaseEntity
    {
        private readonly ApplicationDbContext _dbContext;

        public BaseRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual IQueryable<T> All()
        {
            IQueryable<T> query = _dbContext.Set<T>();
            return query;
        }

        public virtual void Add(T entity)
        {
            entity.DateCreated = DateTime.UtcNow;
            _dbContext.Set<T>().Add(entity);
        }

        public virtual void AddRange(List<T> entities)
        {
            entities.ForEach(e => e.DateCreated = DateTime.UtcNow);
            _dbContext.Set<T>().AddRange(entities);
        }

        public virtual void Update(T entityToUpdate)
        {
            _dbContext.Set<T>().Attach(entityToUpdate);
            _dbContext.Entry(entityToUpdate).State = EntityState.Modified;
        }

        public virtual Task BulkInsertOrUpdateAsync(List<T> entities)
        {
            return _dbContext.BulkInsertOrUpdateAsync(entities);
        }

        public virtual void Delete(T entityToDelete)
        {
            if (_dbContext.Entry(entityToDelete).State == EntityState.Detached)
            {
                _dbContext.Set<T>().Attach(entityToDelete);
            }
            _dbContext.Set<T>().Remove(entityToDelete);
        }

        public virtual void DeleteRange(List<T> entities)
        {
            foreach (var entity in entities.Where(e => _dbContext.Entry(e).State == EntityState.Detached))
            {
                _dbContext.Set<T>().Attach(entity);
            }

            _dbContext.Set<T>().RemoveRange(entities);
        }

        public List<string> GetModifiedColumns()
        {
            var modifiedEntries = _dbContext.ChangeTracker.Entries<T>().Where(e => e.State == EntityState.Modified).ToList();

            var modifiedColumns = new List<string>();
            foreach (var entityEntry in modifiedEntries)
            {
                foreach (var prop in entityEntry.CurrentValues.Properties)
                {
                    var current = Convert.ToString(entityEntry.CurrentValues[prop]);
                    var original = Convert.ToString(entityEntry.OriginalValues[prop]);
                    if (current != original)
                    {
                        modifiedColumns.Add(prop.Name);
                    }
                }
            }

            return modifiedColumns;
        }
    }
}
