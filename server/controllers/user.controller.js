const { getUserById } = require('./../services/user.services');

const getUser = async (req, res, next) =>{
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json({ message: 'User fetched successfully', user: user });
    } catch (error) {
        next(error);
    }
};

module.exports = { getUser };