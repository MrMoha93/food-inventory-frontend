import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCategories, saveFood } from "@services";

const schema = z.object({
  // id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  categoryId: z.string().min(1, { message: "You must select a category" }),
  numberInStock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(1, { message: "Stock cannot be higher than 1" })
    .max(100, { message: "Stock cannot be higher than 100" }),
  price: z
    .number()
    .min(1, { message: "Price cannot be higher than 1" })
    .max(100, { message: "Price cannot be higher than 20" }),
});

type FormData = z.infer<typeof schema>;

function FoodFormPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const {
    //reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log("data", data);
    saveFood(data);
    navigate("/foods");
  }

  return (
    <div className="p-5">
      <h1>Food Form {id}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 w-50">
          <label className="form-label">Name</label>
          <input {...register("name")} className="form-control" />
          {errors.name && (
            <p className="text-danger">{errors.name?.message} </p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Category</label>
          <select {...register("categoryId")} className="form-select">
            <option />
            {getCategories().map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Stock</label>
          <input
            {...register("numberInStock", { valueAsNumber: true })}
            className="form-control"
          />
          {errors.numberInStock && (
            <p className="text-danger">{errors.numberInStock.message} </p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Price</label>
          <input
            {...register("price", { valueAsNumber: true })}
            className="form-control"
          />
          {errors.price && (
            <p className="text-danger">{errors.price.message} </p>
          )}
        </div>
        <button className="btn btn-primary" disabled={!isValid}>
          {" "}
          Save{" "}
        </button>
      </form>
    </div>
  );
}

export default FoodFormPage;
