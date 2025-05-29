USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_FullSearch]   Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_FullSearch]
CREATE PROCEDURE [dbo].[SP_SPO_FullSearch]
    @Keyword NVARCHAR(100),
    @Limit INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @SearchTerm NVARCHAR(102) = '%' + LTRIM(RTRIM(@Keyword)) + '%';

    BEGIN TRY
        -- Gộp kết quả từ Artists, Songs, PodcastShows
        SELECT *
        FROM (
            -- Tìm Artists
            SELECT TOP (@Limit)
                'Artist' AS Type,
                Id,
                Name,
                CAST(NULL AS NVARCHAR(255)) AS Title,
                CAST(NULL AS NVARCHAR(255)) AS Creator,
                CAST(NULL AS NVARCHAR(50)) AS ArtistId,
                CAST(NULL AS NVARCHAR(255)) AS ArtistName,
                UrlAvatar AS CoverImage
            FROM [dbo].[Artists]
            WHERE [Name] LIKE @SearchTerm
            ORDER BY [Name]

            UNION ALL

            -- Tìm Songs
            SELECT TOP (@Limit)
                'Song' AS Type,
                s.Id,
                CAST(NULL AS NVARCHAR(255)) AS Name,
                s.Title,
                CAST(NULL AS NVARCHAR(255)) AS Creator,
                s.ArtistId,
                a.Name AS ArtistName,
                s.CoverImage
            FROM [dbo].[Songs] s
            LEFT JOIN [dbo].[Artists] a ON s.ArtistId = a.Id
            WHERE s.Title LIKE @SearchTerm
            ORDER BY s.Title

            UNION ALL

            -- Tìm PodcastShows
            SELECT TOP (@Limit)
                'Show' AS Type,
                Id,
                CAST(NULL AS NVARCHAR(255)) AS Name,
                Title,
                Creator,
                CAST(NULL AS NVARCHAR(50)) AS ArtistId,
                CAST(NULL AS NVARCHAR(255)) AS ArtistName,
                CoverImage
            FROM [dbo].[PodcastShows]
            WHERE [Title] LIKE @SearchTerm OR [Creator] LIKE @SearchTerm
            ORDER BY [Title]
        ) AS CombinedResults
        ORDER BY Type, Id;
    END TRY
    BEGIN CATCH
        SELECT 
            ERROR_NUMBER() AS ErrorCode,
            ERROR_MESSAGE() AS ErrorMessage,
            CAST(NULL AS NVARCHAR(20)) AS Type,
            CAST(NULL AS NVARCHAR(50)) AS Id,
            CAST(NULL AS NVARCHAR(255)) AS Name,
            CAST(NULL AS NVARCHAR(255)) AS Title,
            CAST(NULL AS NVARCHAR(255)) AS Creator,
            CAST(NULL AS NVARCHAR(50)) AS ArtistId,
            CAST(NULL AS NVARCHAR(255)) AS ArtistName,
            CAST(NULL AS NVARCHAR(255)) AS CoverImage;
    END CATCH
END;
go

--- EXEC [dbo].[SP_SPO_FullSearch] @Keyword = 'h', @Limit = 5;