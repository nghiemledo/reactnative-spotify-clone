USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_DeleteDomain]    Script Date: 2/15/2025 7:49:07 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_DeletePermissionByRoleIdByFunctionId]
create procedure [dbo].[SP_SPO_DeletePermissionByRoleIdByFunctionId]
    @RoleId	nvarchar(255),
	@FunctionId	nvarchar(255)
as
begin
   delete from [Permissions] where RoleId=@RoleId and FunctionId=@FunctionId  
   delete from [Permissions] where RoleId=@RoleId and FunctionId in (select Id from Functions where ParentId= @FunctionId)
end
go

--  execute [SP_WA_DeletePermissionByRoleIdByFunctionId] @RoleId ='0b13a098-e9c6-499c-bf2f-40b30aa03ece', @FunctionId = ''
																				
