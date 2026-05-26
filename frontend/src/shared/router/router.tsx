import { createBrowserRouter } from "react-router";
import App from "../../App";
import { DashboardPage } from "../../pages/DashboardPage";
import { SignUpPage } from "../../pages/SignUpPage";
import { LoginPage } from "../../pages/LoginPage";
import { RecoveryPage } from "../../pages/RecoveryPage";
import { ResetConfirmPage } from "../../pages/ResetConfirmPage";
import SupportPage from "../../pages/SupportPage";
import { TestPage } from "../../pages/TestPage";
import { EnglishLearningPage } from "../../pages/EnglishLearningPage";
import { VocabularyTestPage } from "../../pages/VocabularyPage";
import { ReadingTestPage } from "../../pages/ReadingTestPage";
import { GrammarTestPage } from "../../pages/GrammarTestPage";
import { ProfilePage } from "../../pages/ProfilePage";
// add redirect for authorized not authorized users in router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "recovery",
        element: <RecoveryPage />,
      },
      {
        path: "resetconfirm/:uid/:token",
        element: <ResetConfirmPage />,
      },
      {
        path: "support",
        element: <SupportPage />,
      },
      {
        path: "test",
        element: <TestPage />,
      },
      {
        path: "learning",
        element: <EnglishLearningPage />,
      },
      {
        path: "vocabulary",
        element: <VocabularyTestPage />,
      },
      {
        path: "reading",
        element: <ReadingTestPage />,
      },
      {
        path: "grammar",
        element: <GrammarTestPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "*",
        element: <DashboardPage />,
      },
    ],
  },
]);
