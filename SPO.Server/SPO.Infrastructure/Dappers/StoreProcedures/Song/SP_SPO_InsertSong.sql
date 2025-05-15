USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertSong]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertSong]
create procedure [dbo].[SP_SPO_InsertSong] (
    @Id nvarchar(450),
    @Title nvarchar(MAX),
    @CoverImage nvarchar(MAX),
    @GenreId nvarchar(MAX),
    @Duration int,
    @ArtistId nvarchar(MAX),
    @AlbumId nvarchar(MAX),
    @AudioUrl nvarchar(MAX)
)
as
begin
    insert into Songs( 
        Id, 
        Title,
        CoverImage,
        GenreId,
        Duration,
        ArtistId,
        AlbumId,
        CreatedAt,
        AudioUrl
     )
    values (
        @Id,  
        @Title,
        @CoverImage,
        @GenreId,
        @Duration,
        @ArtistId,
        @AlbumId,
        SYSDATETIMEOFFSET(),
        @AudioUrl
        );
end
go



