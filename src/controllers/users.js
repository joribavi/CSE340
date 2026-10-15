import bcrypt from 'bcrypt'
import {createNewUser, authenticateUser} from '../models/users.js'

const showUserRegistrationForm = (req, res) => {
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

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);
        if (user) {
            req.session.user= user;
            req.flash('success', 'Login successful');
            console.log('User logged in:', user);
            res.redirect('/');
        } else {
            req.flash('error', 'Invalid email or password');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'Error during login');
        res.redirect('/login');
    };
};  

const processLogout = (req, res) => {
    req.flash('success', 'Logged out successfully');

    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            req.flash('error', 'Error logging out');
            res.redirect('/');
        } else {
            res.clearCookie('connect.sid');
            res.redirect('/login');
        }
    });
};


const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to view this page');
        return res.redirect('/login');
    } 
    next();
};

const showDashboard = (req, res) => {
    const user = req.session.user;
    res.render('dashboard', { title: 'Dashboard', name: user.name , email: user.email });
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user || req.session.user.role !== role) {
            req.flash('error', 'You are not authorized to view this page');
            return res.redirect('/login');
        }
        next();
    };
};

export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole };