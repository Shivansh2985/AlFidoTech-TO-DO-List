const scroller = document.getElementById('infinite-scroller');
const blogList = document.getElementById('blog-list');
const addPostForm = document.getElementById('add-post-form');
const postList = document.getElementById('post-list');
let blogQueue = [];
// Function to save blogs to localStorage
function saveBlogsToLocalStorage() {
    const blogs = Array.from(blogList.children).map(post => ({
        imgSrc: post.querySelector('img').src,
        title: post.querySelector('h2 a').textContent,
        content: post.querySelector('p').textContent,
    }));
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

// Function to load blogs from localStorage
function loadBlogsFromLocalStorage() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.forEach(({ imgSrc, title, content }) => {
        addBlogToDOM(imgSrc, title, content);
    });
}
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

// Function to add a blog post to the DOM
function addBlogToDOM(imgSrc, title, content) {
    // Add to blog list
    const newPost = document.createElement('article');
    newPost.classList.add('blog-post');
    newPost.innerHTML = `
        <img src="${imgSrc}" alt="Featured Image">
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
}

// Function to populate the scroller with blogs
function populateScroller() {
    scroller.innerHTML = ''; // Clear existing scroller content
    blogQueue = Array.from(blogList.children).map(post => ({
        imgSrc: post.querySelector('img').src,
        title: post.querySelector('h2 a').textContent,
        content: post.querySelector('p').textContent,
    }));

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
youMenu.addEventListener('click', () => {
    adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
});
// Function to start infinite scrolling
function startScroller() {
    setInterval(() => {
        const firstBlog = blogQueue.shift();
        blogQueue.push(firstBlog);
        populateScroller();
    }, 3000); // Adjust interval time as needed
}

// Event: Add a new blog post
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
        const imgSrc = reader.result;
        addBlogToDOM(imgSrc, title, content);
        saveBlogsToLocalStorage(); // Save to localStorage
        populateScroller(); // Update scroller
        addPostForm.reset();
    };

    reader.readAsDataURL(imageFile);
});

// Event: Delete a blog post
postList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-post')) {
        const postTitle = e.target.parentElement.dataset.title;

        // Remove from blog list
        Array.from(blogList.children).forEach(post => {
            if (post.querySelector('h2 a').textContent === postTitle) {
                post.remove();
            }
        });

        // Remove from admin post list
        e.target.parentElement.remove();

        // Save updated blogs to localStorage and refresh scroller
        saveBlogsToLocalStorage();
        populateScroller();
    }
});

// Event: Edit a blog post
postList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-post')) {
        const listItem = e.target.parentElement;
        const postTitle = listItem.dataset.title;
        const newTitle = prompt('Edit Title:', postTitle);
        const newContent = prompt('Edit Content:', '');

        if (newTitle && newContent) {
            // Update blog list
            Array.from(blogList.children).forEach(post => {
                if (post.querySelector('h2 a').textContent === postTitle) {
                    post.querySelector('h2 a').textContent = newTitle;
                    post.querySelector('p').innerHTML = `${newContent} <a href="post.html">Read more...</a>`;
                }
                listItem.firstChild.textContent = newTitle + ' ';
            });

            // Update admin post list
            listItem.dataset.title = newTitle;

            // Save updated blogs to localStorage and refresh scroller
            saveBlogsToLocalStorage();
            populateScroller();
        }
    }
});

// Load blogs from localStorage on page load
window.addEventListener('load', () => {
    loadBlogsFromLocalStorage();
    populateScroller();
    startScroller();
});
