// js script to fetch data from github api and display it on the page
// send get request to github api on form submit

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const url = `https://api.github.com/users/${username}`;
    // show loading
    document.getElementById('loading').style.display = 'block';
    // hide form
    document.getElementById('fetch-data').style.display = 'none';
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 404) {
                throw new Error('User not found');
            }
            throw new Error("Can't fetch data");
        })
        .then((data) => {
                document.getElementById('name').innerHTML = data.name;
                document.getElementById('bio').innerHTML = data.bio;
                document.getElementById('avatar').src = data.avatar_url;
                // show the data
                document.getElementById('data').style.display = 'block';
                // hide loading
                document.getElementById('loading').style.display = 'none';
            }
        )
        .catch(
            (err) => {
                // hide loading
                document.getElementById('loading').style.display = 'none';
                // show error
                document.getElementById('error-box').style.display = 'block';
                document.getElementById('fetch-data').style.display = 'block';

                document.getElementById('error').innerText = err.message;
            }
        );
});

// Get another user button
document.getElementById('get-another').addEventListener('click', () => {
    // hide the data
    document.getElementById('data').style.display = 'none';
    // show the form
    document.getElementById('fetch-data').style.display = 'block';
});