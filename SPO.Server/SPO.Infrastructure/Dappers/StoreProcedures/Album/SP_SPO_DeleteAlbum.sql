USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_DeleteAlbum]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_DeleteAlbum]
create procedure [dbo].[SP_SPO_DeleteAlbum] (
    @Id varchar(450)
)
as
begin
   delete from Albums where Id = @Id
end
go



