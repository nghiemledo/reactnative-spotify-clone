USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetDomainById]    Script Date: 2/15/2025 7:50:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetFunctionNameById]
create procedure [dbo].[SP_SPO_GetFunctionNameById]
    @FunctionId varchar(36)
as
begin
    select [Name] from Functions where Id = @FunctionId;
end
go

-- exec [SP_SPO_GetFunctionById] @Id = ''


