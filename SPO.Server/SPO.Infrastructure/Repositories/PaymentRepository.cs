using SPO.Application.DataTransferObjects.Request.Payment;
using SPO.Domain.Entities;
using SPO.Infrastructure.Dappers.Base;

namespace SPO.Infrastructure.Repositories
{
    public interface IPaymentRepository
    {
        Task<Payment> AddAsync(CreatePaymentRequest vm);
        Task<Payment> UpdateAsync(UpdatePaymentRequest vm);
        Task<bool> DeleteAsync(string id);
        Task<Payment?> GetByIdAsync(string id);
        Task<Payment?> GetByUserIdAsync(string userId);
        Task<IEnumerable<Payment>> GetAllAsync();
    }

    public class PaymentRepository : IPaymentRepository
    {
        private readonly IDapperBase _db;
        public PaymentRepository(IDapperBase db) { _db = db; }

        public async Task<Payment> AddAsync(CreatePaymentRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.PaymentMethod,
                    vm.Amount,
                    vm.Status,
                    vm.UserId,
                    Id = Guid.NewGuid().ToString()
                };

                await _db.SaveData("[SP_SPO_InsertPayment]", parameters);

                var newPayment = await _db.GetData<Payment, dynamic>(
                    "[SP_SPO_GetPaymentById]",
                    new { Id = parameters.Id }
                );

                return newPayment.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying insert Payment", ex);
            }
        }

        public async Task<Payment> UpdateAsync(UpdatePaymentRequest vm)
        {
            try
            {
                var parameters = new
                {
                    vm.Id,
                    vm.PaymentMethod,
                    vm.Amount,
                    vm.Status,
                };

                await _db.SaveData("[SP_SPO_UpdatePayment]", parameters);
                var updatedExamPart = await _db.GetData<Payment, dynamic>(
                    "[SP_SPO_GetPaymentById]",
                    new { Id = vm.Id }
                );

                return updatedExamPart.FirstOrDefault() ?? throw new Exception("Cannot get data.");
            }
            catch (Exception ex)
            {
                throw new Exception("Error occured when trying update Payment", ex);
            }
        }

        public async Task<bool> DeleteAsync(string id)
        {
            try
            {
                await _db.SaveData("SP_SPO_DeletePayment", new { Id = id });
                return true;
            }
            catch (Exception) { return false; }
        }


        public async Task<Payment?> GetByIdAsync(string id)
        {
            IEnumerable<Payment> result = await _db.GetData<Payment, dynamic>("[SP_SPO_GetPaymentById]", new { Id = id });
            return result.FirstOrDefault();
        }

        public async Task<Payment?> GetByUserIdAsync(string userId)
        {
            IEnumerable<Payment> result = await _db.GetData<Payment, dynamic>("[SP_SPO_GetPaymentByUserId]", new { userId = userId });
            return result.FirstOrDefault();
        }

        public async Task<IEnumerable<Payment>> GetAllAsync()
        {
            string query = "[SP_SPO_GetAllPayments]";
            return await _db.GetData<Payment, dynamic>(query, new { });
        }
    }
}
