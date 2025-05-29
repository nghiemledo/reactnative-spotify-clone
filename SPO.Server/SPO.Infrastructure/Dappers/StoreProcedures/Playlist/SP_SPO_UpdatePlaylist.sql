USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdatePlaylist]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_UpdatePlaylist]
create procedure [dbo].[SP_SPO_UpdatePlaylist] (
    @Id varchar(450),
    @Title nvarchar(MAX),
    @Description nvarchar(MAX),
    @CoverImage nvarchar(MAX),
    @UserId NVARCHAR(MAX)
)
as
begin
   update Playlists set Title = @Title, [Description] = @Description, CoverImage = @CoverImage, UserId = @UserId, UpdatedAt = SYSDATETIMEOFFSET()
   where Id = @Id
end
go



