USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdateSong]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_UpdateSong]
create procedure [dbo].[SP_SPO_UpdateSong] (
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
    update Songs set
        Id = @Id,  
        Title = @Title,
        CoverImage = @CoverImage,
        GenreId = @GenreId,
        Duration = @Duration,
        ArtistId = @ArtistId,
        AlbumId = @AlbumId,
        UpdatedAt = SYSDATETIMEOFFSET(),
        AudioUrl = @AudioUrl
    where Id = @Id
end
go



