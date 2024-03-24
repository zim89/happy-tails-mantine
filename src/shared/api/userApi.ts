import axiosInstance from '@/shared/lib/interceptor';
import { AxiosError } from 'axios';

export const updatePassword = async (newPassword: string) => {
    try {
        // TODO: update old
    } catch (err) {
        if (err instanceof AxiosError) throw err;
        else console.log("Let's find out what we have: ",err);
    }
}