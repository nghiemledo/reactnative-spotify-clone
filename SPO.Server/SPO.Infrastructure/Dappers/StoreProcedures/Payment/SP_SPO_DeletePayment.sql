USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_DeletePayment]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_DeletePayment]
create procedure [dbo].SP_SPO_DeletePayment 
(@Id varchar(MAX))
as
begin
	delete from dbo.Payments where Id = @Id
end
go



