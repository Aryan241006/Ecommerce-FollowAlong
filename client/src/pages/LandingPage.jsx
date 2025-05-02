/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import ProductCardList from "./ProductCardList";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <ProductCardList />
      </main>
    </div>
  );
}

export default LandingPage;
