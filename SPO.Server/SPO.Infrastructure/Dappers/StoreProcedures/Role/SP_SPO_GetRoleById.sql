USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetDomainById]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_WA_GetRoleById]
create procedure [dbo].[SP_SPO_GetRoleById] (
    @Id nvarchar(255)
)
as
begin
    select * from Roles where Id = @Id;
end
go

-- exec [SP_SPO_GetRoleById] @Id = ''
