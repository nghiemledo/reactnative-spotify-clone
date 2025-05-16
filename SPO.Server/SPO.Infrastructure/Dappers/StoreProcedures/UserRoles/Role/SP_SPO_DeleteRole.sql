USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_DeleteRole]    Script Date: 2/15/2025 7:49:07 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_DeleteRole]
create procedure [dbo].[SP_SPO_DeleteRole]
    @Id nvarchar(255)
as
begin
    delete from Roles where Id = @Id;
end
go

-- exec [SP_SPO_DeleteRole] @Id = ''