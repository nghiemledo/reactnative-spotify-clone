using Microsoft.AspNetCore.Mvc;
using SPO.Application.DataTransferObjects.Request.Payment;
using SPO.Domain.Entities;
using SPO.Domain.Wrappers;
using SPO.Infrastructure.Repositories;

namespace SPO.Server.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepository _repository;

        public PaymentController(IPaymentRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> PaymentsGet()
        {
            var result = await _repository.GetAllAsync();
            return Ok(await Result<List<Payment>>.SuccessAsync(result.ToList()));
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult> PaymentGetByUserId(string userId)
        {
            var query = await _repository.GetByUserIdAsync(userId);
            if (query is null) return BadRequest(await Result<Payment>.FailAsync("Payment not found."));

            return Ok(await Result<Payment>.SuccessAsync(query));
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> PaymentPost([FromBody] CreatePaymentRequest request)
        {
            var newPayment = await _repository.AddAsync(request);
            return Ok(await Result<Payment>.SuccessAsync(newPayment));
        }

        [HttpPut]
        [Route("")]
        public async Task<IActionResult> PaymentPut([FromBody] UpdatePaymentRequest request)
        {
            var item = await _repository.GetByIdAsync(request.Id);
            if (item is null) return BadRequest(await Result<Payment>.FailAsync("Payment not found."));

            var updatedPayment = await _repository.UpdateAsync(request);
            return Ok(await Result<Payment>.SuccessAsync(updatedPayment));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> PaymentDelete(string id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item is null) return BadRequest(await Result<Payment>.FailAsync("Payment not found."));

            await _repository.DeleteAsync(id);
            return Ok(await Result<Payment>.SuccessAsync());
        }
    }
}
