export const userAdd = async (req, res, next) => {
    const { username, email, password } = req.body;
    const isSmall = password.length >= 8;
    const isLarge = password.length <= 10;
    const isSmallName = username.length >= 4;
    const isLargeName = username.length <= 10;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];

    if (!username) errors.push("El nombre de usuario es requerido.");
    if (!email) errors.push("El correo electrónico es requerido.");
    if (!password) errors.push("La contraseña es requerida.");
    if (!isSmall) errors.push("La contraseña debe ser mayor a 8 caracteres.");
    if (!isLarge) errors.push("La contraseña debe ser menor a 10 caracteres.");
    if (!isSmallName) errors.push("El nombre de usuario debe ser mayor a 4 caracteres.");
    if (!isLargeName) errors.push("El nombre de usuario debe ser menor a 10 caracteres.");
    if (!emailRegex.test(email)) errors.push("El formato del correo electrónico es inválido.");

    if (errors.length > 0) return res.status(400).json({ errors });

    next();
}

export const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (!email) errors.push("El correo electrónico es requerido.");
    if (!password) errors.push("La contraseña es requerida.");

    if (errors.length > 0) return res.status(400).json({ errors });

    next();
}

export const postAdd = async (req, res, next) => {
    const { title, description } = req.body;
    const errors = [];

    if (!title) errors.push("El título es requerido.");
    if (!description) errors.push("La descripción es requerida.");

    if (errors.length > 0) return res.status(400).json({ errors });

    next();
}
