import { Request, Response, NextFunction } from 'express';
import { createAuthUser, createDbUser, logoutUser, authLogin, deleteAuthUserById, updateUserDetails, passwordReset, verifyEmail } from './../services/auth.services';

interface AuthRequest extends Request {
    body: {
        email: string;
        password?: string;
    };
    params: {
        token?: string;
        id?: string;
    };
}

const register = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await createAuthUser(email, password);
        const dbUser = await createDbUser(user.id);
        res.status(201).json({ message: 'User created successfully', user: dbUser });
    } catch (error) {
        next(error);
    }
};

const login = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await authLogin(email, password);
        res.status(200).json({ message: 'User logged in successfully', user: user });
    } catch (error) {
        next(error);
    }
};

const verify = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { token } = req.params;
        const user = await verifyEmail(token);
        res.status(200).json({ message: 'User verified successfully', user: user });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await deleteAuthUserById(id);
        res.status(200).json({ message: 'User deleted successfully', user: user });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await updateUserDetails(id, req.body);
        res.status(200).json({ message: 'User updated successfully', user: user });
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email } = req.body;
        const user = await passwordReset(email);
        res.status(200).json({ message: 'Password reset successfully', user: user });
    } catch (error) {
        next(error);
    }
};  

const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await logoutUser();
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        next(error);
    }
};

export {
    register,
    login,
    logout,
    verify,
    deleteUser,
    updateUser,
    resetPassword
};