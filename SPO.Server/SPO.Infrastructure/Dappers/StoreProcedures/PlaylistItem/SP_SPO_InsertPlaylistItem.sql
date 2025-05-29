USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertPlaylistItem]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertPlaylistItem]
create procedure [dbo].[SP_SPO_InsertPlaylistItem] (
    @Id varchar(max),
    @PlaylistId nvarchar(MAX),
    @SongId nvarchar(MAX),
    @EpisodeId nvarchar(MAX)
)
as
begin
    insert into PlaylistItems( 
        Id, 
        PlaylistId,
        SongId,
        EpisodeId,
        CreatedAt
     )
    values (
        @Id,  
        @PlaylistId,
        @SongId,
        @EpisodeId,
        SYSDATETIMEOFFSET()
        );
end
go



