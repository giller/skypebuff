module.exports = function(grunt){

	grunt.initConfig({
	jshint : {
				 files : ['*.js', '*/*.js']
			 },
	watch : {
				files : ['*.js', '*/*.js'],
				tasks : ['jshint']
			}
		

	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
};
