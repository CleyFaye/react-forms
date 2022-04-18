const loadGruntTasks = require("load-grunt-tasks");
const {
  reactApp,
  reactAppOptionsHelper,
} = require("@cley_faye/boilerplate/grunt.js");

module.exports = grunt => {
  loadGruntTasks(grunt);
  const baseGruntConfig = {clean: {dist: ["dist"]}};
  const reactAppConfig = {
    pug: {},
    image: {disabled: true},
    webpack: {typescript: true},
    sass: {disabled: true},
    copy: {disabled: true},
  };
  const requiredTasks = reactApp(
    baseGruntConfig,
    "webapp",
    reactAppOptionsHelper(
      {production: Boolean(grunt.option("prod"))},
      reactAppConfig,
    ),
  );
  grunt.initConfig(baseGruntConfig);
  grunt.registerTask(
    "webapp",
    "Build the webapp",
    requiredTasks,
  );
};
