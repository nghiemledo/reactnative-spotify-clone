USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetAllArtists]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetAllArtists]
create procedure [dbo].[SP_SPO_GetAllArtists]
as
begin
    select * from Artists order by CreatedAt
end
go

-- exec [SP_SPO_GetAllArtists]
