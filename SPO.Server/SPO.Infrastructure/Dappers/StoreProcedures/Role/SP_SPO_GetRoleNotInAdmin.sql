USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetDomain]    Script Date: 2/15/2025 7:49:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetRoleNotInAdmin]
create procedure [dbo].[SP_SPO_GetRoleNotInAdmin] 
as
begin
	select * from Roles where [Name] not in ('admin')
end
go

-- exec [SP_SPO_GetRoleNotInAdmin]

