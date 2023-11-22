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
        ],
        'connect-src': [
          "'self'",
          'https://cdnjs.cloudflare.com',
          'ws://127.0.0.1:1234/',
          'ws://localhost:1234/',
          'https://api.mapbox.com/',
          'https://events.mapbox.com/',
          'http://127.0.0.1:3000/api/v1/users/login',
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
