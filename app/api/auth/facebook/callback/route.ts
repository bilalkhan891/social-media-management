import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", baseUrl));
  }

  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(
      new URL("/accounts?error=facebook_denied", baseUrl)
    );
  }

  // Exchange code for short-lived token
  const tokenRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?` +
      new URLSearchParams({
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        redirect_uri: `${baseUrl}/api/auth/facebook/callback`,
        code,
      })
  );
  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return NextResponse.redirect(
      new URL("/accounts?error=facebook_token", baseUrl)
    );
  }

  // Exchange for long-lived token (~60 days)
  const longLivedRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?` +
      new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        fb_exchange_token: tokenData.access_token,
      })
  );
  const longLivedData = await longLivedRes.json();
  const accessToken = longLivedData.access_token ?? tokenData.access_token;

  // Fetch user profile
  const profileRes = await fetch(
    `https://graph.facebook.com/me?fields=id,name&access_token=${accessToken}`
  );
  const profile = await profileRes.json();

  if (!profile.id) {
    return NextResponse.redirect(
      new URL("/accounts?error=facebook_profile", baseUrl)
    );
  }

  // Create or update SocialAccount (findFirst avoids needing the unique index applied)
  const existing = await prisma.socialAccount.findFirst({
    where: { userId: session.user.id, platform: "facebook", platformId: profile.id },
  });

  if (existing) {
    await prisma.socialAccount.update({
      where: { id: existing.id },
      data: { accessToken, username: profile.name },
    });
  } else {
    await prisma.socialAccount.create({
      data: {
        userId: session.user.id,
        platform: "facebook",
        platformId: profile.id,
        username: profile.name,
        accessToken,
      },
    });
  }

  return NextResponse.redirect(new URL("/accounts", baseUrl));
}
