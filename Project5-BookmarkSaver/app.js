const bookmarkName = document.getElementById("bookmark-name");
const bookmarkUrl = document.getElementById("bookmark-url");
const addButton = document.getElementById("add-bookmark");
const inputContainer = document.querySelector(".input-container");
const bookmarkList = document.querySelector("#bookmark-list");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

addButton.addEventListener("click", addBookmarks);

updateBookmarkList();


function addBookmarks(e){
    e.preventDefault();  

    const nameValue = bookmarkName.value;
    const urlValue = bookmarkUrl.value

    bookmarks.push({
        id:Date.now(),
        nameValue,
        urlValue
    });

    try{
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
        console.log("Bookmark added!!!");
        updateBookmarkList();
    }
    catch(err){
        console.log("There is an error about doing it." + err.message);
    }



}


function updateBookmarkList(){
    bookmarkList.innerHTML = "";

    const bookmarkListItems = [...bookmarks].reverse();  
    console.log(bookmarkListItems);

    bookmarkListItems.forEach((item) => {
       const bookmarkElement = createBookmarkElement(item);
       bookmarkList.appendChild(bookmarkElement);
    });
}

function createBookmarkElement(bookmark){
 
    const li = document.createElement("li");
    li.innerHTML = `
        <span><a href="${bookmark.urlValue}" target="_blank">${bookmark.nameValue}</a></span>
        <span>
            <button class="delete-btn" onclick="removeBookmarks(${bookmark.id})">X</button>
        </span>
        `;
    
    return li;

}




function removeBookmarks(e){

    console.log(e);
    if(confirm("Are you sure?"));
    
    try{
        
        bookmarks = bookmarks.filter(bookmarks => bookmarks.id !== e);

        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

        console.log("Item deleted with succesfully");

        updateBookmarkList();

    }

    catch{

        console.log("There is an error about deleting item...");

    }
    
    
}


function deleteAllStorage(){
    bookmarks = [];
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks));
    updateBookmarkList();
}
