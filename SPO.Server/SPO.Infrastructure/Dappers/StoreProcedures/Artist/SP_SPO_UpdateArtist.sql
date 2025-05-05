USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdateArtist]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_UpdateArtist]
create procedure [dbo].[SP_SPO_UpdateArtist] (
    @Id varchar(450),
    @Name nvarchar(MAX),
    @Slug nvarchar(MAX),
    @Bio NVARCHAR(MAX),
    @UrlAvatar nvarchar(MAX)
)
as
begin
   update Artists set [Name] = @Name, Bio = @Bio, UrlAvatar = @UrlAvatar, UpdatedAt = SYSDATETIMEOFFSET()
   where Id = @Id
end
go



