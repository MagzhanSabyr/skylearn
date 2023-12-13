// Ваша задача - разработать удобную систему настроек профиля пользователя. Эта система должна включать в себя следующие элементы:

// 1. Веб-страница:
// • Сверстайте веб-страницу, разделяя ее экран на две части для удобного отображения пользовательских данных.

// 2. Форма для ввода данных (Левая часть страницы):
// • Реализуйте форму для ввода следующих данных пользователя:
//     ◦ Фотография пользователя (используя input[type=file]).
//     ◦ Имя и фамилия (используя input[type=text]).
//     ◦ Работа в компании (выбор из предоставленных вариантов с использованием select).
//             ◦ Варианты: Meta, Apple, Amazon, Netflix, Google, Microsoft.
//             ◦ При выборе компании, рядом с названием должен отображаться логотип компании.
//     ◦ Текущяя должность в компании (выбор из предоставленных вариантов с использованием input[type=radio]).
//             ◦ Варианты: Software Engineer Intern, Junior Software Engineer, Software Engineer, Senior Software Engineer.
//             ◦ При выборе должности, рядом с названием должен отображаться эмоджи описывающий ранг.
//     ◦ Социальные сети (используя input[type=url]).
//             ◦ Варианты: Github, LinkedIn, Instagram, Telegram.

// 3. Отображение данных (Правая часть страницы):
// • На правой стороне сайта отобразите введенные пользовательские данные:
//     ◦ Фотографию пользователя.
//     ◦ Имя и фамилию.
//     ◦ Название компании с соответствующим логотипом.
//     ◦ Текущую должность.
//     ◦ Ссылки на социальные сети с логотипами компаний (активные или неактивные, в зависимости от наличия ссылок).

// Требования:

// 1. Анимация:
//     ◦ Добавьте анимацию при нажатии на кнопку "Отправить", чтобы улучшить визуальный опыт пользователя.
// 2. Валидация:
//     ◦ Реализуйте валидацию для каждого поля формы, обеспечивая корректность ввода данных.
//     ◦ В случае ошибок валидации, предоставьте понятные и информативные сообщения об ошибках.
// 3. Логотипы компаний:
//     ◦ Интегрируйте логотипы компаний рядом с их названием для более наглядного представления.
// 4. Социальные сети:
//     ◦ Отобразите социальные сети пользователя в виде ссылок с логотипами компаний; при отсутствии ссылок, логотипы должны быть неактивными.




var selectedCompanyLogo = 'images/meta.png';
window.onload = function() {
    updateCompanyLogo();
};
document.getElementById('main-form1').addEventListener('submit', function(event) {
  event.preventDefault();
  if (!validateForm()) {
    return;
  }
  var photoInput = document.getElementById('photo');
  displayImage(photoInput);

  var username = document.getElementById('username').value;
  var company = document.getElementById('company').value;
  var position = document.querySelector('input[name="position"]:checked').value;
  var socialsContainer = document.createElement('div');
  socialsContainer.appendChild(createSocialLink(document.getElementById('github').value, 'github'));
  socialsContainer.appendChild(createSocialLink(document.getElementById('linkedin').value, 'linkedin'));
  socialsContainer.appendChild(createSocialLink(document.getElementById('instagram').value, 'instagram'));
  socialsContainer.appendChild(createSocialLink(document.getElementById('telegram').value, 'telegram'));

  if (username === '' || company === '' || position === '') {
    alert('Пожалуйста, заполните все поля!');
    return;
  }

  var displaySection = document.getElementById('main-form2');
  displaySection.innerHTML = '<h2>Профиль Пользователя</h2>';
  displaySection.innerHTML += '<p>Имя: ' + username + '</p>';
  displaySection.innerHTML += '<p>Компания: ' + company + '</p>';
  var companyLogo = document.getElementById('companyLogo');
  if (!companyLogo) {
      companyLogo = document.createElement('img');
      companyLogo.id = 'companyLogo';
      companyLogo.style.width = '50px';
      displaySection.appendChild(companyLogo);
  }
  if (selectedCompanyLogo) {
      var img = document.getElementById('companyLogoDisplay');
      if (!img) {
          img = document.createElement('img');
          img.id = 'companyLogoDisplay';
          img.style.width = '50px';
          displaySection.appendChild(img);
      }
      img.src = selectedCompanyLogo;
      img.style.display = 'block';
  }
  companyLogo.src = selectedCompanyLogo;
  companyLogo.style.display = 'block';


  displaySection.innerHTML += '<p>Должность: ' + position + '</p>';
  displaySection.appendChild(socialsContainer);

  var submitButton = event.target.querySelector('button');
  submitButton.classList.add('clicked');
  setTimeout(function() {
    submitButton.classList.remove('clicked');
  }, 200);
});


function updateCompanyLogo() {
  var company = document.getElementById('company').value;
  var logo = document.getElementById('companyLogo');
  var logoPath = 'images/' + company + '.png';

  if (company) {
    logo.src = logoPath;
    logo.style.display = 'block';
    selectedCompanyLogo = logoPath; 
  } else {
    logo.style.display = 'none';
    selectedCompanyLogo = ''; 
  }
}


document.getElementById('company').addEventListener('change', updateCompanyLogo);

function updatePositionEmoji() {
  document.getElementById('emoji-intern').textContent = '';
  document.getElementById('emoji-junior').textContent = '';
  document.getElementById('emoji-engineer').textContent = '';
  document.getElementById('emoji-senior').textContent = '';

  var selectedPosition = document.querySelector('input[name="position"]:checked').value;

  var emojis = {
    intern: '👶',   
    junior: '🧑‍💻',   
    engineer: '💻', 
    senior: '👴'    
  };
  document.getElementById('emoji-' + selectedPosition).textContent = emojis[selectedPosition];
}

function displayImage(fileInput) {
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var userPhoto = document.getElementById('userPhoto');
        if (!userPhoto) {
            userPhoto = document.createElement('img');
            userPhoto.id = 'userPhoto';
            userPhoto.style.width = '100px'; 
            userPhoto.style.height = 'auto';
            var displaySection = document.getElementById('main-form2');
            displaySection.insertBefore(userPhoto, displaySection.firstChild);
        }
        userPhoto.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}


function createSocialLink(url, platform) {
  var link = document.createElement('a');
  var img = document.createElement('img');
  img.src = 'images/' + platform + '.png'; 
  img.style.width = '20px';  
  img.style.height = '20px';
  img.style.marginRight = '5px';

  if (url) {
    link.href = url;
    link.target = '_blank'; 
  } else {
    img.style.opacity = '0.3'; 
  }

  link.appendChild(img);
  return link;
}

function validateForm() {
    var isValid = true;
    var errorMessage = '';

    var username = document.getElementById('username').value;
    if (!username.trim()) {
        errorMessage += 'Пожалуйста, введите имя и фамилию.\n';
        isValid = false;
    }

    var company = document.getElementById('company').value;
    if (!company) {
        errorMessage += 'Пожалуйста, выберите компанию.\n';
        isValid = false;
    }

    var position = document.querySelector('input[name="position"]:checked');
    if (!position) {
        errorMessage += 'Пожалуйста, выберите должность.\n';
        isValid = false;
    }

    var github = document.getElementById('github').value;
    if (github && !isValidUrl(github)) {
        errorMessage += 'Пожалуйста, введите корректный URL для GitHub.\n';
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
    }

    return isValid;
}

function isValidUrl(string) {
    try {
        new URL(string);
    }    catch (_) {
        return false;
    }
    return true;
}
