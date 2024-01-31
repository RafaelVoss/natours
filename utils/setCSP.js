const helmet = require('helmet');

exports.setCSP = (req, res, next) => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': [
          "'self'",
          'ws://127.0.0.1:1234/',
          'https://*.mapbox.com',
          'https://fonts.googleapis.com/',
          'https://js.stripe.com/v3/m-outer-27c67c0d52761104439bb051c7856ab1.html#url=http%3A%2F%2F127.0.0.1%3A3000%2Ftour%2Fthe-park-camper&title=Natours%20%7C%20The%20Park%20Camper%20Tour&referrer=&muid=NA&sid=NA&version=6&preview=false',
          'https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fnatours-project-0iop.onrender.com%2Ftour%2Fthe-sea-explorer&title=Natours%20%7C%20The%20Sea%20Explorer%20Tour&referrer=&muid=NA&sid=NA&version=6&preview=false',
        ],
        'connect-src': [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'ws://127.0.0.1:1234/',
          'ws://localhost:1234/',
          'https://api.mapbox.com/',
          'https://events.mapbox.com/',
          'http://127.0.0.1:3000/api/v1/users/login',
          'http://127.0.0.1:3000/api/v1/users/updateMe',
          'https://js.stripe.com/v3/.deploy_status_henson.json',
          'wss://natours-project-0iop.onrender.com:1234/',
        ],
        'base-uri': ["'self'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'object-src': ["'none'"],
        'script-src': [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'https://api.mapbox.com',
          'blob:',
          'https://js.stripe.com/v3/',
        ],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
        // block-all-mixed-content;
        // upgrade-insecure-requests;
      },
    },
  });
};

// HOW TO SET CSP MANUALLY IN EVERY RESPONSE
// res.set(
//     'Content-Security-Policy',
//     "default-src 'self' ws://127.0.0.1:1234/ https://*.mapbox.com;connect-src 'self' https://cdnjs.cloudflare.com;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
//   );

// HEADER RESPONSE OBJECT ==> res._header
// _header: 'HTTP/1.1 304 Not Modified\r\n' +
//"Content-Security-Policy: default-src 'self' ws://127.0.0.1:1234/; base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;\r\n" +
