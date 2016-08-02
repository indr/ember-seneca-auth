import layout from '../templates/components/9-change-password';
import FeatureBase from './feature-base';

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      const {password, repeat} = this.getProperties('password', 'repeat');
      const data = this.getCustomData();

      this.handleResult(
        this.get('senecaAuth').changePassword(password, repeat, data));
    }
  }
});
