import about from '~/api/modules/about'
import antiCrisis from '~/api/modules/anti-crisis'
import completedCase from '~/api/modules/completed-case'
import contacts from '~/api/modules/contacts'
import customers from '~/api/modules/customers'
import direction from '~/api/modules/direction'
import docs from '~/api/modules/docs'
import education from '~/api/modules/education'
import job from '~/api/modules/job'
import performer from '~/api/modules/performer'
import reviewSources from '~/api/modules/review-sources'
import reviews from '~/api/modules/reviews'
import segment from '~/api/modules/segment'
import services from '~/api/modules/services'
import socialLinks from '~/api/modules/social-links'

export default ($axios) => ({
  about: about($axios),
  antiCrisis: antiCrisis($axios),
  buttons: () => $axios.$get('buttons/'),
  completedCase: completedCase($axios),
  contacts: contacts($axios),
  customers: customers($axios),
  direction: direction($axios),
  docs: docs($axios),
  education: education($axios),
  job: job($axios),
  performer: performer($axios),
  segment: segment($axios),
  services: services($axios),
  showreal: () => $axios.$get('showreal/'),
  socialLinks: socialLinks($axios),
  feedback: (data, config) => $axios.$post('bids/', data, config),
  metatags: () => $axios.$get('meta_tags/'),
  can: () => $axios.$get('canwedo/'),
  reviews: reviews($axios),
  reviewSources: reviewSources($axios),
})