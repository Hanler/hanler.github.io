var state_of_top_menu=false;
function Checking_the_state_of_element(argument) {
				var el =document.getElementById(argument);
    			var rect = el.getBoundingClientRect();
    			var elemTop = rect.top;
    			var elemBottom = rect.bottom;
   				var isVisible = (elemTop < window.innerHeight) && (elemBottom >= 0);
    			if (isVisible==false){
    				document.getElementById('teleport').style.display="flex";
    			}
    			else{

    				document.getElementById('teleport').style.display="none";
    			}
			}
function state_of_scrolling() { // отслеживаем скролл
        var z = document.body.scrollTop; // Получаем высоту передвигаемого сролла
        var pixels = 300; // Указываем количество пикселей
        if (z > pixels){
            console.log("Прокручено на 200px") // Для демонстрации вывод сообщения. У себя меняете на выполнение Вашей функции.
        }
    }
window.onscroll = function() {
     if ((window.innerHeight/2) <= window.pageYOffset && state_of_top_menu==false){
             document.getElementById("bar_top").style.backgroundColor = "#f2f2f2";
             document.getElementById("hamburger_menu").style.backgroundColor = "#5b6770";
             document.getElementById("icon-menu").style.fill = "#f2f2f2";
             document.getElementById("logo").style.fill = "#ea6903";
             document.getElementById("logo-text").style.fill = "#5b6770";
             document.getElementById("share_but").style.backgroundColor = "#5b6770";
             document.getElementById("share-button").style.fill = "#f2f2f2";
             state_of_top_menu=true;
        }
        else if((window.innerHeight/2) >= window.pageYOffset && state_of_top_menu==true){
            document.getElementById("bar_top").style.backgroundColor = "transparent";
             document.getElementById("hamburger_menu").style.backgroundColor = "#f2f2f2";
             document.getElementById("icon-menu").style.fill = "#5b6770";
             document.getElementById("logo").style.fill = "#f2f2f2";
             document.getElementById("logo-text").style.fill = "#f2f2f2";
             document.getElementById("share_but").style.backgroundColor = "#f2f2f2";
             document.getElementById("share-button").style.fill = "#5b6770";
             state_of_top_menu=false;
        }
};