USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_DeleteDomain]    Script Date: 2/15/2025 7:49:07 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_DeleteFunction]
create procedure [dbo].[SP_SPO_DeleteFunction]
    @Id varchar(36)
as
begin
    delete from Functions where Id = @Id;
end
go
