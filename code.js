document.addEventListener("DOMContentLoaded", function(){
    var test_a =false;
    var inp = document.getElementById("nb");
    inp.disabled=true;
    var btn = document.querySelector("input[type=submit]");
    btn.disabled = true;
    var btn1 = document.querySelector("button");
    var p = document.querySelector("p");
    var nb_devenir;
    var player;
    var tentative;
    var classement = new Array();
    var por = document.getElementById("nav");
    var v_min = 0;
    var v_max = 100;
    var v_max2;
    var dif;
    var b = document.getElementById("b");
    var a = document.querySelector("a");
    btn1.addEventListener("click", function(){
        tentative = 0;
        nb_devenir = nbAlea(0,100);
        console.log(nb_devenir);
        v_min = 0;
        v_max = 100;
        v_max2 = 0;
        console.log(player);
        console.log(player);
        inp.disabled=false;
        btn.disabled=false;
        btn1.disabled=true;
        test_a = false;
        inp.focus();
        por.innerHTML = '<span style="background-color:white;width: '+0+'%;"></span><span style="background-color:blue;width: '+100+'%;"></span><span style="background-color:white;width: '+0+'%;"></span>';
        do{
            player = prompt("saisie votre nom : ");
            console.log(player);
        }while(player == '');
        p.innerHTML = "<strong>Bienvenue <em> "+player+" </em></strong>";
        a.innerHTML = "changer le nom";
    })
    btn.addEventListener("click", function(){
        var nb_saisire = inp.value;
        console.log(nb_saisire);
        tentative++;
        if( nb_saisire == nb_devenir){
            b.innerHTML = "";
            alert("Bravo, vous avez trové le nomber cherché aprés "+tentative+" tentatives");
            inp.disabled=true;
            btn.disabled=true;
            btn1.disabled=false;
            test_a = true;
            classement[player] = tentative;
            afficher(classement);
            v_min = nb_saisire;
            v_max2 = 99.5-nb_saisire;
            por.innerHTML = '<span style="background-color:white;width: '+v_min+'%;"></span><span style="background-color:red;width: '+0.5+'%;"></span><span style="background-color:white;width: '+v_max2+'%;"></span>';
        }else{
            if( nb_saisire > nb_devenir){
                b.innerHTML = "";
                v_max = nb_saisire;
                v_max2 = 100-v_max;
                alert("Le nombre cherché est plus ptit");
            }else if(nb_saisire == ''){
                b.innerHTML = "";
                b.innerHTML = "adekhal xi ra9em assahbi";
                tentative--;
            }else if(nb_saisire < nb_devenir){
                b.innerHTML = "";
                alert("Le nombre cherché est plus grand");
                v_min = nb_saisire;
            }
            dif = v_max-v_min;
            por.innerHTML = '<span style="background-color:white;width: '+v_min+'%;"></span><span style="background-color:blue;width: '+dif+'%;"></span><span style="background-color:white;width: '+v_max2+'%;"></span>';
        }
        inp.value="";
        inp.focus();
    })
    a.addEventListener("click", function(){
        console.log(player);
        if(test_a){
            delete classement[player];
        }
        player = prompt("saisie votre nom : ");
        p.innerHTML = "<strong>Bienvenue <em> "+player+" </em></strong>";
        if(test_a){
            classement[player] = tentative;
            afficher(classement);
        }
    })
})

function nbAlea(min, max) {
    var nb = min +(max - min + 1)*Math.random();
    return Math.floor(nb);
}

function afficher(classement){
    var tbody = document.querySelector("tbody");
    var str = "";
    var i = 1;
    
    /*----------sort object----------*/
    var sortable = [];
    for (var player in classement) {
        sortable.push([player, classement[player]]);
    }

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    classement = {}
    sortable.forEach(function(item){
        classement[item[0]]=item[1]
    })
    /*-------------------------------*/

    for(player in classement){
        str += "<tr><td>"+i+"</td><td>"+player+"</td><td>"+classement[player]+"</td></tr>"
        i++;
    }
    tbody.innerHTML = str;
}