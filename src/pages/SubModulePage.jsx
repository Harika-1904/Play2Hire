// pages/SubModulePage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SubModulePage() {
  const { moduleName, subIndex } = useParams();
  const [subModule, setSubModule] = useState(null);

  useEffect(() => {
    const fetchSubModule = async () => {
      const res = await axios.get(`http://localhost:5000/api/modules/${moduleName}`);
      setSubModule(res.data.subModules[subIndex]);
    };
    fetchSubModule();
  }, [moduleName, subIndex]);

  if (!subModule) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>{subModule.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: subModule.content }} />
      {subModule.quiz && subModule.quiz.length > 0 && (
        <div>
          <h3>Quiz</h3>
          {subModule.quiz.map((q, i) => (
            <div key={i}>
              <p>{q.question}</p>
              {q.options.map((opt, idx) => (
                <button key={idx}>{opt}</button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default SubModulePage;