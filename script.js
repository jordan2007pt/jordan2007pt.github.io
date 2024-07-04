document.addEventListener("DOMContentLoaded", function() {
    fetch('/content')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        });
});
