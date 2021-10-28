function addToList(){
    
    //Tämä luo uuden rivin (li elementin) to-do listaan.
    var li = document.createElement("li");
    var txt = document.getElementById("usrInput").value.trim();
    var txtNode = document.createTextNode(txt);
    li.className = "listItem";
    li.appendChild(txtNode);
    
    //Listaan lisätään uusi rivi vain jos käyttäjä on kirjoittanut jotain syöttökenttään ja se on alle 30 merkkiä pitkä. Muuten annetaan varoitus.
    if(txt == ""){
        alert("You need to write something first!");
    }
    else if(txt.length > 30){
        alert("Please do not enter more than 30 characters.");
    }
    else{
        document.getElementById("theList").appendChild(li);
    }
    
    //Seuraava koodin pätkä pyyhkii syöttökentän sen jälkeen, kun uusi rivi on luotu.
    document.getElementById("usrInput").value = "";

   //Luodaan painike, jonka avulla rivin voi merkata tehdyksi.
    var span = document.createElement("BUTTON");
    var icon = document.createTextNode("\u2713");
    span.className = "checked";
    span.appendChild(icon);
    li.appendChild(span);

    //Luodaan myös painike, jolla rivin voi poistaa
    var span2 = document.createElement("BUTTON");
    var icon2 = document.createTextNode("\u2715");
    span2.className = "delete";
    span2.appendChild(icon2);
    li.appendChild(span2);

    //Pistetään toinen painike merkkaamaan rivin tehdyksi. Tämän voi peruuttaa klikkaamalla nappia uudestaan.
    var i;
    var checked = document.getElementsByClassName("checked");
    var newParent = document.getElementById("theList2");
    var oldParent = document.getElementById("theList");
    var clicked = false;
    for (i=0; i < checked.length; i++){
        checked[i].onclick = function() {
            var listContent = this.parentElement;
            //Merkatut rivit muuttavat tyyliään sekä siirtyvät toiseen listaan.
            if(clicked == false){
                listContent.style.textDecoration = "line-through";
                listContent.style.backgroundColor = "darkgrey";
                listContent.style.color = "lightgrey";
                clicked = true;
                newParent.appendChild(listContent);
            }
            else if(clicked == true){
                listContent.style.textDecoration = "none";
                listContent.style.backgroundColor = "white";
                listContent.style.color = "black";
                clicked = false;
                oldParent.appendChild(listContent);
            }
        }
    }

    //Pistetään vielä toinen nappi poistamaan listasta rivejä. Piilottamisen sijaan tämä poistaa koko "li" elementin.
    var j
    var del = document.getElementsByClassName("delete");
    for (j=0; j < del.length; j++){
        del[j].onclick = function() {
            var listContent = this.parentElement;
            listContent.remove();
            listStatus.splice(j, 1);
        }
    }
}

function saveList(){
    //Tämä tallentaa molemmat listat localStorageen.
    localStorage.clear();

    var active = document.getElementById("theList");
    var completed = document.getElementById("theList2");
    var activeList = new Array;
    var finalActiveList = new Array;
    var completedList = new Array;
    var finalCompletedList = new Array;

    for(var i = 0; i < active.childElementCount; i++){
    activeList[i] = active.children[i].innerText;
    finalActiveList[i] = activeList[i].slice(0, activeList[i].length - 4);
    console.log(finalActiveList[i]);
    }

    for(var j = 0; j < completed.childElementCount; j++){
        completedList[j] = completed.children[j].innerText;
        finalCompletedList[j] = completedList[j].slice(0, completedList[j].length - 4);
        console.log(finalCompletedList[j]);
    }

    localStorage.setItem("activeTasks", JSON.stringify(finalActiveList));
    localStorage.setItem("completedTasks", JSON.stringify(finalCompletedList));
    alert("Your list has been saved.");
}

function clearStorage(){
    //Tämä poistaa tallennetun listan pyyhkimällä localStoragen. Tätä ennen käyttäjältä kuitenkin kysytään varmistusta vahinkojen välttämiseksi. Lopuksi sivu ladataan uudestaan.
    var confirmation = confirm("Your list will be permanently deleted. Do you wish to continue?");
    if(confirmation == true){
        localStorage.clear();
        location.reload();
    }
}

