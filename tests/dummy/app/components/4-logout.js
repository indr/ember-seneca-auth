import layout from '../templates/components/4-logout';
import FeatureBase from './feature-base';

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      this.handleResult(
        this.get('senecaAuth').logout());
    }
  }
});
