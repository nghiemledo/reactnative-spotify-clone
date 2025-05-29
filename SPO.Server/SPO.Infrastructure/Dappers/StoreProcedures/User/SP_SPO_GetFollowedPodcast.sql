USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetFollowedPodcast]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetFollowedPodcast]
create procedure [dbo].[SP_SPO_GetFollowedPodcast] (
    @UserId nvarchar(MAX)
)
as
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Kiểm tra UserId tồn tại
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [Id] = @UserId)
        BEGIN
            SELECT 
                CAST(-1 AS INT) AS ErrorCode,
                CAST('User not found' AS NVARCHAR(255)) AS ErrorMessage,
                CAST(NULL AS NVARCHAR(50)) AS Id,
                CAST(NULL AS NVARCHAR(255)) AS Title,
                CAST(NULL AS NVARCHAR(255)) AS Creator,
                CAST(NULL AS DATETIMEOFFSET) AS FollowedAt;
            RETURN;
        END

        -- Lấy danh sách podcast show được follow
        SELECT 
            0 AS ErrorCode,
            CAST(NULL AS NVARCHAR(255)) AS ErrorMessage,
            ps.Id,
            ps.Title,
            ps.Creator,
            ufps.FollowedAt
        FROM 
            [dbo].[UserFollowPodcastShows] ufps
            INNER JOIN [dbo].[PodcastShows] ps ON ufps.ShowId = ps.Id
        WHERE 
            ufps.UserId = @UserId
        ORDER BY 
            ufps.FollowedAt DESC;
    END TRY
    BEGIN CATCH
        SELECT 
            ERROR_NUMBER() AS ErrorCode,
            ERROR_MESSAGE() AS ErrorMessage,
            CAST(NULL AS NVARCHAR(50)) AS Id,
            CAST(NULL AS NVARCHAR(255)) AS Title,
            CAST(NULL AS NVARCHAR(255)) AS Creator,
            CAST(NULL AS DATETIMEOFFSET) AS FollowedAt;
    END CATCH
END;
go