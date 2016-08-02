import layout from '../templates/components/7-execute-reset';
import FeatureBase from './feature-base';

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      const {token, password, repeat} = this.getProperties('token', 'password', 'repeat');
      const data = this.getCustomData();

      this.handleResult(
        this.get('senecaAuth').executeReset(token, password, repeat, data));
    }
  }
});
