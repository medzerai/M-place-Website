import { Link } from "react-router-dom";

import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const DashboardAdmin = () => {
  const data = [
    { name: "Facebook", users: 2000000000 },
    { name: "Instagram", users: 1500000000 },
    { name: "Twiter", users: 1000000000 },
    { name: "Telegram", users: 500000000 },
  ];
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Dashboard
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1>List of products</h1>
            </div>
            <div className="content-cardTemplate">
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="users"
                  isAnimationActive={false}
                  data={data}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1>List of products</h1>
            </div>
            <div className="content-cardTemplate">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="users"
                  fill="#8884d8"
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1>List of products</h1>
            </div>
            <div className="content-cardTemplate">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="users"
                  fill="#8884d8"
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1>List of products</h1>
            </div>
            <div className="content-cardTemplate">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="users"
                  fill="#8884d8"
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
