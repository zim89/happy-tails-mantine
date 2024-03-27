"use client";
import { getAnalytics } from "@/shared/api/seoApi";
import { useEffect, useState } from "react";

export default function Analitycs() {
    const [res, setRes] = useState<string>();

    useEffect(() => {
        (async () => {
        const candidate = localStorage.getItem('google_verification')
        let verification = candidate ? JSON.parse(candidate) : null;

        if (verification) {
            const res = await getAnalytics({ startDate: "2024-03-01", endDate: "2024-03-25", access_token: verification.access_token });
            setRes(JSON.stringify(res?.data));
        }
    })();

    }, []);

    return (
        <pre>{res}</pre>
    );
}