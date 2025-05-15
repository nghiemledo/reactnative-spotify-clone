USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_WA_GetDomainById]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetRoleByUserId]
create procedure [dbo].[SP_SPO_GetRoleByUserId]
    @UserId nvarchar(255)
as
begin
  -- select RoleId
 --  from UserRoles
  -- where UserId = @UserId
  SELECT r.Name AS RoleName
    FROM UserRoles ur
    INNER JOIN Roles r ON ur.RoleId = r.Id
    WHERE ur.UserId = @UserId
end
go

-- exec [SP_SPO_GetRoleByUserId] @UserId = '8d04dce2-969a-435d-bba4-df3f325083da'  -> Kết quả: 8d04dce2-969a-435d-bba4-df3f325983dc
-- select Name from Roles where Id = '8d04dce2-969a-435d-bba4-df3f325983dc'  --> SysAdmin
