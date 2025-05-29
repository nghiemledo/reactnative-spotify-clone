USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertPodcastShow]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertPodcastShow]
create procedure [dbo].[SP_SPO_InsertPodcastShow] (
    @Id varchar(max),
    @Title nvarchar(MAX),
    @Creator nvarchar(MAX),
    @Description nvarchar(MAX),
    @CoverImage nvarchar(MAX),
    @CategoryId nvarchar(MAX)
)
as
begin
    insert into PodcastShows( 
        Id, 
        Title,
        Creator,
        [Description],
        CoverImage,
        CategoryId,
        CreatedAt
     )
    values (
        @Id,  
        @Title,
        @Creator,
        @Description,
        @CoverImage,
        @CategoryId,
        SYSDATETIMEOFFSET()
        );
end
go



