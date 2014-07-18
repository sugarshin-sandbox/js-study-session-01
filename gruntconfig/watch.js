/* watch */
module.exports = {
  options: {
    livereload: true,
    spawn: false
  },
  
  live: {
    files: [
       
      '<%= dir.src %>/<%= dir.root %>/*.html',
      '<%= dir.src %>/<%= dir.root %>/**/*.html',
      

      
      '<%= dir.src %>/<%= dir.root %>/<%= dir.css %>/*.css',
      '<%= dir.src %>/<%= dir.root %>/<%= dir.css %>/**/*.css',
      

      '<%= dir.src %>/<%= dir.root %>/<%= dir.js %>/*.js'
    ],
    tasks: [
      

      

      'newer:jshint:lint'
    ]
  }
  
};
