const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    baseUrl:'https://qe-test.recrutamento.avantsoft.com.br' 
  },
});
