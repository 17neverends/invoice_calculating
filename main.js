let tg = window.Telegram.WebApp;

Telegram.WebApp.MainButton.setParams({
  text_color: '#fff'
}).onClick(Cafe.mainBtnClicked);
Telegram.WebApp.BackButton.onClick(Cafe.backBtnClicked);
Telegram.WebApp.setHeaderColor('bg_color');
