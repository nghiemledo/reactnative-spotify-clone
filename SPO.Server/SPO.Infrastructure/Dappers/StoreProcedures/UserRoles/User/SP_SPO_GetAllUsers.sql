USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetAllUsers]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetAllUsers]
create procedure [dbo].[SP_SPO_GetAllUsers] 
as
begin
    select * from Users order by CreatedAt
end
go