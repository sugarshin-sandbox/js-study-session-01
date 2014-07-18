/* html-validation */
module.exports = {
  options: {
    reset: true,
    doctype: 'HTML5',
    charset: 'urf-8',
    path: 'ignore/html-validation/validation-status.json',
    reportpath: 'ignore/html-validation/validation-report.json',
    relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'],
    failHard: true
  },
  
  validate: {
    src: [
      '<%= dir.src %>/<%= dir.root %>/**/*.html',
      '<%= dir.src %>/<%= dir.root %>/*.html'
    ]
  }
  
};
