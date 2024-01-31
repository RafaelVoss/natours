import { showAlert } from './alerts.js';

const signupForm = document.querySelector('.form--signup');

if (signupForm) {
    const signup = async (name, email, password, passwordConfirm) => {
        try{
            const res = await axios({
                method: 'POST',
                url: '/api/v1/users/signup',
                data: {
                    name,
                    email,
                    password,
                    passwordConfirm,
                }
            })

            if (res.data.status === 'success') {
                showAlert('success','Account successfully created!');
                window.setTimeout(()=> {
                  location.assign('/');
                }, 1500);
              }
        } catch{
            showAlert('error', err.response.data.message);
        }
    };

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password__confirm').value;
        signup(name, email, password, passwordConfirm);
        // console.log(name, email, password, passwordConfirm);
    });
};