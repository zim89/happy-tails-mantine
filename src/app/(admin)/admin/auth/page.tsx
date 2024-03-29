"use client";
import { redirect } from "next/navigation";

export default function Page() {
    const candidate = localStorage.getItem('google_verification');
    let verification = candidate ? JSON.parse(candidate) : null;

    // If there is no tokens, get the user's consent and get tokens
    if (!verification) return redirect(`${process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}`);
    // If there is an access token or refresh token (in case when the access token is expired)
    else return redirect("/admin/seo");
}   