USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetAllArtists]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetAllArtists]
create procedure [dbo].SP_SPO_GetAllPayments 
as
begin
	select * from dbo.Payments order by PaymentDate
end
go


-- exec [SP_SPO_GetAllArtists]
