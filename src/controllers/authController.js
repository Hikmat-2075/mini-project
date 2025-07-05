import userService from '../services/authService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try{
        const existingEmail = await userService.findUserByEmail(email);
        if(existingEmail){
            return res.status(409).json({
                message: 'Email already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userService.createUser({
            username,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            message: 'User registered',
            user,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userService.findUserByUsername(username);
        if(!user){
            return res.status(401).json({
                message: "Invalid username or password 1",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                message: 'Invalid username or password 2',
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(200).json({
            message: 'Login Succuessful',
            token: token,
        });
    } catch (error) {
        console.log("Login Error:", error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

export default { register, login };