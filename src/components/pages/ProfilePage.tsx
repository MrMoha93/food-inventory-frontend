import authService from "@services/authService";
import { User } from "@types";

function ProfilePage() {
  const user: User | null = authService.getCurrentUser();

  if (!user) return null;

  return (
    <section className="min-vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-4">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body text-center">
                <h5 className="mb-3 fw-semibold (600)">Profile Information</h5>
                <div className="mt-3 mb-4">
                  <img
                    src={"/images/userprofile.png"}
                    alt="profile image"
                    className="rounded-circle img-fluid"
                    style={{ width: "100px" }}
                  />
                </div>
                <div className="card-body text-start">
                  <p className="mb-1">
                    <span className="fw-semibold">Name:</span> {user.name}
                  </p>
                  <p className="mb-1">
                    <span className="fw-semibold">Username:</span>{" "}
                    {user.username}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProfilePage;
