USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdateAlbum]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_UpdateAlbum]
create procedure [dbo].[SP_SPO_UpdateAlbum] (
    @Id varchar(450),
    @Title nvarchar(MAX),
    @CoverImage NVARCHAR(MAX),
    @GenreId nvarchar(MAX),
    @ArtistId nvarchar(MAX)
)
as
begin
   update Albums set Title = @Title, CoverImage = @CoverImage, GenreId = @GenreId, ArtistId =@ArtistId, UpdatedAt = SYSDATETIMEOFFSET()
   where Id = @Id
end
go



