USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_GetPlaylistsByUserId]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_GetPlaylistsByUserId]
create procedure [dbo].[SP_SPO_GetPlaylistsByUserId] (
    @UserId nvarchar(MAX)
)
as
begin
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
                CAST(NULL AS NVARCHAR(MAX)) AS Description,
                CAST(NULL AS NVARCHAR(255)) AS CoverImage,
                CAST(0 AS BIT) AS IsPublic,
                CAST(NULL AS DATETIMEOFFSET) AS CreatedAt,
                CAST(NULL AS DATETIMEOFFSET) AS UpdatedAt;
            RETURN;
        END

        -- Lấy danh sách playlist
        SELECT 
            0 AS ErrorCode,
            CAST(NULL AS NVARCHAR(255)) AS ErrorMessage,
            p.Id,
            p.Title,
            p.Description,
            p.CoverImage,
            p.IsPublic,
            p.CreatedAt,
            p.UpdatedAt
        FROM 
            [dbo].[Playlists] p
        WHERE 
            p.UserId = @UserId
        ORDER BY 
            p.CreatedAt DESC;
    END TRY
    BEGIN CATCH
        SELECT 
            ERROR_NUMBER() AS ErrorCode,
            ERROR_MESSAGE() AS ErrorMessage,
            CAST(NULL AS NVARCHAR(50)) AS Id,
            CAST(NULL AS NVARCHAR(255)) AS Title,
            CAST(NULL AS NVARCHAR(MAX)) AS Description,
            CAST(NULL AS NVARCHAR(255)) AS CoverImage,
            CAST(0 AS BIT) AS IsPublic,
            CAST(NULL AS DATETIMEOFFSET) AS CreatedAt,
            CAST(NULL AS DATETIMEOFFSET) AS UpdatedAt;
    END CATCH
end
go