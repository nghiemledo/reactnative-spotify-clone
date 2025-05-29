USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdateRole]    Script Date: 2/15/2025 7:51:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_UpdateRole]
create procedure [dbo].[SP_SPO_UpdateRole]
(
    @Id nvarchar(255),
    @Name nvarchar(255)
)
as
begin
    update Roles
    set Name = @Name,
        ConcurrencyStamp = SYSDATETIMEOFFSET()
    where Id = @Id
end
go

-- exec [SP_SPO_UpdateRole] @Id = ''  @Name = ''