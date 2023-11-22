/* eslint-disable*/
import { showAlert } from './alerts.js';

console.log('funfando!');

const loginForm = document.querySelector('.form--login')

if (loginForm) {
  const login = async (email, password) => {
    try{
      const res = await axios({
        method: 'POST',
        url: '../api/v1/users/login',
        data: {
            email,
            password
        }
      });
      
      if (res.data.status === 'success') {
        showAlert('success','Logged in successfully!');
        window.setTimeout(()=> {
          location.assign('/');
        }, 1500);
      }
  
    } catch (err) {
      showAlert('error', err.response.data.message);
    };
  };
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
};

const logOutBtn = document.querySelector('.nav__el--logout')

if (logOutBtn) {
  const logout = async () => {
    try{
      const res = await axios({
        method: 'GET',
        url: '../api/v1/users/logout',
      });
      
      if (res.data.status === 'success') location.assign('/');
  
    } catch (err) {
      showAlert('error', 'Error logging out! Try again.');
    };
  };

  logOutBtn.addEventListener('click', (e) => { logout() });
}
