// example module to use as a template
// if changing directory name or adding new directories, for example to add a utils folder, you will need to udpate vite.config.ts ...
// line 15: copies modules directory + contents to the build folder. Modify or copy this line to account for your changes
export default function test_function(a){
    console.log(a + 2);
}