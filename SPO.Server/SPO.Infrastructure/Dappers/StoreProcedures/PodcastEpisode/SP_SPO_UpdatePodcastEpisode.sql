USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdatePodcastEpisode]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_UpdatePodcastEpisode]
create procedure [dbo].[SP_SPO_UpdatePodcastEpisode] (
     @Id varchar(max),
     @Title nvarchar(MAX),
     @Description nvarchar(MAX),
     @Duration int,
     @AudioUrl nvarchar(MAX),
     @ShowId nvarchar(MAX)
)
as
begin
   update PodcastEpisodes set Title = @Title,[Description] = @Description, Duration = @Duration, 
   AudioUrl = @AudioUrl, ShowId = @ShowId, UpdatedAt = SYSDATETIMEOFFSET()
   where Id = @Id
end
go

