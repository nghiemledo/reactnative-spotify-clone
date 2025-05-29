USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_DeleteGenre]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_DeleteGenre]
create procedure [dbo].[SP_SPO_DeleteGenre] (
    @Id varchar(450)
)
as
begin
   delete from Genres where Id = @Id
end
go



