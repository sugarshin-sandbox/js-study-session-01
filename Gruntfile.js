module.exports = function(grunt) {

  var configDir = 'gruntconfig',
      fs = require('fs'),
      path = require('path'),
      packageJson = grunt.file.readJSON('package.json');

  fs.readdirSync(configDir).forEach(function(filePath) {
    var fileName, modulePath, stats;

    modulePath = path.join(__dirname, configDir, filePath);
    stats = fs.statSync(modulePath);
    fileName = filePath.split('.')[0];
    if (stats.isFile() && filePath.charAt(0) !== '.' && filePath.charAt(0) !== '_') {
      return grunt.config.set(fileName, require(modulePath));
    }
  });

  Object.keys(packageJson.devDependencies).slice(1).forEach(grunt.loadNpmTasks);



  // registerTask ----------------------

  
  // Live reload
  grunt.registerTask('l', 'Live reloading.', function() {
    grunt.task.run('connect:live');
    grunt.task.run('watch:live');
  });

  // build
  grunt.registerTask('b', 'Build.', function() {
    
    
    grunt.task.run('copy:build');
    
    grunt.task.run('jshint:lint');
    grunt.task.run('uglify:min');
    
  });

};
