-- CreateIndex
CREATE UNIQUE INDEX "SocialAccount_userId_platform_platformId_key" ON "SocialAccount"("userId", "platform", "platformId");
