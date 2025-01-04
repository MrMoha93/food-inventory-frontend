import { useNavigate, useParams } from "react-router-dom";

function FoodFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h1>Food Form {id}</h1>
      <button onClick={() => navigate("/foods")} className="btn btn-primary">
        Save
      </button>
    </>
  );
}

export default FoodFormPage;
