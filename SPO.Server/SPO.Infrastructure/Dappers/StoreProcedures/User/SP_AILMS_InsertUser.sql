USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertUser]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertUser]
create procedure [dbo].[SP_SPO_InsertUser] (
    @FirstName nvarchar(MAX),
    @LastName nvarchar(MAX),
    @Email NVARCHAR(MAX),
    @PhoneNumber nvarchar(MAX),
    @Password nvarchar(MAX)
)
as
begin
    set nocount on;
    declare @fullname nvarchar(MAX) 
    set @fullname=LTRIM(RTRIM(@FirstName)) + ' ' + LTRIM(RTRIM(@LastName))

    insert into Users( 
        Id, 
        LastName,
        FirstName,
        FullName,
        Email,
        PhoneNumber,
        PasswordHash,
        CreatedAt
     )
    values (NEWID(),  
        @LastName,
        @FirstName,
        @FullName,
        @Email,
        @PhoneNumber,
        @Password,
        SYSDATETIMEOFFSET()
        );
end
go


