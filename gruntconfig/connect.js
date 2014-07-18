/* connect */
module.exports = {
  options: {
    port: 9008
  },
  
  live: {
    options: {
      base: '<%= dir.src %>/'
    }
  },
  demo: {
    options: {
      keepalive: true,
      base: '<%= dir.build %>/'
    }
  }
  
};
