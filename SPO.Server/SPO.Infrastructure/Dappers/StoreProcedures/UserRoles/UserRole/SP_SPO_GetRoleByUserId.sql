USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetDomainById]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetRoleByUserId]
create procedure [dbo].[SP_SPO_GetRoleByUserId]
    @UserId nvarchar(255)
as
begin
   select RoleId
   from UserRoles
   where UserId = @UserId
end
go

-- exec [SP_SPO_GetRoleByUserId] @UserId = 'c2a2d27f-e9fd-4223-a659-a6a3c249ed2a'
