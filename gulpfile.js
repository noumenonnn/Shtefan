var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    iconFont = require('gulp-iconfont'),
    runTimestamp = Math.round(Date.now() / 1000),
    async = require('async'),
    consolidate = require("gulp-consolidate");

gulp.task('sass', function() { // Создаем таск Sass
    return gulp.src('app/scss/**/*.scss'). // Берем источник
    pipe(sass()). // Преобразуем Scss в CSS посредством gulp-sass
    pipe(autoprefixer([
        'last 15 versions', '> 1%', 'ie 8', 'ie 7'
    ], {cascade: true})). // Создаем префиксы
    pipe(gulp.dest('app/css')). // Выгружаем результата в папку app/css
    pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/main.css'). // Выбираем файл для минификации
    pipe(cssnano()). // Сжимаем
    pipe(rename({suffix: '.min'})). // Добавляем суффикс .min
    pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

// TODO: Настроить экспорт иконок из svg в шрифт 
gulp.task('Iconfont', function(done) {
    var iconStream = gulp.src(['app/img/icons/*.svg']).pipe(iconfont({fontName: 'myfont'}));

    async.parallel([
        function handleGlyphs(cb) {
            iconStream.on('glyphs', function(glyphs, options) {
                gulp.src('templates/myfont.css').pipe(consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: 'myfont',
                    fontPath: '../fonts/',
                    className: 's'
                })).pipe(gulp.dest('www/css/')).on('finish', cb);
            });
        },
        function handleFonts(cb) {
            iconStream.pipe(gulp.dest('www/fonts/')).on('finish', cb);
        }
    ], done);
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({
        server: {
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js'; //jQuery
        // Другие сторонние библиотеки
    ]).pipe(concat('libs.min.js')). // Собираем их в новом файле libs.min.js
    pipe(uglify()). // Сжимаем JS файл
    pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('watch', [
    'browser-sync', 'css-libs', 'scripts'
], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() { //Отчистка папки продакшена
    return del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*'). // Берем все изображения из app
    pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками с учетом кеширования
        interlaced: true,
        progressive: true,
        svgoPlugins: [
            {
                removeViewBox: false
            }
        ],
        use: [pngquant()]
    }))).pipe(gulp.dest('dist/img'))
});

gulp.task('build', [
    'clean', 'sass', 'img', 'scripts'
], function() { // Сборка проекта

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'app/css/main.css',
        'app/css/libs.min.css'
    ]).pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*'). // Переносим шрифты в продакшен
    pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*'). // Переносим скрипты в продакшен
    pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html'). // Переносим HTML в продакшен
    pipe(gulp.dest('dist'));
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
