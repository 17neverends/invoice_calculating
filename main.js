let tg = window.Telegram.WebApp;

tg.expand(); 

tg.MainButton.text = "Changed Text";
tg.MainButton.setText("Changed Text1");
tg.MainButton.textColor = "#F55353";
tg.MainButton.color = "#143F6B";
tg.MainButton.setParams({"color": "#143F6B"});
tg.MainButton.enable();

