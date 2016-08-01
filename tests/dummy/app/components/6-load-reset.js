import layout from '../templates/components/6-load-reset';
import FeatureBase from './feature-base';

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      const {token} = this.getProperties('token');

      this.handleResult(
        this.get('senecaAuth').loadReset(token));
    }
  }
});
