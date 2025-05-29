USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetByName]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetRoleByName]
create procedure [dbo].[SP_SPO_GetRoleByName]
    @Name nvarchar(MAX)
as
begin
    select * from Roles where [Name] = @Name;
end
go

