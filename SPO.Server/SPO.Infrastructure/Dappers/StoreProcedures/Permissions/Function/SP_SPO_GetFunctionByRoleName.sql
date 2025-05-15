USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetDomainById]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetFunctionByRoleName]
create procedure [dbo].[SP_SPO_GetFunctionByRoleName]
    @RoleName nvarchar(50)
as
begin
	if(@RoleName !='')	
		select distinct a.* 
		from Functions a, [Permissions] b, Roles c
		where a.Id = b.FunctionId and b.RoleId = c.Id
			and c.Name=@RoleName
		order by a.Id
		else 
			select * from Functions
end
go

-- exec [SP_WA_GetFunctionByRoleName] @RoleName = 'user'


