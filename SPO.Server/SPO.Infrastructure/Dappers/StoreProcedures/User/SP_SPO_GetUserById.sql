USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetUserById]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetUserById]
create procedure [dbo].[SP_SPO_GetUserById] (
    @Id nvarchar(MAX)
)
as
begin
   select * from Users where Id = @Id 
end
go