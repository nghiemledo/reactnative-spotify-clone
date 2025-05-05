USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetPodcastEpisodeById]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetPodcastEpisodeById]
create procedure [dbo].[SP_SPO_GetPodcastEpisodeById]
(
    @Id varchar(450)
)
as
begin
    select * from PodcastEpisodes where Id = @Id
end
go

-- exec [SP_SPO_GetPodcastEpisodeById]