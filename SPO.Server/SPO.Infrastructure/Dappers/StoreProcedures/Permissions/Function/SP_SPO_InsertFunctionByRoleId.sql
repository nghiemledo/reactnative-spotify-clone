USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertDomain]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- vm.Name, vm.Length, vm.Type, vm.Result, vm.Note, 
-- vm.Metadata, vm.Status

-- drop procedure [SP_SPO_InsertFunctionByRoleId]
create procedure [dbo].[SP_SPO_InsertFunctionByRoleId] (
    @RoleId	varchar(50)
)
as
begin
	 insert into [Permissions](Id, CanCreate, CanRead, CanUpdate, CanDelete, RoleId, FunctionId)
	 select NEWID(),1,1,1,1,@RoleId,Id from Functions
end
go

-- execute [SP_SPO_InsertFunctionByRoleId]  @RoleId='58F9F79B-8A60-417C-B8B1-6BDCEDF24CEA'