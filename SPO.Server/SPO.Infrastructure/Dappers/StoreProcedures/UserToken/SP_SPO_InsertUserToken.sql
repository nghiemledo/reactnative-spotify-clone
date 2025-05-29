USE [SPO_DB]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertUserToken]
create procedure [dbo].[SP_SPO_InsertUserToken] (
    @UserId nvarchar(255),
    @LoginProvider nvarchar(255),
    @Name nvarchar(255),
    @Value nvarchar(255),
    @Expires datetimeoffset
)
as
begin
    insert into UserTokens( 
        Id, 
        UserId,
        LoginProvider,
        [Name],
        [Value],
        Expires,
        CreatedAt, 
        UpdatedAt 
    )
    values (NEWID(),@UserId, @LoginProvider, @Name, @Value, @Expires, SYSDATETIMEOFFSET(), null);
end
GO