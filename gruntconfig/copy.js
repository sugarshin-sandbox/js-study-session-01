/* copy */
module.exports = {
  
  build: {
    expand: true,
    cwd: '<%= dir.src %>/',
    src: [
      '<%= dir.root %>/**/*'
    ],
    dest: '<%= dir.build %>/'
  }
  
};
