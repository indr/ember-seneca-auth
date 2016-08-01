import layout from '../templates/components/1-register';
import FeatureBase from './feature-base';

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      const {emailAddress, password} = this.getProperties('emailAddress', 'password');

      this.handleResult(
        this.get('senecaAuth').register(emailAddress, password));
    }
  }
});
