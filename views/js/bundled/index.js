// remember to run the following command on cli (script on package.json)
// npm run watch:js
/* eslint-disable*///import '@babel/polyfill'; =====> test with try catch block!!!!!!!
/* eslint-disable */const e=()=>{let e=document.querySelector(".alert");e&&e.parentElement.removeChild(e)},t=(t,a,o=7)=>{e();let s=`<div class="alert alert--${t}">${a}</div>`;document.querySelector("body").insertAdjacentHTML("afterbegin",s),window.setTimeout(e,1e3*o)},a=document.querySelector(".form-user-data"),o=document.querySelector(".form-user-password");if(a||o){// type is either 'Password' or 'Data'
let e=async(e,a)=>{try{let o="Password"===a?"/api/v1/users/updateMyPassword":"/api/v1/users/updateMe",s=await axios({method:"PATCH",url:o,data:e});"success"===s.data.status&&(t("success",`${a} updated successfully!`),window.setTimeout(()=>{location.assign("/me")},1500))}catch(e){t("error",e.response.data.message)}};a.addEventListener("submit",async t=>{t.preventDefault();let a=new FormData;a.append("name",document.getElementById("name").value),a.append("email",document.getElementById("email").value),a.append("photo",document.getElementById("photo").files[0]),await e(a,"Data")}),o.addEventListener("submit",async t=>{t.preventDefault(),document.querySelector(".btn--save-password").textContent="Updating...";let a=document.getElementById("password-current").value,o=document.getElementById("password").value,s=document.getElementById("password-confirm").value;await e({passwordCurrent:a,password:o,passwordConfirm:s},"Password"),document.querySelector(".btn--save-password").textContent="SAVE PASSWORD",document.getElementById("password").value="",document.getElementById("password-confirm").value=""})}///////////////////////////////////////////////////////////////////////
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
// DOM ELEMENTS
const s=document.getElementById("map");// DELEGATION
if(s){let e=JSON.parse(s.dataset.locations);(e=>{mapboxgl.accessToken="pk.eyJ1IjoicmFmYWVsdm9zcyIsImEiOiJjbG4xeWk2MjAwMzZmMm9vNWxjaW13ZjljIn0.LGqj0OzqFN-yU0xqOhZbow";let t=new mapboxgl.Map({container:"map",style:"mapbox://styles/rafaelvoss/cln223e2x06d201qi2gjp31vv",scrollZoom:!1}),a=new mapboxgl.LngLatBounds;e.forEach(e=>{// Create marker
let o=document.createElement("div");o.className="marker",// Add marker
new mapboxgl.Marker({element:o,anchor:"bottom"}).setLngLat(e.coordinates).addTo(t),// Add popup
new mapboxgl.Popup({offset:30}).setLngLat(e.coordinates).setHTML(`<p>Day ${e.day}: ${e.description}</p>`).addTo(t),// Extend map bounds to include current location
a.extend(e.coordinates)}),t.fitBounds(a,{padding:{top:200,bottom:150,left:100,right:100}})})(e)}const n=document.querySelector("body").dataset.alert;n&&t("success",n,20);//# sourceMappingURL=index.js.map

//# sourceMappingURL=index.js.map
