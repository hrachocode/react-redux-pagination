React Redux ToDo

Application Настроен паттерном react + redux + redux-persist(для хранения стора после обновление страницы)

Всю Маршрутизацию храним в в файле >> src/configs/routerConfig.js

в папке store храним данные 

в папке utils все основные функции и итерации. 

все компоненты >> functional

основной паттерн работы с данными >> Hooks (redux hooks, react router hook, react hooks)

для фронта использовал bootstrap4

css праписан на index.css не разделил на мелькие файлы потому что много чего не писал.

некоторые картинки касаюшийся главной страницы храняться в как components/main/assets/img

boilerplate: react-create-app

ссылка: https://hrachocode.github.io/react-redux-pagination 

Две проблемы. 
одну просто не успел. но могу сделать очень быстро >> текстовое уведомление о добавлении задачи или об изменении задачи не исчезает когда делаеться навигация по страницам (просто не успел, вопрос чисто времени)

вторая что github pages неподдерживает Public path и history fallback api , то есть перенаправить бекенду незнакомые роуты на index.html , потом с клиеннсткой части уже перенаправить на страницу, из за етого после обновления страницы выдает 404, но навигация и функционал работает как нужно.

Для локальной проверки снимаем от всех ссылок и route ов '/react-redux-pagination' и делаем npm start 
