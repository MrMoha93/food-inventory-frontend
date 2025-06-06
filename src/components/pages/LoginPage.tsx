import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@services";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required." }),

  password: z.string().min(1, { message: "Password is required" }),
});

type FormData = z.infer<typeof schema>;

function LoginPage() {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const { state: fromUrl } = useLocation();
  const user = auth.getCurrentUser();

  async function onSubmit(data: FormData) {
    try {
      await auth.login(data);
      navigate(fromUrl || "/foods");
    } catch (error: any) {
      if (error.response.status === 400) {
        setError("username", { message: error.response.data });
      }
    }
  }

  if (user) return <Navigate to="/foods" />;

  return (
    <div className="vh-100 d-grid justify-content-center align-content-center">
      <h1 className="mb-4 text-center">Login Page</h1>
      <div className="p-5 shadow rounded-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              {...register("username")}
              className="form-control"
              style={{ width: 360 }}
            />
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              {...register("password")}
              className="form-control"
              style={{ width: 360 }}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="d-grid justify-content-center mt-4">
            <button className="btn btn-primary" disabled={!isValid}>
              Login
            </button>
          </div>
          <div className="w-100 text-start mt-2">
            <Link
              to="/foods"
              className="text-decoration-underline text-primary"
            >
              Return
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
