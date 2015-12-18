module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    transport: {
      airplane: {
          options: {
              // 是否采用相对地址
              relative: true,
              // 生成具名函数的id的格式 默认值为 {{family}}/{{name}}/{{version}}/{{filename}}
              format: '../js/dest/{{filename}}'
          },
          files: [{
              // 相对路径地址
              'cwd':'js/src',
              // 需要生成具名函数的文件集合
              'src':['main.js','view.js','player.js','bullet.js','enemy.js','common.js'],
              // 生成存放的文件目录。里面的目录结构与 src 里各个文件名带有的目录结构保持一致
              'dest':'.build'
          }]
      }
    },
    concat:{
        projectA: {
            options: {
                // 相对路径地址
                relative: true
            },
            files: {
                // 合并后的文件地址
                'js/dest/main.js': ['.build/main.js','.build/view.js','.build/player.js','.build/bullet.js','.build/enemy.js','.build/common.js']
            }
        }
    },
    uglify: {
      options: {
        banner: '/*<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        files: [{
          expand: true,
          cwd: 'js/dest',
          src: '**/*.js',
          dest: 'js/dest'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-cmd-transport');
  // 加载提供"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // 默认任务
  grunt.registerTask('default', ['transport','concat','uglify']);
}