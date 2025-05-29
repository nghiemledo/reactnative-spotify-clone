USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdateLockOutUser]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_UpdateLockOutUser]
create procedure [dbo].[SP_SPO_UpdateLockOutUser]
(
    @Id nvarchar(MAX),
    @LockOutEnabled bit
)
as
begin
    update Users set LockOutEnabled = @LockOutEnabled
    where Users.Id = @Id
end
go