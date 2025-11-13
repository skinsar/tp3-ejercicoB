const pool = require('../db');
const bcrypt = require('bcrypt');

exports.register = async ({ email, password, role }) => {

// Verifica si el usuario ya existe

    const [existingUser] = await pool.query(
        'SELECT * FROM users WHERE email =?',
        [email]
    );

    if (existingUser.length > 0) {
        const error = new Error('El usuario ya existe');
        error.statusCode = 400;
        throw error;
    }
//Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
// Insertar usuario en la BD
    const [result]= await pool.query(

        'INSERT INTO users (email, password, role) VALUES (?,?,?)',
        [email, hashedPassword, role || 'user']
    );

    return { id: result.insertId, email };
};


const jwt = require('jsonwebtoken');
//... (exports.register)...

exports.login = async ({ email, password }) => {
// 1. Encontrar al usuario
    const [users] = await pool.query('SELECT * FROM users WHERE email =?', [
        email,
    ]);
    if (users.length === 0) {
        const error = new Error('Credenciales inválidas');
        error.statusCode = 401;
        throw error;
    }
    const user = users;

// 2. Comparar la contraseña
    const isMatch= await bcrypt.compare(password,    user.password); // [48, 49]
    if (!isMatch) {
        const error = new Error('Credenciales inválidas');
        error.statusCode = 401;
        throw error;
    }

//Crear y firmar el JWT

    const payload= {
        user: {
        id: user.id,
        role: user.role,
        },
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '4h' }
    );

    return token;
};