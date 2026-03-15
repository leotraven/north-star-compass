import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <div className="dark min-h-screen" style={{ fontFamily: 'var(--font-sans)' }}>
      <RouterProvider router={router} />
    </div>
  );
}
