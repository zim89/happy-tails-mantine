"use client";
import { redirect } from "next/navigation";

export default function Page() {
    const candidate = localStorage.getItem('google_verification');
    let verification = candidate ? JSON.parse(candidate) : null;

    if (!verification || verification.expires_in < Date.now()) return redirect(process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL!);
    else return redirect("/admin/seo");
}