import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('examples', { path: '/examples' });
  this.route('useage', { path: '/useage' });
  this.route('index', { path: '/' });
});

export default Router;
