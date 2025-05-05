USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_DeleteSong]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_DeleteSong]
create procedure [dbo].[SP_SPO_DeleteSong] (
    @Id varchar(450)
)
as
begin
   delete from Songs where Id = @Id
end
go



