import { useFindManyQuery } from "../api/usersApi";
import { User } from "../types/auth.types";

export const useSelectUsers = <T>(cb: (users: User[]) => T) => {
    const { users } = useFindManyQuery({ page: 0, size: 1000000 }, { selectFromResult: res => ({ users: cb(res.data?.content || []) }) });
    return users;
}