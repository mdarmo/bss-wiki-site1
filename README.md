# BSS Wiki Site

Welcome to the BSS Wiki Site project! This project is designed to provide a comprehensive and user-friendly interface for accessing information about various companies in the defense and technology sectors.

## Project Structure

The project is divided into two main parts: the client and the server.

### Client

The client is built using React and Material UI. It includes the following components and pages:

- **Components**
  - `Header`: Renders the header banner for the homepage.
  - `Footer`: Renders the footer banner for the homepage.
  - `FeaturedArticles`: Displays a section for featured articles on the homepage.
  - `CompanyAccordion`: Renders an accordion list of companies with expandable details.

- **Pages**
  - `Homepage`: Combines the `Header`, `FeaturedArticles`, and `Footer` components to create the homepage layout.
  - `ListPage`: Displays the list of companies using the `CompanyAccordion` component.
  - `NetworkPage`: Currently blank.
  - `AboutPage`: Currently blank.

### Server

The server is built using Node.js and Express. It handles database queries and API requests. The server includes:

- **Database Configuration**: Connects to the "BSS_dev" server and the "BSI" schema.
- **Controllers**: Handles database queries related to the "company" table.
- **Routes**: Exposes API endpoints for company-related data.

## Setup Instructions

### Client Setup

1. Navigate to the `client` directory:
   ```
   cd client
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the client application:
   ```
   npm start
   ```

### Server Setup

1. Navigate to the `server` directory:
   ```
   cd server
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

## Usage

Once both the client and server are running, you can access the BSS Wiki Site in your web browser at `http://localhost:3000`. Explore the homepage, view the list of companies, and check out the featured articles!

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.