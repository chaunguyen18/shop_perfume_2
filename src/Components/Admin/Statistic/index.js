import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Statistic = () => {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("monthly"); 

  
  const fetchStatistics = async (type) => {
    try {
      const url =
  type === "monthly"
    ? "http://localhost:5000/api/statistics/monthly"
    : "http://localhost:5000/api/statistics/yearly";

      const response = await axios.get(url);

      
      const labels = response.data.map((item) =>
        type === "monthly" ? `Tháng ${item.month}/${item.year}` : `Năm ${item.year}`
      );
      const data = response.data.map((item) => item.total_revenue);

      setChartData({
        labels,
        datasets: [
          {
            label: "Doanh thu (VNĐ)",
            data,
            backgroundColor: type === "monthly" ? "rgba(54, 162, 235, 0.6)" : "rgba(255, 99, 132, 0.6)",
            borderColor: type === "monthly" ? "rgba(54, 162, 235, 1)" : "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  
  useEffect(() => {
    fetchStatistics(chartType);
  }, [chartType]);

  return (
    <div className="container-fluid">
      <div className="statistic">
        <div className="statistic-header d-flex justify-content-center">
          <h2>Thống kê</h2>
        </div>
        <div className="statistic-content row">
          <div className="statistic-action col-md-12 d-flex justify-content-start">
            <button className="btn btn-warning me-2" onClick={() => setChartType("monthly")}>
              Theo tháng
            </button>
            <button className="btn btn-warning" onClick={() => setChartType("yearly")}>
              Theo năm
            </button>
          </div>
          <div className="statistic-chart mt-4">
            {chartData ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    title: {
                      display: true,
                      text: chartType === "monthly" ? "Doanh thu theo tháng" : "Doanh thu theo năm",
                    },
                  },
                }}
                height={400}
              />
            ) : (
              <p>Đang tải dữ liệu...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
