/* esliny-disable */
import { showAlert } from './alerts.js';

const stripe = Stripe(
  'pk_test_51OKiTYIpmsCrRTHpkWekhX8jsfPEiP6QY5yobUkkkxS23YZHsOzBKkPc9xHNrbIPugUDrs1bIxflCTrzWLvZg2VO00T2DEdCFN'
);

const bookBtn = document.getElementById('book-tour');

if (bookBtn) {
  const bookTour = async (tourId) => {
    try {
      // 1) Get checkout session from API
      const session = await axios(
        `/api/v1/bookings/checkout-session/${tourId}`
      );
      // console.log(session.data.session.url);

      // 2) Create checkout form + charge credit card
      location.replace(session.data.session.url);
    } catch (err) {
      // console.log(err);
      showAlert('error', err);
    }
  };

  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
