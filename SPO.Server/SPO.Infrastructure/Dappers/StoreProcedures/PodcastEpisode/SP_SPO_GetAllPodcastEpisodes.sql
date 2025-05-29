USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetAllPodcastEpisodes]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetAllPodcastEpisodes]
create procedure [dbo].[SP_SPO_GetAllPodcastEpisodes]
as
begin
    select * from PodcastEpisodes order by ReleaseDate
end
go

-- exec [SP_SPO_GetAllPodcastEpisodes]
