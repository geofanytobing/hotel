import { TAPi18n } from 'meteor/tap:i18n';
import './i18nSelector.html';

Template.i18nSelector.events ({
  //set language to selected option's tag
  'change .tap-i18n-select select': function(e) {

  Session.set("language", $(e.currentTarget).val())
  return TAPi18n.setLanguageAmplify($(e.currentTarget).val());
}
})
