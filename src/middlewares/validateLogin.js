const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    if (!email.match(regex)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return next();
};

module.exports = validateLogin;