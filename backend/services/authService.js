const pool = require('../db');
const bcrypt = require('bcrypt');

exports.register = async ({ email, password, role }) => {
//Verificar si el usuario ya existe
    const [existingUser] = await pool.query(
        'SELECT * FROM users WHERE email =?',
        [email]
    );

    if (existingUser.length > 0) {
        const error = new Error('El usuario ya existe');
        error.statusCode = 400;
        throw error;
    }

// Hashea la contraseña
    const salt = await bcrypt.genSalt(10); // [44]
    const hashedPassword = await bcrypt.hash(password, salt);

// Inserta usuario en la BD
    const [result] = await pool.query(
        'INSERT INTO users (email, password, role) VALUES (?,?,?)',
        [email, hashedPassword, role || 'user']
    );

    return { id: result.insertId, email };
    };
const jwt = require('jsonwebtoken');

exports.login = async ({ email, password }) => {
// Encuentra al usuario
  const [users] = await pool.query('SELECT * FROM users WHERE email =?', [
    email,
    ]);
    if (users.length === 0) {
        const error = new Error('Credenciales inválidas');
        error.statusCode = 401;
        throw error;
    }
    const user = users[0];

// Compara la contraseña
const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Credenciales inválidas');
        error.statusCode = 401;
        throw error;
    }

//Crea y firma el JWT
    const payload = {
        user: {
        id: user.id,
        role: user.role,
        },
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '4h' } // Token expira en 4 horas
    );

    return token;
    };