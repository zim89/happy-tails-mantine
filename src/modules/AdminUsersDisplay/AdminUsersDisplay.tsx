"use client";

import { useContext, useEffect } from "react";

import { useFindManyQuery } from "@/shared/api/usersApi";
import { Table } from "./components/Table";
import { AdminPanelContext } from "@/shared/lib/context";

export default function AdminUsersDisplay() {
    const { data, error, isLoading } = useFindManyQuery({});
    const { update } = useContext(AdminPanelContext);

    useEffect(() => {
        update(prev => ({ ...prev, openedLink: "Users" }));
      }, []);

    if (isLoading || !data) return <p>Loading...</p>
    if (error) return <p>{"Whoops, it shouldn't have happened. Our specialists are already handling the issue."}</p>

    return (
        <>
            <Table data={data.content} />
        </>
    );
}