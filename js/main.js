//Listen-er za submit forme
document.getElementById('myForm').addEventListener("submit",saveBookmark);

function saveBookmark(e){
   
    //Uzimanje vrednosti forme
    var siteName = document.getElementById('siteName').value;
    var siteUrl= document.getElementById('siteUrl').value;

    if(!validateForm(siteName,siteUrl)){
        return false;
    }

    var bookmark={
        name:siteName,
        url:siteUrl
    }
    //Testiranje da li ima bookmarks u localStorage
    if(localStorage.getItem('bookmarks')===null){
        //Novi niz
        var bookmarks=[];
        //Push-ovanje u bookmarks niz
        bookmarks.push(bookmark);
        //Ubacivanje u localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    } else {
        //Uzimanje bookmarks-a iz localStorage
        var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
        //Dodavanje novog bookmarka u niz
        bookmarks.push(bookmark);
        //Vracanje novog niza u localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    //Ciscenje forme posle unosa
    document.getElementById('myForm').reset();

      //Ponovno fetch-ovanje bookmarks-a
      fetchBookmarks();

    //Sprecavanje forme da salje stranici
    e.preventDefault();
    
}

//Fetch-ovanje bookmarks-a
function fetchBookmarks(){

    //Uzimanje bookmarks-a iz localStorage
    var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));

    //Uzimanje diva za prikaz bookmarks-a
    var bookmarksResults=document.getElementById('bookmarksResults');

    //Izbacivanje rezultata u div
    bookmarksResults.innerHTML='';
    for(var i=0;i<bookmarks.length;i++){
        var name=bookmarks[i].name;
        var url=bookmarks[i].url;

        bookmarksResults.innerHTML+= '<div class="jumbotron">'+
                                        '<h3>'+name+
                                        ' <a class="btn btn-success" target="_blank" href="'+url+'">Pogledaj sajt</a>'+
                                        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Obrisi</a>'+
                                        '</h3>'+
                                        '</div>';
    }
    
}

//Delete funkcija
function deleteBookmark(url){
    //Uzimanje bookmarks-a iz localStorage
    var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));

    //Prolazak kroz niz
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url==url){

            //Brisanje iz niza
            bookmarks.splice(i,1);
        }

    }
    //Vracanje novog niza u localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    //Ponovno fetch-ovanje bookmarks-a
    fetchBookmarks();
}

function validateForm(siteName,siteUrl){
    //Provera da li je prazna forma
    if(!siteName || !siteUrl){
        alert("Morate popuniti polja!");
        return false;
    }
    //Regularni izrazi za URL
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    //Provera regularnog izraza
    if(!siteUrl.match(regex)){
        alert("Morate uneti pravilan URL!");
        return false;
    }
    //Ako je sve proslo uredu 
    return true;
}