import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const pages = [
    { title: "Vendors", desc: "Manage vendors, add/edit vendor details.", path: "/vendors" },
    { title: "Branches", desc: "Manage branch information and locations.", path: "/branches" },
    { title: "GRNs", desc: "Create and track GRN records.", path: "/grns" },
    { title: "Manufacturers", desc: "View and update manufacturer details.", path: "/manufacturers" },
    { title: "Assets", desc: "View all registered assets.", path: "/assets" }
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Asset Management System</h2>
      <div className="row items-center justify-content-center">
        {pages.map((page, index) => (
          <div
            key={index}
            className="col-md-5 mb-4"
            onClick={() => navigate(page.path)}
            style={{ cursor: "pointer" }}
          >
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">{page.title}</h5>
                <p className="card-text text-muted">{page.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
