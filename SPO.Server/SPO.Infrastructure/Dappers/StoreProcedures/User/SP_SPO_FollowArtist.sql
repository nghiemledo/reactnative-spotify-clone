USE [SPO_DB]
GO

/****** Object:  StoredProcedure [dbo].[SP_SPO_FollowArtist]    Script Date: 2/15/2025 7:50:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- drop procedure [SP_SPO_FollowArtist]
create procedure [dbo].[SP_SPO_FollowArtist] (
    @UserId nvarchar(MAX),
    @ArtistId nvarchar(MAX)
)
as
begin
    set nocount on;

    begin try
        -- Kiểm tra UserId và ArtistId tồn tại
        if not exists (select 1 from [dbo].[Users] where [Id] = @UserId)
           begin
            raiserror ('User not found', 16, 1);
            return;
           end

         if not exists (select 1 from dbo.[Artists] WHERE [Id] = @ArtistId)
           begin
            raiserror ('Artist not found', 16, 1);
            return;
           end

        begin transaction;

        -- Kiểm tra đã follow chưa
        IF EXISTS (SELECT 1 FROM [dbo].[UserArtistFollows] WHERE [UserId] = @UserId AND [ArtistId] = @ArtistId)
        BEGIN
            -- Nếu đã follow, xóa (unfollow)
            DELETE FROM [dbo].[UserArtistFollows]
            WHERE [UserId] = @UserId AND [ArtistId] = @ArtistId;
        END
        ELSE
        BEGIN
            -- Nếu chưa follow, thêm mới
            INSERT INTO [dbo].[UserArtistFollows] ([UserId], [ArtistId], [FollowedAt])
            VALUES (@UserId, @ArtistId, GETDATE());
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Ném lỗi để API xử lý
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
end
go

-- EXEC [dbo].SP_SPO_FollowArtist
   -- @UserId = '550e8400-e29b-41d4-a716-446655440001',
    -- @ArtistId = '550e8400-e29b-41d4-a716-446655440101';