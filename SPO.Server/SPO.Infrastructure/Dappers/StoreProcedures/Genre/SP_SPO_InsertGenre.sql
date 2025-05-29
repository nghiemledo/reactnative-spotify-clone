USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertGenre]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertGenre]
create procedure [dbo].[SP_SPO_InsertGenre] (
    @Id varchar(max),
    @Name nvarchar(MAX),
    @Description nvarchar(MAX)
)
as
begin
    insert into Genres( 
        Id, 
        [Name],
        [Description],
        CreatedAt
     )
    values (
        @Id,  
        @Name,
        @Description,
        SYSDATETIMEOFFSET()
        );
end
go



