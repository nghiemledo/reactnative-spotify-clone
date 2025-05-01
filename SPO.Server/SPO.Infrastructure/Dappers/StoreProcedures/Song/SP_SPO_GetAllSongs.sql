USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetAllRoles]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetAllSongs]
create procedure [dbo].[SP_SPO_GetAllSongs]
as
begin
    select * from Songs order by CreatedAt
end
go

-- exec [SP_SPO_GetAllSongs]
