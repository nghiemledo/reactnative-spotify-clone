USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertDomain]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertPermissionByRoleIdByFunctionId]
create procedure [dbo].[SP_SPO_InsertPermissionByRoleIdByFunctionId] (
	@RoleId	nvarchar(255),
	@FunctionId	nvarchar(255)
)
as
begin
	insert into [Permissions](Id, CanCreate, CanRead, CanUpdate, CanDelete, RoleId, FunctionId)
	select NEWID(),1,1,1,1,@RoleId,Id from Functions where Id=@FunctionId
	insert into [Permissions](Id, CanCreate, CanRead, CanUpdate, CanDelete, RoleId, FunctionId)
	select NEWID(),1,1,1,1,@RoleId,Id from Functions where ParentId=@FunctionId
end
go

--  execute [SP_SPO_InsertPermissionByRoleIdByFunctionId]  @RoleId ='0b13a098-e9c6-499c-bf2f-40b30aa03ece', @FunctionId=''
