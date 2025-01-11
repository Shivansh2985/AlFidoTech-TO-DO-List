
// // Admin Panel Post Form Submission
const addPostForm = document.getElementById('add-post-form');
const postList = document.querySelector('.post-list ul');
const themeToggle = document.getElementById('theme-toggle');

// Function to toggle light and dark modes
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    updateToggleText();
}
function updateToggleText() {
    if (document.body.classList.contains('light-mode')) {
        themeToggle.innerText = 'Dark Mode';
    } else {
        themeToggle.innerText = 'Light Mode';
    }
}

// Load theme from localStorage
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.add('dark-mode');
    }
    updateToggleText();
});

themeToggle.addEventListener('click', toggleTheme);
const adminPanel = document.getElementById('admin-panel');
        const youMenu = document.getElementById('you-menu');
        const blogList = document.getElementById('blog-list');


        youMenu.addEventListener('click', () => {
            adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
        });
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('post-title');
    const contentInput = document.getElementById('post-content');
    const imageInput = document.getElementById('post-image');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const imageFile = imageInput.files[0];

    if (!title || !content || !imageFile) {
        alert('Please fill in all fields and select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const imageSrc = reader.result;

        // Create new blog post
        const newPost = document.createElement('article');
        newPost.classList.add('blog-post');
        newPost.dataset.title = title;
        newPost.innerHTML = `
            <img src="${imageSrc}" alt="Featured Image">
            <h2><a href="post.html">${title}</a></h2>
            <p>${content} <a href="post.html">Read more...</a></p>
        `;

        blogList.appendChild(newPost);

        // Add to admin post list
        const newPostListItem = document.createElement('li');
        newPostListItem.dataset.title = title;
        newPostListItem.innerHTML = `
            ${title} 
            <button class="edit-post">Edit</button> 
            <button class="delete-post">Delete</button>
        `;
        postList.appendChild(newPostListItem);

        addPostForm.reset();
    };

    reader.readAsDataURL(imageFile);
});

// Delete a post
postList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-post')) {
        const postTitle = e.target.parentElement.dataset.title;

        // Remove from homepage
        Array.from(blogList.children).forEach(post => {
            if (post.dataset.title === postTitle) {
                post.remove();
            }
        });

        // Remove from admin post list
        e.target.parentElement.remove();
    }
});

// Edit a post
postList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-post')) {
        const listItem = e.target.parentElement;
        const postTitle = listItem.dataset.title;
        const newTitle = prompt('Edit Title:', postTitle);
        if (confirm('If you want to edit Content also then Press Ok')) {
            const newContent = prompt('Edit Content:', '');
        } 
        if (newTitle || newContent) {
            // Update homepage
            Array.from(blogList.children).forEach(post => {
                if (post.dataset.title === postTitle) {
                    post.querySelector('h2 a').textContent = newTitle;
                    post.querySelector('p').innerHTML = `${newContent} <a href="post.html">Read more...</a>`;
                    post.dataset.title = newTitle;

                }
                listItem.firstChild.textContent = newTitle + ' ';
            });
            listItem.dataset.title = newTitle;
        }
    }
});
const scroller = document.getElementById('infinite-scroller');
let blogQueue = [];

// Function to populate scroller initially
function populateScroller() {
    scroller.innerHTML = ''; // Clear existing scroller content
    blogQueue = []; // Reset the queue

    // Populate the queue with blog data
    Array.from(blogList.children).forEach(post => {
        const imgSrc = post.querySelector('img').src;
        const title = post.querySelector('h2 a').textContent;
        const content = post.querySelector('p').textContent;

        // Add each blog to the queue
        blogQueue.push({ imgSrc, title, content });
    });

    // Render initial scroller content
    renderScroller();
}

// Function to render the scroller from the queue
function renderScroller() {
    scroller.innerHTML = ''; // Clear current scroller content

    // Render each blog in the queue
    blogQueue.forEach(({ imgSrc, title, content }) => {
        const scrollItem = document.createElement('div');
        scrollItem.classList.add('scroll-item');
        scrollItem.innerHTML = `
            <img src="${imgSrc}" alt="Blog Image">
            <h2>${title}</h2>
            <p>${content}</p>
        `;
        scroller.appendChild(scrollItem);
    });
}

// Function to scroll continuously using the queue
function startScroller() {
    setInterval(() => {
        // Pop the first blog and push it to the back
        const firstBlog = blogQueue.shift();
        blogQueue.push(firstBlog);

        // Re-render the scroller with the updated queue
        renderScroller();
    }, 3000); // Adjust interval time (3 seconds for demo)
}

// Initialize scroller on page load
window.addEventListener('load', () => {
    populateScroller();
    startScroller(); // Start continuous scrolling
});

// Update scroller dynamically when adding, editing, or deleting blogs
addPostForm.addEventListener('submit', () => {
    populateScroller();
});

postList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-post') || e.target.classList.contains('edit-post')) {
        populateScroller();
    }
});
//Bottom
const scrollerr = document.getElementById('infinite-scrollerr');
let blogQueuee = [];

// Function to populate scroller initially
function populateScrollerr() {
    scrollerr.innerHTML = ''; // Clear existing scroller content
    blogQueuee = []; // Reset the queue

    // Populate the queue with blog data
    Array.from(blogList.children).forEach(post => {
        const imgSrc = post.querySelector('img').src;
        const title = post.querySelector('h2 a').textContent;
        const content = post.querySelector('p').textContent;

        // Add each blog to the queue
        blogQueuee.push({ imgSrc, title, content });
    });

    // Render initial scroller content
    renderScrollerr();
}

// Function to render the scroller from the queue
function renderScrollerr() {
    scrollerr.innerHTML = ''; // Clear current scroller content

    // Render each blog in the queue
    blogQueuee.forEach(({ imgSrc, title, content }) => {
        const scrollItem = document.createElement('div');
        scrollItem.classList.add('scroll-item');
        scrollItem.innerHTML = `
            <img src="${imgSrc}" alt="Blog Image">
            <h2>${title}</h2>
            <p>${content}</p>
        `;
        scrollerr.appendChild(scrollItem);
    });
}

// Function to scroll continuously using the queue
function startScrollerr() {
    setInterval(() => {
        // Pop the first blog and push it to the back
        const firstBlog = blogQueue.shift();
        blogQueue.push(firstBlog);

        // Re-render the scroller with the updated queue
        renderScrollerr();
    }, 3000); // Adjust interval time (3 seconds for demo)
}

// Initialize scroller on page load
window.addEventListener('load', () => {
    populateScrollerr();
    startScrollerr(); // Start continuous scrolling
});

// Update scroller dynamically when adding, editing, or deleting blogs
addPostForm.addEventListener('submit', () => {
    populateScrollerr();
});

postList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-post') || e.target.classList.contains('edit-post')) {
        populateScrollerr();
    }
});


 const addPostFormDefault = addPostForm.onsubmit;