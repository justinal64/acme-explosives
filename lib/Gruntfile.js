module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['../javascript/**/*.js'],
      options:{
          predef: ["document", "console", "$", "alert"],
          esnext: true,
          globalstrict: true,
          globals: {},
          browserify: true
      }
    },
    watch: {
      files: ['../javascript/**/*.js'],
      options: {
        livereload: true,
      },
      javascripts: {
        files: ['../javascript/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'watch']);
};