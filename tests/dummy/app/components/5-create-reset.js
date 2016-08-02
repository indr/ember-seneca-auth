import layout from '../templates/components/4-logout';
import FeatureBase from './feature-base';

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      const {emailAddress, nick} = this.getProperties('emailAddress', 'nick');
      const data = this.getCustomData();

      this.handleResult(
        this.get('senecaAuth').createReset(emailAddress, nick, data));
    }
  }
});
