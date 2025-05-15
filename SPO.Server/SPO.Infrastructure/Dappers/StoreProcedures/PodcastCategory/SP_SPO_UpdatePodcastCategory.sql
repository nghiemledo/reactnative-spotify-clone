USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdatePodcastCategory]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_UpdatePodcastCategory]
create procedure [dbo].[SP_SPO_UpdatePodcastCategory] (
    @Id varchar(450),
    @Name nvarchar(MAX),
    @Description nvarchar(MAX)
)
as
begin
   update PodcastCategories set [Name] = @Name, [Description] = @Description, UpdatedAt = SYSDATETIMEOFFSET()
   where Id = @Id
end
go



