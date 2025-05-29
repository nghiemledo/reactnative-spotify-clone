USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_AILMS_InsertUser]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertUserRole]
create procedure [dbo].[SP_SPO_InsertUserRole] (
    @UserId nvarchar(MAX),
    @RoleId nvarchar(MAX),
    @IsActive bit
)
as
begin
    insert into UserRoles( 
        Id, 
        UserId,
        RoleId,
        IsActive,
        CreatedAt
     )
    values (NEWID(),  
        @UserId,
        @RoleId,
        @IsActive,
        SYSDATETIMEOFFSET()
        );
end
go



