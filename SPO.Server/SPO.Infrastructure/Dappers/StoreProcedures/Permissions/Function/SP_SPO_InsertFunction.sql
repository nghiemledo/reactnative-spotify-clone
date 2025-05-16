USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_InsertFunction]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_InsertFunction]
create procedure [dbo].[SP_SPO_InsertFunction] (
   @Name nvarchar(MAX), 
   @Icon nvarchar(MAX), 
   @Link nvarchar(MAX), 
   @ParentId nvarchar(450)
)
as
begin
    insert into Functions( 
		Id, 
		[Name],
		Icon,
		Link,
		ParentId,
		CreatedAt,
		UpdatedAt
        )
    values (NEWID(),  
          @Name, 
		  @Icon, 
		  @Link, 
		  @ParentId,
		  SYSDATETIMEOFFSET(), 
          null);
end
go

-- exec [SP_SPO_InsertFunction]
--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) values(NEWID(), N'Báo cáo thống kê', 'BarChart','/#',1, 0,  SYSDATETIMEOFFSET())

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Tổng số trang vi phạm', 'BarChart','/admin/statistical/statistics',1, '4C3E8A71-79F8-4B48-A728-0BDEF182EA59',  SYSDATETIMEOFFSET()) 

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Loại nội dung vi phạm', 'BarChart','/admin/statistical/content-types',1, '4C3E8A71-79F8-4B48-A728-0BDEF182EA59',  SYSDATETIMEOFFSET()) 

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Liệt kê các trang vi phạm', 'BarChart','/admin/statistical/violating-pages',1, '4C3E8A71-79F8-4B48-A728-0BDEF182EA59',  SYSDATETIMEOFFSET()) 

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Tên miền giả mạo', 'BarChart','/admin/statistical/fake-domains',1, '4C3E8A71-79F8-4B48-A728-0BDEF182EA59',  SYSDATETIMEOFFSET()) 

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Từ khóa nhạy cảm', 'BarChart','/admin/statistical/sensitive-words',1, '4C3E8A71-79F8-4B48-A728-0BDEF182EA59',  SYSDATETIMEOFFSET()) 

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Gửi cảnh báo sớm', 'BarChart','/admin/statistical/send-warning',1, '4C3E8A71-79F8-4B48-A728-0BDEF182EA59',  SYSDATETIMEOFFSET()) 

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) values(NEWID(), N'Quản lí tên miền', 'Globe','/#',1, 0,  SYSDATETIMEOFFSET())
--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Thêm tên miền', 'Globe','/admin/manage/add-domain',1, 'F26E0280-F729-4A22-921A-5AA856865A80',  SYSDATETIMEOFFSET()) 

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Gán nhãn tên miền', 'Globe','/admin/manage/label-domain',1, 'F26E0280-F729-4A22-921A-5AA856865A80',  SYSDATETIMEOFFSET()) 

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Tìm kiếm tên miền', 'Globe','/admin/manage/search-domain',1, 'F26E0280-F729-4A22-921A-5AA856865A80',  SYSDATETIMEOFFSET()) 

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) values(NEWID(), N'Phân tích tên miền', 'CheckCircle','/#',1, 0,  SYSDATETIMEOFFSET())
--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Thời gian đăng kí', 'CheckCircle','/admin/domain-analysis/registration-time',1, '0DD66C1B-AC7F-4089-B6EC-820E8B9F3E0B',  SYSDATETIMEOFFSET())

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Gán nhãn blacklist', 'CheckCircle','/admin/domain-analysis/blacklist-label',1, '0DD66C1B-AC7F-4089-B6EC-820E8B9F3E0B',  SYSDATETIMEOFFSET())

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Gán nhãn whitelist', 'CheckCircle','/admin/domain-analysis/whitelist-label',1, '0DD66C1B-AC7F-4089-B6EC-820E8B9F3E0B',  SYSDATETIMEOFFSET())

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) values(NEWID(), N'Quản lí từ điển', 'Library','/#',1, 0,  SYSDATETIMEOFFSET())

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Phân quyền', 'Library','/admin/library/role',1, 'B54FAF7B-8997-43D5-AF82-0F8E4912921C',  SYSDATETIMEOFFSET())

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Người dùng', 'Library','/admin/library/user',1, 'B54FAF7B-8997-43D5-AF82-0F8E4912921C',  SYSDATETIMEOFFSET())

--insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) 
--values(NEWID(), N'Lần gán nhãn', 'Library','/admin/library/times-of-label',1, 'B54FAF7B-8997-43D5-AF82-0F8E4912921C',  SYSDATETIMEOFFSET())


--SELECT * FROM Functions order by ParentId

-- insert into Functions(Id, [Name], Icon, Link,  IsActive, ParentId, CreatedAt) values(NEWID(), N'Chức năng', 'Library','/admin/library/functions',1, 'B54FAF7B-8997-43D5-AF82-0F8E4912921C',  SYSDATETIMEOFFSET())


