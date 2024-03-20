"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import { logout } from "@/shared/redux/auth/authOperations";
import { useAppDispatch } from "@/shared/redux/store";

type Props = {
    children: (logout: () => void) => React.ReactNode;
}
export default function Logout({ children }: Props) {
    const dispatch = useAppDispatch();
    const { access_token, id_token } = useAuth();
  
    const handleLogout = () => {
      dispatch(logout({ access_token, id_token }));
    };

    return <>
        {children(handleLogout)}
    </>
}