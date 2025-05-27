USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetFollowedArtists]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetFollowedArtists]
create procedure [dbo].[SP_SPO_GetFollowedArtists] (
    @UserId nvarchar(MAX)
)
as
begin
    set nocount on;

    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [Id] = @UserId)
        BEGIN
            SELECT 
                CAST(-1 AS INT) AS ErrorCode,
                CAST('User not found' AS NVARCHAR(255)) AS ErrorMessage,
                CAST(NULL AS UNIQUEIDENTIFIER) AS Id,
                CAST(NULL AS NVARCHAR(255)) AS Name,
                CAST(NULL AS DATETIME) AS FollowedAt;
            RETURN;
        END
        SELECT 
            0 AS ErrorCode,
            CAST(NULL AS NVARCHAR(255)) AS ErrorMessage,
            a.Id,
            a.Name,
            uaf.FollowedAt
        FROM 
            [dbo].[UserArtistFollows] uaf
            INNER JOIN [dbo].[Artists] a ON uaf.ArtistId = a.Id
        WHERE 
            uaf.UserId = @UserId
        ORDER BY 
            uaf.FollowedAt DESC;
    END TRY
    BEGIN CATCH
        SELECT 
            ERROR_NUMBER() AS ErrorCode,
            ERROR_MESSAGE() AS ErrorMessage,
            CAST(NULL AS UNIQUEIDENTIFIER) AS Id,
            CAST(NULL AS NVARCHAR(255)) AS Name,
            CAST(NULL AS DATETIME) AS FollowedAt;
    END CATCH
end
go