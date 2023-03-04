
  // Initialize an empty array to store blog posts
  let blogPosts = [];

  // Get modal element
  const modal = document.querySelector('.modal');

  // Get modal close button
  const closeBtn = document.querySelector('.close-button');

  // Get form elements
  const blogForm = document.querySelector('#blog-form');
  const titleInput = document.querySelector('#blog-title');
  const descriptionInput = document.querySelector('#blog-description');

  // Get blog posts container
  const blogPostsContainer = document.querySelector('.blog-posts');

  // Get search bar elements
  const searchInput = document.querySelector('#search-bar');
  const searchButton = document.querySelector('#search-button');

  // Get search history list
  const searchHistoryList = document.querySelector('#search-history-list');

  // Show modal when create blog button is clicked
  const createBlogButton = document.querySelector('.create-blog-button');
  createBlogButton.addEventListener('click', () => {
    modal.style.display = 'block';
    titleInput.value = '';
    descriptionInput.value = '';
  });

  // Hide modal when close button is clicked
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Hide modal when user clicks outside of it
  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  // Function to render all blog posts
  const renderBlogPosts = () => {
    // Clear container first
    blogPostsContainer.innerHTML = '';

    // Render each blog post
    blogPosts.forEach((post) => {
      // Create div to hold blog post
      const blogPostDiv = document.createElement('div');
      blogPostDiv.classList.add('blog-post');

      // Create h2 element for title
      const titleElement = document.createElement('h2');
      titleElement.textContent = post.title;

      // Create p element for description
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = post.description;

      // Create edit button
      const editButton = document.createElement('button');
      editButton.classList.add('edit-button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        modal.style.display = 'block';
        titleInput.value = post.title;
        descriptionInput.value = post.description;

        // Update blog form submit button to edit instead of create
        const submitButton = document.querySelector('.submit-button');
        submitButton.textContent = 'Edit';

        // Store index of post being edited in submit button dataset
        submitButton.dataset.index = blogPosts.indexOf(post);
      });

      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        const index = blogPosts.indexOf(post);
        blogPosts.splice(index, 1);
        renderBlogPosts();
      });

      // Add title, description, edit button, and delete button to blog post div
      blogPostDiv.appendChild(titleElement);
      blogPostDiv.appendChild(descriptionElement);
      blogPostDiv.appendChild(editButton);
      blogPostDiv.appendChild(deleteButton);

      // Add blog post div to container
      blogPostsContainer.appendChild(blogPostDiv);
    });
  };

  // Function to handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    // If submit button says "Create", add new blog post
    if (event.target.textContent === 'Submit') {
      // Check if title and
      if (title !== '' && description !== '') {
        const newPost = { title, description };
        blogPosts.push(newPost);
        renderBlogPosts();
        modal.style.display = 'none';

        // Reset form inputs
        titleInput.value = '';
        descriptionInput.value = '';
      }
    }

    // If submit button says "Edit", update existing blog post
    else if (event.target.textContent === 'Edit') {
      const index = parseInt(event.target.dataset.index);
      blogPosts[index].title = title;
      blogPosts[index].description = description;
      renderBlogPosts();
      modal.style.display = 'none';

      // Reset form inputs
      titleInput.value = '';
      descriptionInput.value = '';

      // Change submit button back to "Create"
      const submitButton = document.querySelector('.submit-button');
      submitButton.textContent = 'Submit';
    }
  };

  // Add event listener to form submit button
  const submitButton = document.querySelector('.submit-button');
  submitButton.addEventListener('click', handleFormSubmit);

  // Function to handle search bar input
  const handleSearchInput = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm !== '') {
      // Add search term to search history list
      const listItem = document.createElement('li');
      listItem.textContent = searchTerm;
      listItem.addEventListener('click', () => {
        searchInput.value = listItem.textContent;
        handleSearchInput();
      });
      searchHistoryList.appendChild(listItem);

      // Filter blog posts by search term and render results
      const filteredPosts = blogPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchTerm) || post.description.toLowerCase().includes(searchTerm);
      });
      blogPostsContainer.innerHTML = '';
      filteredPosts.forEach((post) => {
        const blogPostDiv = document.createElement('div');
        blogPostDiv.classList.add('blog-post');

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = post.description;

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          modal.style.display = 'block';
          titleInput.value = post.title;
          descriptionInput.value = post.description;

          const submitButton = document.querySelector('.submit-button');
          submitButton.textContent = 'Edit';
          submitButton.dataset.index = blogPosts.indexOf(post);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          const index = blogPosts.indexOf(post);
          blogPosts.splice(index, 1);
          renderBlogPosts();
        });

        blogPostDiv.appendChild(titleElement);
        blogPostDiv.appendChild(descriptionElement);
        blogPostDiv.appendChild(editButton);
        blogPostDiv.appendChild(deleteButton);

        blogPostsContainer.appendChild(blogPostDiv);
      });
    } else {
      // Clear search history list
      searchHistoryList.innerHTML = '';

      // Render all blog posts
      renderBlogPosts();
    }
  };

  // Add event listener to search bar input and search button
  searchInput.addEventListener('input', handleSearchInput);
  searchButton.addEventListener('click', handleSearchInput);

  // Render all blog posts on page load
  renderBlogPosts();
