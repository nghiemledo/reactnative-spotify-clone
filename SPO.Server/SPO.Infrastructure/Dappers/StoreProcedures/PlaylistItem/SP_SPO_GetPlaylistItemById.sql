USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetPlaylistItemById]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetPlaylistItemById]
create procedure [dbo].[SP_SPO_GetPlaylistItemById]
(
    @Id varchar(450)
)
as
begin
    select * from PlaylistItems where Id = @Id
end
go

-- exec [SP_SPO_GetPlaylistItemById]