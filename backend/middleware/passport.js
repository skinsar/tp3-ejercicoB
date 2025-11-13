const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt }= require('passport-jwt');
const pool = require('../db');

const options= {
// extrae el token del header "authorization"
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// clave secreta para verificar la firma del token
    secretOrKey: process.env.JWT_SECRET,
    };

passport.use(
    new JwtStrategy(options, async (payload, done) => {
// payload
    try {
        const [users] = await pool.query('SELECT id, email, role FROM users WHERE id =?', [
            payload.user.id,
        ]);

        if (users.length > 0) {
// Usuario encontrado, autenticación exitosa.

        return done(null, users);
        } else {

            return done(null, false);
        }
        } catch (error) {
        return done(error, false);
        }
    })
    );

// middleware simple
module.exports= {
    authenticate: passport.authenticate('jwt', { session: false }),
};