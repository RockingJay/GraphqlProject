# GraphqlProject

GraphqlProject is a mobile application built using **React Native 0.79.1** that showcases user management with **GraphQL** integration. The project follows modern architecture, modular navigation, dynamic UI rendering, and uses **Apollo Client** for network operations.

---

## 🛠 Step-by-Step Progress

### 1. **Project Initialization**
- Initialized a **React Native** project (version 0.79.1) using CLI.
- Set up **TypeScript** for type safety across the application.
- Structured the project into clean folders like `screens`, `navigation`, `api-client`, and `types`.

### 2. **Apollo Client Integration**
- Configured **Apollo Client** to handle GraphQL queries.
- Connected the app to a **GraphQL** backend.
- Wrapped the main `App` component with `ApolloProvider`.

### 3. **GraphQL Queries Setup**
- Created the following GraphQL queries:
  - **LIST_ZELLER_CUSTOMERS**: Fetches a list of users.
  - **GET_ZELLER_CUSTOMER**: Fetches individual user details.
- Designed **type-safe** interfaces like `ZellerCustomer` for strong typing.

### 4. **Navigation Architecture**
- Installed and set up **React Navigation**:
  - **Bottom Tab Navigation** for Home, Notifications, and Settings.
  - **Stack Navigation** inside the Home tab (UserList and UserProfile).
- Built a modular `Navigation.tsx` file to keep navigation clean and organized.
- Linked navigation properly with **Android Studio** for auto-linking of native modules.

### 5. **Screens Development**
- **UserList Screen**:
  - Fetches and displays a list of users with **Apollo Client**.
- **UserProfile Screen**:
  - Fetches and displays user details dynamically based on selected user ID.
  - If `imageUrl` exists, displays the profile picture.
  - If no `imageUrl`, shows the first letter of the user's name inside a round placeholder.
  - Proper error handling and loading states added.

### 6. **Testing**
- Added unit tests using **Jest** and **@testing-library/react-native**.
- Mocked **Apollo Client** queries and tested scenarios like loading, error, and success states.
- Used `act()` properly in tests to avoid React warnings.
- Updated `jest.config.js` to handle React Native libraries and GraphQL mocking correctly.

---

## 📚 Tech Stack
- **React Native** 0.79.1
- **TypeScript**
- **GraphQL** / **Apollo Client**
- **React Navigation**
- **Jest** / **React Native Testing Library**
- **Android Studio Meerkat**

---

## 🚀 Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/GraphqlProject.git


