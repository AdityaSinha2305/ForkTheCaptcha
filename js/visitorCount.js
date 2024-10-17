// Fetch the current visitor count from the server and update the display
fetch('/api/visitor-count')
    .then(response => response.json())
    .then(data => {
        document.getElementById('visitor-count').textContent = data.count;
    })
    .catch(error => console.error('Error fetching visitor count:', error));

// Increment the visitor count on page load
fetch('/api/increment-visitor-count', {
    method: 'POST'
})
.then(response => response.json())
.then(data => {
    document.getElementById('visitor-count').textContent = data.count;
})
.catch(error => console.error('Error incrementing visitor count:', error));
