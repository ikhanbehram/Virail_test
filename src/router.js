import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import ResultsPage from "./pages/resultsPage/resultsPage";

export const  router = createBrowserRouter([
	{
	  path: "/",
	  element: <App />
	},
	{
	  path: "/results",
	  element: <ResultsPage />,
	},
]);