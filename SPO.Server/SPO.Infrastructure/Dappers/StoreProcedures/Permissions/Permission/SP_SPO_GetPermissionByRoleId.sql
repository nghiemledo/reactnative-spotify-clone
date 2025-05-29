USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetDomain]    Script Date: 2/15/2025 7:49:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetPermissionByRoleId]
create procedure [dbo].[SP_SPO_GetPermissionByRoleId] (@RoleId nvarchar(255)) 
as
begin
	select b.* , a.Link as FunctionLink, a.Name as FunctionName, c.Name as RoleName
	from Functions a, [Permissions] b, Roles c
	where a.Id= b.FunctionId and b.RoleId= c.Id
	and RoleId=@RoleId
end
go

--  execute [SP_WA_GetPermissionByRoleId]  @RoleId='58F9F79B-8A60-417C-B8B1-6BDCEDF24CEA'

