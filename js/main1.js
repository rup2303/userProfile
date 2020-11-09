$('document').ready(()=>{
    

    // var a = localStorage.getItem("searchObj");
    // console.log(a);
    var getData = localStorage.getItem("searchObj");
    var parsedData = JSON.parse(getData);
    console.log(parsedData.content);
    localStorage.removeItem("searchObj");
    // $("newwindow").append(getData);
    let para  = document.createElement('div');
    let titleHeading = document.createElement('h1');
    let contentDiv = document.createElement('p');
    let breakLine = document.createElement('br');
    let authorHeading  = document.createElement('h4');
    titleHeading.innerText = parsedData.title;
    authorHeading.innerText="Written By : " +parsedData.author;
    contentDiv.innerText=parsedData.Content;
    para.append(titleHeading);
    para.append(breakLine);
    para.append(authorHeading);
    para.append(breakLine);
    para.append(contentDiv);
    para.append(breakLine);
    $("#newwindow").append(para);

})