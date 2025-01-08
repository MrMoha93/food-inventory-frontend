import { FormEvent } from "react";

function LoginPage() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("Submitted");
  }

  return (
    <div className="vh-100 d-grid justify-content-center align-content-center">
      <h1 className="mb-4 text-center">Login Page</h1>
      <div className="p-5 shadow rounded-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control " style={{ width: 360 }} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control" style={{ width: 360 }} />
          </div>
          <div className="d-grid justify-content-center mt-4">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
