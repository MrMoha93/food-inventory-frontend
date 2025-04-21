import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { clourdinary, saveFood } from "@services";
import { useEffect } from "react";
import { Food } from "@types";
import _Input from "@components/common/_Input";
import { InputField } from "@components/common";
import { useGetFood } from "@queries/foods";
import { useGetCategories } from "@queries/categories";

const schema = z.object({
  id: z.string().optional(),
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
  images: z
    .instanceof(FileList)
    .refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        return ["image/png", "image/jpg"].includes(fileList[0].type);
      },
      { message: "Only PNG/JPG images are allowed" }
    )
    .refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        return fileList[0].size <= 5_000_000;
      },
      {
        message: "Maximum file size allowed is 5 MB",
      }
    )
    .optional(),
});

type FormData = z.infer<typeof schema>;

function FoodFormPage() {
  const { id } = useParams();
  const { data: categories = [] } = useGetCategories();
  const { data: food, isError, isLoading } = useGetFood(id);
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isError) {
      navigate("/not-found");
      return;
    }

    if (food) reset(mapToFormData(food));
  }, [food, isError]);

  function mapToFormData(food: Food): FormData {
    return {
      id: food.id || "",
      name: food.name,
      categoryId: food.category.id,
      numberInStock: food.numberInStock,
      price: food.price,
    };
  }

  async function onSubmit({ images, ...data }: FormData) {
    let imageUrl = food?.imageUrl || "";

    if (images && images.length > 0) {
      imageUrl = await clourdinary.saveImage(images[0]);
    }

    await saveFood({ ...data, imageUrl });
    navigate("/foods");
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="p-5">
      <h1>Food Form {id}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <InputField.Label>
            <i className="fa-solid fa-user" />
            Name
          </InputField.Label>
          <InputField.Input {...register("name")} />
          <InputField.Error error={errors.name} />
        </InputField>
        <div className="mb-3 w-50">
          <label className="form-label">Category</label>
          <select {...register("categoryId")} className="form-select">
            <option />
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <_Input
          {...register("numberInStock", { valueAsNumber: true })}
          label="Stock"
          error={errors.numberInStock}
        />
        <_Input
          {...register("price", { valueAsNumber: true })}
          label="Price"
          error={errors.price}
        />
        {food?.imageUrl && (
          <img src={food.imageUrl} alt={food.name} width={80} />
        )}
        <_Input
          type="file"
          {...register("images")}
          label={food?.imageUrl ? "Change Image" : "Image"}
          error={errors.images}
        />
        <button className="btn btn-primary" disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  );
}

export default FoodFormPage;
