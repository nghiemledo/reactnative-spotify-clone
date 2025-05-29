USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[[SP_SPO_UpdatePayment]]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [[SP_SPO_UpdatePayment]]
create procedure [dbo].[SP_SPO_UpdatePayment] (
    @Id varchar(450),
    @PaymentMethod varchar(max),
	@Amount float,
	@Status varchar(50)
)
as
begin
   update dbo.Payments set PaymentMethod = @PaymentMethod, Amount = @Amount, Status = @Status, UpdatedAt = SYSDATETIMEOFFSET()
   where Id = @Id
end
go



