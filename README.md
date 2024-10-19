# Anime Catalog App

This project is an anime catalog application developed using **React**. The app allows users to browse through a list of animes using data fetched from the [Kitsu API](https://kitsu.docs.apiary.io/#reference/anime). Users can sort, filter, and search for animes by various criteria like release year, age rating, and title. Each anime has its own detail page, showing information such as title, synopsis, ranking, and available images (poster and cover).

The application also features a favorites list, where users can add their favorite animes, and access them in a Netflix-style grid layout. The app is fully responsive, ensuring a smooth experience across different screen sizes from 1000px to 2000px.

## Features

- **Anime List**: A table that displays anime information with sorting, filtering, and searching functionality.
- **Anime Details Page**: Includes title, synopsis, ranking, and poster/cover images.
- **Favorites Page**: A separate page listing all favorited animes.
- **Pagination/Infinite Scroll**: Navigate through multiple pages of anime results.
- **Responsive Design**: Optimized for all screen sizes between 1000px to 2000px.

## Technologies Used

- **React JS**: Frontend framework.
- **React Router Dom**: For routing between different pages.
- **Axios**: For making API requests to fetch data.
- **React Table**: For handling table data, sorting, and pagination.
- **SCSS**: For styling and responsive design.

## Setup and Installation

1. Clone this repository.
   ```
   git clone https://github.com/yourusername/anime-catalog-react.git
   ```
2. Navigate to the project directory.
   ```
   cd anime-catalog-react
   ```
3. Install dependencies.
   ```
   npm install
   ```
4. Run the app in development mode.
   ```
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Deployment

This app is deployed on Vercel

## API

This project uses the [Kitsu Anime API](https://kitsu.docs.apiary.io/#reference/anime) to fetch anime data.
