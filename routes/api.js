'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      
      let text = req.body.text;
      let locale = req.body.locale;
      
      if (text === undefined || !locale) {
        return res.json({ error: 'Required field(s) missing' });
      }
      
      if (text.length === 0) {
        return res.json({ error: 'No text to translate' });
      }
      
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }
      
      let translation = translator.translate(text, locale);

      console.log({ text: text, translation: translation });
      
      if (text === translation) {
        return res.json({ text: text, translation: 'Everything looks good to me!' });
      }
      
      return res.json({ text, translation });
    });
};
