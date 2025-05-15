USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdateFunction]    Script Date: 2/15/2025 7:51:11 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[SP_SPO_UpdateFunction]
(
   @Id  nvarchar(450),
   @Name nvarchar(MAX), 
   @Icon nvarchar(MAX), 
   @Link nvarchar(MAX), 
   @ParentId nvarchar(450)
)
as
begin
    update Functions
    set [Name] = @Name,
        Icon = @Icon,
        Link = @Link,
        ParentId = @ParentId,
        UpdatedAt = SYSDATETIMEOFFSET()
    where Id = @Id
end
go


