USE [SPO_DB]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_SPO_GetTokenByValue]
    @Value nvarchar(255)
as
begin
    select * from UserTokens where [Value] = @Value;
end
GO