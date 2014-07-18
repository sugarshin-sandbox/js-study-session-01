/* uglify */
module.exports = {
  options: {
    banner: '<%= banner =>',
    preserveComments: 'some',
    compress: {
      dead_code: true,
      global_defs: {
        'DEBUG': false
      }
    }
  },
  
  min: {
    expand: true,
    cwd: '<%= dir.src %>/<%= dir.root %>/<%= dir.js %>/',
    src: [
      '*.js',
      '!lib/*.js'
    ],
    dest: '<%= dir.build %>/<%= dir.root %>/<%= dir.js %>/'
  }
  
};
