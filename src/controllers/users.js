import bcrypt from 'bcrypt'
import {createNewUser} from '../models/users.js'

const  showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const userId = await createNewUser(name, email, passwordHash);
        
        req.flash('success', 'User registered successfully');
        res.redirect(`/`);
    } catch (error) {
        console.error('Error creating new user:', error);
        req.flash('error', 'Error creating new user');
        res.redirect('/register');
    };
}

export { showUserRegistrationForm, processUserRegistrationForm };