import layout from '../templates/components/8-update-user';
import FeatureBase from './feature-base';

export default FeatureBase.extend({
  layout,

  actions: {
    submit() {
      const {nick, origNick, emailAddress, origEmailAddress}
        = this.getProperties('nick', 'origNick', 'emailAddress', 'origEmailAddress');
      const data = this.getCustomData();

      this.handleResult(
        this.get('senecaAuth').updateUser(nick, origNick, emailAddress, origEmailAddress, data));
    }
  }
});
