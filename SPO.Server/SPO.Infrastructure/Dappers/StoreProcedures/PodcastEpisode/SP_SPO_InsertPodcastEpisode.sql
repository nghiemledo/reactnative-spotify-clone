USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertPodcastEpisode]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertPodcastEpisode]
create procedure [dbo].[SP_SPO_InsertPodcastEpisode] (
    @Id varchar(max),
    @Title nvarchar(MAX),
    @Description nvarchar(MAX),
    @Duration int,
    @AudioUrl nvarchar(MAX),
    @ShowId nvarchar(MAX)
)
as
begin
    insert into PodcastEpisodes( 
        Id, 
        Title,
        [Description],
        Duration,
        AudioUrl,
        ReleaseDate,
        ShowId,
        CreatedAt
     )
    values (
        @Id,  
        @Title,
        @Description,
        @Duration,
        @AudioUrl,
        SYSDATETIME(),
        @ShowId,
        SYSDATETIMEOFFSET()
        );
end
go

