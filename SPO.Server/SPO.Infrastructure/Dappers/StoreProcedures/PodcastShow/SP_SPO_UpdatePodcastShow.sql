USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdatePodcastShow]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_UpdatePodcastShow]
create procedure [dbo].[SP_SPO_UpdatePodcastShow] (
    @Id varchar(max),
    @Title nvarchar(MAX),
    @Creator nvarchar(MAX),
    @Description nvarchar(MAX),
    @CoverImage nvarchar(MAX),
    @CategoryId nvarchar(MAX)
)
as
begin
   update PodcastShows set Title = @Title, Creator = @Creator, [Description] = @Description,
   CoverImage = @CoverImage, CategoryId = @CategoryId, UpdatedAt = SYSDATETIMEOFFSET()
   where Id = @Id
end
go



