BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[user] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(40) NOT NULL,
    [email] VARCHAR(50) NOT NULL,
    [password] VARCHAR(100) NOT NULL,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Persons] (
    [PersonID] INT NOT NULL IDENTITY(1,1),
    [LastName] VARCHAR(255),
    CONSTRAINT [Persons_pkey] PRIMARY KEY CLUSTERED ([PersonID])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
