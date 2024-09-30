const supabase = require('../utils/supabase');

interface User {
    id: string;
    email: string;
    password?: string;
}

interface UserDetails {
    [key: string]: any;
}

const createAuthUser = async (email: string, password: string): Promise<User> => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    if (error) throw error;
    return data;
};

const createDbUser = async (userData: User): Promise<User> => {
    const { data, error } = await supabase.from('users').insert(userData);
    if (error) throw error;
    return data;
};

const authLogin = async (email: string, password: string): Promise<User> => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

const getUserByAuthId = async (userId: string): Promise<User> => {
    if (!userId) throw new Error("User ID is required");
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) throw error;
    return data;
};

const deleteAuthUserById = async (userId: string): Promise<User> => {
    if (!userId) throw new Error("User ID is required");

    const { data, error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;
    return data;
};

const updateUserDetails = async (userId: string, userDetails: UserDetails): Promise<User> => {
    if (!userId) throw new Error("User ID is required");
    if (!userDetails) throw new Error("User details are required");

    const { data, error } = await supabase
        .from('users')
        .update(userDetails)
        .eq('id', userId);
    if (error) throw error;
    return data;
};

const passwordReset = async (email: string): Promise<User> => {
    if (!email) throw new Error("Email is required");

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/reset-password'
    });
    if (error) throw error;
    return data;
};

const verifyEmail = async (email: string): Promise<User> => {
    if (!email) throw new Error("Email is required");

    const { data, error } = await supabase.auth.verifyEmail(email);
    if (error) throw error;
    return data;
};

const logoutUser = async (): Promise<{ message: string }> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { message: 'User logged out' };
};

export {
    createAuthUser,
    createDbUser,
    logoutUser,
    authLogin,
    getUserByAuthId,
    deleteAuthUserById,
    updateUserDetails,
    passwordReset,
    verifyEmail
};
