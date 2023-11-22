// Используя дизайн 9 урока, добавьте логику вашему веб-сайту:

// 1. Обновите HTML код в соответствии с дизайном 9 урока, чтобы обеспечить динамическое отображение блюд на детальной странице ресторана при помощи JavaScript/jQuery.
// 2. Реализуйте функциональность корзины на данной странице, вдохновляясь подходом, используемым в приложении Wolt. Включите взаимодействие с корзиной, добавление и удаление блюд, а также обновление общей стоимости заказа.


$(document).ready(function() {
    // Добавим пример динамического изменения контента
    $("#changeContentButton").click(function() {
        $("#dynamicContent").html("Новый контент!");
    });
});