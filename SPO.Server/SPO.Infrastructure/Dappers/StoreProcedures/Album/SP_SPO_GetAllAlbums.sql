USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetAllAlbums]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetAllAlbums]
create procedure [dbo].[SP_SPO_GetAllAlbums]
as
begin
    select * from Albums order by ReleaseDate
end
go

-- exec [SP_SPO_GetAllAlbums]
