import layout from '../templates/components/1-register';
import FeatureBase from './feature-base';

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      const {emailAddress, password, repeat, nick, name}
        = this.getProperties('emailAddress', 'password', 'repeat', 'nick', 'name');
      const data = this.getCustomData();

      this.handleResult(
        this.get('senecaAuth').register(emailAddress, password, repeat, nick, name, data));
    }
  }
});
