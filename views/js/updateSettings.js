/* eslint-disable*/
import { showAlert } from './alerts.js';

const userDataForm = document.querySelector('.form-user-data')
const userPasswordForm = document.querySelector('.form-user-password')

if (userDataForm || userPasswordForm) {
  // type is either 'Password' or 'Data'
  const updateSettings = async (data, type) => {
    try{
      const url = type === 'Password' ? '/api/v1/users/updateMyPassword' : '/api/v1/users/updateMe'
      const res = await axios({
        method: 'PATCH',
        url,
        data
      });
      
      if (res.data.status === 'success') {
        showAlert('success',`${type} updated successfully!`);
        window.setTimeout(()=> {
          location.assign('/me');
        }, 1500);
      }
  
    } catch (err) {
      showAlert('error', err.response.data.message);
    };
  };
  
  userDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    await updateSettings(form, 'Data');
  });

  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...'
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({passwordCurrent, password, passwordConfirm}, 'Password');

    document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
};


///////////////////////////////////////////////////////////////////////


// if (userPasswordForm) {
//   const updatePassword = async (passwordCurrent, password, passwordConfirm) => {
//     try{
//       const res = await axios({
//         method: 'PATCH',
//         url: 'http://127.0.0.1:3000/api/v1/users/updateMyPassword',
//         data: {
//             passwordCurrent,
//             password,
//             passwordConfirm
//         }
//       });
      
//       if (res.data.status === 'success') {
//         showAlert('success','Password updated successfully!');
//         window.setTimeout(()=> {
//           location.assign('/me');
//         }, 1500);
//       }
  
//     } catch (err) {
//       showAlert('error', err.response.data.message);
//     };
//   };
  
  
// };

// export const updateData = async (name, email) => {
//     try {
//         const res = await axios({
//             method: 'PATCH',
//             url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
//             data: {
//                 name,
//                 email
//             }
//         })
        
//         if (res.data.status === 'success') {
//             showAlert('success', 'Data updated successfully!')
//         }
//     } catch (err) {
//         showAlert('error', err.response.data.message);
//     };
// }