USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_UpdateUser]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_UpdateUser]
create procedure [dbo].SP_SPO_UpdateUser (
    @Id varchar(450),
	@FirstName nvarchar(max),
	@LastName nvarchar(max),
	@FullName nvarchar(max),
	@DateofBirth datetime2(7),
	@Gender bit,
	@Address nvarchar(max),
	@UrlAvatar nvarchar(max),
	@Email nvarchar(max),
	@PhoneNumber nvarchar(max)
)
as
begin
    update Users set
	FirstName =	@FirstName,
	LastName =	@LastName,
	FullName  =  @FullName,
	DateofBirth =	@DateofBirth,
	Gender  = 	@Gender,
	[Address]  =	@Address,
	UrlAvatar =	@UrlAvatar,
	Email =	@Email,
	PhoneNumber =	@PhoneNumber
    where Id = @Id
end
go

-- EXEC [dbo].[SP_SPO_UpdateUser]
--    @Id = '123',
--    @FirstName = N'Luka',
--    @LastName = N'Lê',
--    @FullName = N'Luka Lê',
--    @DateofBirth = '2000-01-01',
--    @Gender = 1,
--    @Address = N'Buôn Ma Thuột',
--    @UrlAvatar = N'https://example.com/avatar.jpg',
--    @Email = N'luka@example.com',
--    @PhoneNumber = N'0987654321';
