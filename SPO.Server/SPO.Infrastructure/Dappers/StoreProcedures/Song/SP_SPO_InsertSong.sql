USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertSong]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertSong]
create procedure [dbo].[SP_SPO_InsertSong] (
    @Title nvarchar(MAX),
    @Slug nvarchar(MAX),
    @Duration NVARCHAR(MAX),
    @ReleaseDate nvarchar(MAX),
    @Genre nvarchar(MAX),
    @ArtistId nvarchar(max),
    @AlbumId nvarchar(max)
)
as
begin
    insert into Songs( 
        Id, 
        Title,
        Slug,
        Duration,
        ReleaseDate,
        Genre,
        ArtistId,
        AlbumId,
        CreatedAt
     )
    values (NEWID(),  
        @Title,
        @Slug,
        @Duration,
        @ReleaseDate,
        @Genre,
        @ArtistId,
        @AlbumId,
        SYSDATETIMEOFFSET()
        );
end
go



