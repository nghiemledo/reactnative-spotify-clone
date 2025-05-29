USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_FollowPodcast]   Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_FollowPodcast]
create procedure [dbo].[SP_SPO_FollowPodcast] (
    @UserId NVARCHAR(MAX),
    @ShowId NVARCHAR(MAX)
)
as
begin
   SET NOCOUNT ON;

    BEGIN TRY
        -- Kiểm tra UserId tồn tại
        IF NOT EXISTS (SELECT 1 FROM [dbo].[Users] WHERE [Id] = @UserId)
        BEGIN
            RAISERROR ('User not found', 16, 1);
            RETURN;
        END

        -- Kiểm tra ShowId tồn tại
        IF NOT EXISTS (SELECT 1 FROM [dbo].[PodcastShows] WHERE [Id] = @ShowId)
        BEGIN
            RAISERROR ('Podcast show not found', 16, 1);
            RETURN;
        END

        BEGIN TRANSACTION;

        -- Kiểm tra đã follow chưa
        IF EXISTS (SELECT 1 FROM [dbo].[UserFollowPodcastShows] WHERE [UserId] = @UserId AND [ShowId] = @ShowId)
        BEGIN
            -- Nếu đã follow, xóa (unfollow)
            DELETE FROM [dbo].[UserFollowPodcastShows]
            WHERE [UserId] = @UserId AND [ShowId] = @ShowId;
        END
        ELSE
        BEGIN
            -- Nếu chưa follow, thêm mới
            INSERT INTO [dbo].[UserFollowPodcastShows] ([Id], [UserId], [ShowId], [FollowedAt])
            VALUES (NEWID(), @UserId, @ShowId, SYSDATETIMEOFFSET());
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
end
go