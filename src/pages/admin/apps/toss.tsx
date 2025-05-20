import { useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import headsImg from "../../../assets/images/heads.png";
import tailsImg from "../../../assets/images/tails.png";

const Toss = () => {
  const [angle, setAngle] = useState<number>(0);

  const flipCoin = () => {
    if (Math.random() > 0.5) setAngle((prev) => prev + 180);
    else setAngle((prev) => prev + 360);
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Toss</h1>
        <section>
          <article
            className="tosscoin"
            onClick={flipCoin}
            style={{ transform: `rotateY(${angle}deg)` }}
          >
            <div style={{ backgroundImage: `url(${headsImg})` }}></div>
            <div
              style={{
                backgroundImage: `url(${tailsImg})`,
                transform: "rotateY(-180deg)",
              }}
            ></div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Toss;
