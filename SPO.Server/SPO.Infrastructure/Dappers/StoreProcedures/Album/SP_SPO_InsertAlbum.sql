USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertAlbum]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertAlbum]
create procedure [dbo].[SP_SPO_InsertAlbum] (
    @Id varchar(max),
    @Title nvarchar(MAX),
    @CoverImage NVARCHAR(MAX),
    @GenreId nvarchar(MAX),
    @ArtistId nvarchar(MAX)
)
as
begin
    insert into Albums( 
        Id, 
        Title,
        ReleaseDate,
        CoverImage,
        GenreId,
        ArtistId,
        CreatedAt
     )
    values (
        @Id,  
        @Title,
        SYSDATETIME(),
        @CoverImage,
        @GenreId,
        @ArtistId,
        SYSDATETIMEOFFSET()
        );
end
go



