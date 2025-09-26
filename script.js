
const articles = [
    //i generated these random articles using google's new search ai bot
    {
        id: 1,
        title: "The Power of CSS Nesting: A Cleaner Way to Style Components",
        date: "March 15, 2024",
        content: "CSS nesting is finally here, allowing us to write more modular and readable stylesheets. Learn the syntax to nest selectors inside their parent rules, reducing repetition and improving component organization."
    },
    {
        id: 2,
        title: "Mastering the HTML `<picture>` Element for Responsive Images",
        date: "November 2, 2023",
        content: "Go beyond the simple `<img>` tag. The `<picture>` element, combined with the `<source>` tag, lets you serve different image formats (like WebP) or different sizes based on the user's viewport or browser support."
    },
    {
        id: 3,
        title: "Creating Interactive Charts with Pure CSS and Grid",
        date: "September 10, 2024",
        content: "Forget heavy JavaScript libraries for simple data visualization. Discover techniques to build responsive bar charts and column layouts using only CSS Grid, making them fast and highly accessible."
    },
    {
        id: 4,
        title: "The `content-visibility` Property: Boost Your Page Load Speed",
        date: "January 20, 2022",
        content: "The `content-visibility: auto;` property is a major performance boost. It tells the browser to skip layout and rendering work for off-screen content, significantly reducing initial page load time."
    },
    {
        id: 5,
        title: "The `content-visibility` Property: Boost Your Page Load Speed",
        date: "January 20, 2022",
        content: "The `content-visibility: auto;` property is a major performance boost. It tells the browser to skip layout and rendering work for off-screen content, significantly reducing initial page load time."
    },
    {
        id: 6,
        title: "Using the HTML `data-*` Attribute to Pass Data to CSS",
        date: "June 28, 2023",
        content: "A quick guide on using JavaScript to set dynamic information on an HTML element via `data-attributes`, then accessing that data in CSS using the `attr()` function for unique styling."
    },
    {
        id: 7,
        title: "Crafting a 'Holy Grail' Layout with Flexbox and No Media Queries",
        date: "December 5, 2022",
        content: "Revisit the classic Holy Grail layout (header, footer, central column with two sidebars) and implement it flawlessly using modern Flexbox properties like `flex-grow` and `flex-shrink`."
    },
    {
        id: 8,
        title: "Getting Started with CSS Container Queries",
        date: "August 17, 2023",
        content: "Container Queries let components respond to *their own size*, not the viewport's. This is the future of modular CSS. Here’s a simple setup using `@container` and container query units."
    },
    {
        id: 9,
        title: "Input Validation Feedback Using the `:invalid` CSS Pseudo-Class",
        date: "April 1, 2024",
        content: "Improve user experience by providing instant, purely CSS-based feedback for form inputs. Use the `:invalid` and `:focus` selectors to style borders and display error messages without writing any JavaScript."
    },
    {
        id: 10,
        title: "CSS Scroll Snap: Creating Smooth, Controlled Scrolling Experiences",
        date: "February 14, 2023",
        content: "Learn how to use `scroll-snap-type` and `scroll-snap-align` to create natural-feeling carousel or gallery sections that automatically snap into place when the user scrolls."
    }
];

const searchInput = document.getElementById('searchInput');
const articlesContainer = document.getElementById('articlesContainer');
const resultsCount = document.getElementById('resultsCount');
const clearSearchButton = document.getElementById('clearSearch');

function getHighlightedText(text, term) {
    if (!term) return text;
    const highlightRegex = new RegExp(`(${term})`, 'gi');
    return text.replace(highlightRegex, '<span class="highlight">$1</span>');
}

function displayArticles(filteredArticles, currentSearchTerm) {
    articlesContainer.innerHTML = '';

    filteredArticles.forEach(article => {

        const { title, date, content } = article;
        const highlightedTitle = getHighlightedText(title, currentSearchTerm);
        const highlightedContent = getHighlightedText(content, currentSearchTerm);
        const articleDiv = document.createElement('div');

        articleDiv.className = 'article';
        articleDiv.innerHTML = `
            <h2 class="article-title">${highlightedTitle}</h2>
            <span class="article-date">${date}</span>
            <p>${highlightedContent}</p>
        `;
        articlesContainer.appendChild(articleDiv);
    });

    const countText = (filteredArticles.length === 1) 
        ? '1 post was found.' 
        : `${filteredArticles.length} posts were found.`;
        
    resultsCount.textContent = countText;
}

function handleLiveSearch() {
    const searchTerm = searchInput.value.trim();
    
    clearSearchButton.style.display = searchTerm ? 'flex' : 'none';

    if (!searchTerm) {
        displayArticles(articles, '');
        return;
    }

    const lowerCaseTerm = searchTerm.toLowerCase();

    const filteredResults = articles.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(lowerCaseTerm);
        const contentMatch = article.content.toLowerCase().includes(lowerCaseTerm);
        return titleMatch || contentMatch;
    });

    displayArticles(filteredResults, searchTerm);
}

function handleClearSearch() {
    searchInput.value = '';
    handleLiveSearch();
    searchInput.focus();
}

searchInput.addEventListener('input', handleLiveSearch);
clearSearchButton.addEventListener('click', handleClearSearch);
handleLiveSearch();