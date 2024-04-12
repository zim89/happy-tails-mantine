import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Products Page",
    robots: {
        index: false,
        indexifembedded: false,
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    )
}