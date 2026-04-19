fetch('header.html')
    .then(Response => Response.text())
    .then(data => {
        document.getElementById( 'header-placeholder').innerHTML = data;
    });