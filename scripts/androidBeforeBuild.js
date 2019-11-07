#!/usr/bin/env node

module.exports = function(context) {

  var fs = context.requireCordovaModule('fs'),
    path = context.requireCordovaModule('path');

	process.stdout.write('AMAL : Came inside script');
  var platformRoot = path.join(context.opts.projectRoot, 'platforms/android');

  var gradleFile = path.join(platformRoot, 'build.gradle');
   process.stdout.write('AMAL: Came into script');
	
  if (fs.existsSync(gradleFile)) {
    try {
        fs.readFile(gradleFile, 'utf8', function (err,data) {
          if (err) {
            throw new Error('Unable to find build.gradle: ' + err);
          }

          var oldGradleDep = 'com.android.tools.build:gradle:3.3.0';
		  var newGradleDep = 'com.android.tools.build:gradle:3.3.1';
    
            var result = data.replace(oldGradleDep, newGradleDep);

            fs.writeFile(gradleFile, result, 'utf8', function (err) {
              if (err) {
                  throw new Error('Unable to write into build.gradle: ' + err);
 
              process.stdout.write('AMAL: Updated gradle file');
            });
          }
        });
    } catch(err) {
        process.stdout.write(err);
    }
  }
}
