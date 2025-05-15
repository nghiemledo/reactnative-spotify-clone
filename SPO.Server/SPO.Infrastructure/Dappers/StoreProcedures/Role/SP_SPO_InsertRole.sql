USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertRole]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertRole]
create procedure [dbo].[SP_SPO_InsertRole] (
    @Name nvarchar(255)
)
as
begin
    insert into Roles( 
        Id, 
        [Name],
        ConcurrencyStamp )
    values (NEWID(),  
        @Name,
        SYSDATETIMEOFFSET()
        );
end
go

-- exec [SP_SPO_InsertRole] @Name = 'admin'
-- exec [SP_SPO_InsertRole] @Name = 'user'


