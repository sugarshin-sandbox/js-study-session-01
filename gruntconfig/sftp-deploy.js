/* sftp-deploy */
module.exports = {
  
  test: {
    auth: {
      host: 'host',
      port: 21,
      authKey: 'key2'
    },
    src: '<%= dir.build %>/<%= dir.root %>/',
    dest: '/path/',
    exclusions: ['.DS_Store']
  },
  publish: {
    auth: {
      host: 'host',
      port: 21,
      authKey: 'key1'
    },
    src: '<%= dir.build %>/<%= dir.root %>/',
    dest: '/path/',
    exclusions: ['.DS_Store']
  }
  
};