function retrieveList(){
    //ladataan localStoragesta kaikki tallennetut rivit ja luodaan listat samalla tavalla kuin addToList() funktiossa.
    var activeItems = JSON.parse(localStorage.activeTasks);
    var completedItems = JSON.parse(localStorage.completedTasks);
    
    //Ensin tuodaan merkkaamattomat lista rivit.
    for(var i=0; i < activeItems.length; i++){
        var li1 = document.createElement("li");
        var txt1 = activeItems[i];
        var txtNode1 = document.createTextNode(txt1);
        li1.className = "listItem";
        li1.appendChild(txtNode1);
        document.getElementById("theList").appendChild(li1);
        
        var span = document.createElement("BUTTON");
        var icon = document.createTextNode("\u2713");
        span.className = "checked";
        span.appendChild(icon);
        li1.appendChild(span);

        var span2 = document.createElement("BUTTON");
        var icon2 = document.createTextNode("\u2715");
        span2.className = "delete";
        span2.appendChild(icon2);
        li1.appendChild(span2);

        var x;
        var checked = document.getElementsByClassName("checked");
        var newParent = document.getElementById("theList2");
        var oldParent = document.getElementById("theList");
        var clicked = false;
        for (x=0; x < checked.length; x++){
            checked[x].onclick = function() {
                var listContent = this.parentElement;
                if(clicked == false){
                    listContent.style.textDecoration = "line-through";
                    listContent.style.backgroundColor = "darkgrey";
                    listContent.style.color = "lightgrey";
                    clicked = true;
                    newParent.appendChild(listContent);
                }
                else if(clicked == true){
                    listContent.style.textDecoration = "none";
                    listContent.style.backgroundColor = "white";
                    listContent.style.color = "black";
                    clicked = false;
                    oldParent.appendChild(listContent);
                }
            }
        }

        var y
        var del = document.getElementsByClassName("delete");
        for (y=0; y < del.length; y++){
            del[y].onclick = function() {
                var listContent = this.parentElement;
                listContent.remove();
            }
        }
    }

    //Sitten tuodaan merkatut listarivit.
    for(var j=0; j < completedItems.length; j++){
        var li2 = document.createElement("li");
        var txt2 = completedItems[j];
        var txtNode2 = document.createTextNode(txt2);
        li2.className = "listItem";
        li2.appendChild(txtNode2);
        document.getElementById("theList2").appendChild(li2);

        var span = document.createElement("BUTTON");
        var icon = document.createTextNode("\u2713");
        span.className = "checked";
        span.appendChild(icon);
        li2.appendChild(span);

        var span2 = document.createElement("BUTTON");
        var icon2 = document.createTextNode("\u2715");
        span2.className = "delete";
        span2.appendChild(icon2);
        li2.appendChild(span2);

        li2.style.textDecoration = "line-through";
        li2.style.backgroundColor = "darkgrey";
        li2.style.color = "lightgrey";

        var x;
        var checked = document.getElementsByClassName("checked");
        var newParent = document.getElementById("theList2");
        var oldParent = document.getElementById("theList");
        var clicked = true;
        for (x=0; x < checked.length; x++){
            checked[x].onclick = function() {
                var listContent = this.parentElement;
                if(clicked == false){
                    listContent.style.textDecoration = "line-through";
                    listContent.style.backgroundColor = "darkgrey";
                    listContent.style.color = "lightgrey";
                    clicked = true;
                    newParent.appendChild(listContent);
                }
                else if(clicked == true){
                    listContent.style.textDecoration = "none";
                    listContent.style.backgroundColor = "white";
                    listContent.style.color = "black";
                    clicked = false;
                    oldParent.appendChild(listContent);
                }
            }
        }

        var y
        var del = document.getElementsByClassName("delete");
        for (y=0; y < del.length; y++){
            del[y].onclick = function() {
                var listContent = this.parentElement;
                listContent.remove();
            }
        }
    }
}