import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ModulePage() {
  const { name } = useParams();
  const [module, setModule] = useState(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/modules/${name}`);
        const data = await res.json();
        setModule(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchModule();
  }, [name]);

  if (!module) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <Navbar />
      <h1>{module.name}</h1>
      {module.subModules.map((sub, idx) => (
        <div key={idx} className="card" style={{ marginBottom: "15px" }}>
          <h4>{sub.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: sub.content }} />
          {sub.quiz && sub.quiz.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <h5>Quiz:</h5>
              {sub.quiz.map((q, i) => (
                <p key={i}>{i + 1}. {q.question}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ModulePage;