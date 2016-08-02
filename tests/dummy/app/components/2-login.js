import layout from '../templates/components/2-login';
import FeatureBase from './feature-base';

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      const {username, password} = this.getProperties('username', 'password');
      const data = this.getCustomData();

      this.handleResult(
        this.get('senecaAuth').login(username, password, data));
    }
  }
});
