USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetDomainById]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetFunctionByRoleId]
create procedure [dbo].[SP_SPO_GetFunctionByRoleId]
    @RoleId nvarchar(50)
as
begin
	if(@RoleId !='')	
		select distinct a.* 
		from Functions a, [Permissions] b
		where a.Id = b.FunctionId 
			and b.RoleId = @RoleId
		order by a.SortOrder
		else 
			select * from Functions order by SortOrder
end
go

-- exec [SP_WA_GetFunctionByRoleId] @RoleId = '9A36A10C-7ED9-47CA-81D2-78210CA5965F'


