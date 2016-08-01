import layout from '../templates/components/3-user';
import FeatureBase from './feature-base';

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      this.handleResult(
        this.get('senecaAuth').user());
    }
  }
});
