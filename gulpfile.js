var {series , parallel, src , dest ,watch} = require("gulp");
var clean  = require('gulp-clean');
var sass = require('gulp-sass'); 
var fileInclude  = require('gulp-file-include') //把html拆分成代码片段
var webserver  = require('gulp-webserver')//利用gulp来开启一个web服务器（前端的服务)



function cleanTask(){
    return src('dist',{allowEmpty:true})  //allowEmpty:表示忽略找不到的文件，这样就不会报错
    .pipe(clean());
}

function cssTask(){  
    return src("./src/css/**")
            .pipe(sass())
            .pipe(dest("dist/css"))
}
function staticTask(){  
    return src("./src/static/**")
            .pipe(dest("dist/static"))
}

function libTask(){  
    return src("./src/lib/**")
            .pipe(dest("dist/lib"))
}
function jsTask(){  
    return src("./src/js/**")
            .pipe(dest("dist/js"))
}
function apiTask(){  
    return src("./src/api/**")
            .pipe(dest("dist/api"))
}

function fileIncludeTask(){
    return src('./src/view/*.html')
        .pipe(fileInclude(
            {
                prefix:"@",   //要引入代码片段的标识符（标识符是自定义的）
                basepath:'./src/view/template'      //代码片段的根目录
            }
        ))
        .pipe(dest('dist/view'));
}

function webserverTask(){  //开启一个web服务的任务
    return src('dist')     //指定服务器的根目录
        .pipe(webserver({
            host:'localhost',   //本地域名
            port:4000,          //端口
            open:'./view/index.html',    //open是会自动把url在浏览器打开
            livereload:true , //热更新，在不刷新浏览器的时候也能自动更新变化
            proxies:[       //配置反向代理
                {
                    source:'/api2',
                    target:'http://localhost/api2'
                },
                {
                    source:'/api3',
                    target:'http://localhost/api3'
                }
            ]
        
        })) 
}

function watchTask(){
    watch('./src/view/**',fileIncludeTask); //一旦html文件发生变化，就会触发对应的任务
    watch('./src/css/**',cssTask);
    watch('./src/static/**',staticTask);
    watch('./src/lib/**',libTask);
    watch('./src/js/**',jsTask);
    watch('./src/api/**',jsTask);
}

module.exports ={
    //开发命令
    dev : series(cleanTask, parallel(cssTask, fileIncludeTask ,staticTask,libTask,jsTask,apiTask) , parallel (webserverTask,watchTask )),

    //生产命令
    build : series(cleanTask,fileIncludeTask),


};

















