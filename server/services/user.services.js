const supabase =  require('./../utils/supabase');

const getUserById = async (id) => {
    if(id) throw new Error("User Id is required.")
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
    if(error) throw error;
    return data;
};

module.exports = {
    getUserById
};