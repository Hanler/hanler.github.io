var state_of_top_menu=false;
var arr_state_of_sections=[false,false,false,false,false,false,false,false,false];
document.getElementsByClassName("content-bar")[0].onscroll = function() {
        for(var i=0; i<9; i++){
            var el =document.getElementsByClassName("sections")[i];
            var rect = el.getBoundingClientRect();
                var elemTop = rect.top;
                var elemBottom = rect.bottom;
                var isVisible = (elemTop < window.innerHeight) && (elemBottom >= 0);
                if (isVisible==false){
                    arr_state_of_sections[i]=false;
                }
                else{
                    arr_state_of_sections[i]=true;
                }
                console.log(arr_state_of_sections);
        }
        for (var j = 0; j < 9; j++) {
            document.getElementsByClassName("blocks")[j].style.backgroundColor = "white";
            document.getElementsByClassName("blocks")[j].style.color = "#5b6770";
        }
        document.getElementsByClassName("blocks")[arr_state_of_sections.indexOf(true)].style.backgroundColor = "#5b6770";
        document.getElementsByClassName("blocks")[arr_state_of_sections.indexOf(true)].style.color = "#f2f2f2";
           i=0;     
    }
window.onscroll = function() {
    // startem();
     if ((window.innerHeight/2) <= window.pageYOffset && state_of_top_menu==false){
             document.getElementById("bar_top").style.backgroundColor = "#f2f2f2";
             document.getElementById("hamburger_menu").style.backgroundColor = "#5b6770";
             document.getElementById("icon-menu").style.fill = "#f2f2f2";
             document.getElementById("logo").style.fill = "#ea6903";
             document.getElementById("logo-text").style.fill = "#5b6770";
             document.getElementById("share_but").style.backgroundColor = "#5b6770";
             document.getElementById("share-button").style.fill = "#f2f2f2";
             document.getElementById("menu_title").style.visibility = "visible";
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
             document.getElementById("menu_title").style.visibility = "hidden";
             state_of_top_menu=false;
        }
}