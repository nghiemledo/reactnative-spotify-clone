USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertPayment]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertPayment]
create procedure [dbo].SP_SPO_InsertPayment (
    @Id varchar(max),
    @PaymentMethod varchar(max),
	@Amount float,
	@Status varchar(50),
	@UserId varchar(max)
)
as
begin
    insert into dbo.Payments( 
        Id, 
        PaymentMethod,
        Amount,
        [Status],
        UserId,
		PaymentDate,
		CreatedAt,
		UpdatedAt
     )
    values (
        @Id,  
        @PaymentMethod,
        @Amount,
        @Status,
		@UserId,
        SYSDATETIMEOFFSET(),
        SYSDATETIMEOFFSET(),
		null
        );
end
go



