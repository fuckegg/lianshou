module.exports=function(grunt){
	grunt.initConfig({
		watch:{
			scripts:{
				files:['src/*.js'],
				tasks:['uglify'],
				options:{
					spawn:false
				}
			}
		},		
		uglify:{
			buildall:{
				files:[{
					expand:true,
					cwd:'src',//js目录下
					src:'**/*.js',//所有js文件
					dest:'build',//输出到此目录下	
					ext:'.min.js'//替换所有生成的目标文件后缀为这个属性
				}]				
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default',['watch']);
}
