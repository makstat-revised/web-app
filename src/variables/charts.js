/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// ##############################
// // // Chart variables
// #############################

// window.chart =require("./RoundedBars.js");

// chartExample1 and chartExample2 options
let chart1_2_options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
let chartExample1 = {
  data1: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
        },
      ],
    };
  },
  data2: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
        },
      ],
    };
  },
  data3: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
        },
      ],
    };
  },
  options: chart1_2_options,
};

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
let chartExample2 = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
      datasets: [
        {
          label: "Data",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [80, 100, 70, 80, 120, 80],
          yAxisID: 'y-axis-1',
        },
        {
          label: "Data1",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#FFFFF",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#FFFFF",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#FFFFF",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [60, 80, 90, 100, 80, 120],
          yAxisID: 'y-axis-2',
        },
      ],
    };
  },
  options: { 
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
},
};

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
let chartExample3 = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    return {
      labels: ["2010", "2012", "2014", "2016", "2018", "2020"],
      datasets: [
         {
            label: "Male",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [53, 20, 10, 80, 100, 45],
          },
          {
            label: "Female",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#FFFF",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [22, 40, 50, 60, 80, 65],
          },        
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
    },
  },
};



// let example3= {
//   data: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
//     gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
//     gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); 

//     return {
//       labels: ["Week I", "Week II", "Week III", "Week IV"],
//       datasets: [
//         {
//           label: "Pending Approval",
//           backgroundColor: "rgb(51, 153, 255)",
//           data: [20, 10, 30, 15],
//           stack: 1,
//           name: "AMR"
//         },
//         {
//           label: "Invoice Created",
//           backgroundColor: "rgb(51, 204, 51)",
//           data: [60, 20, 20, 30],
//           stack: 1
//         },
//         {
//           label: "Approved!",
//           backgroundColor: "green",
//           data: [40, 50, 20, 45],
//           stack: 1
//         },
//         {
//           label: "Pending Approval",
//           backgroundColor: "rgb(51, 153, 255)",
//           data: [25, 5, 20, 10],
//           stack: 2
//         },
//         {
//           label: "Invoice Created!",
//           backgroundColor: "rgb(51, 204, 51)",
//           data: [51, 25, 10, 30],
//           stack: 2
//         },
//         {
//           label: "Approved!",
//           backgroundColor: "green",
//           data: [45, 40, 22, 55],
//           stack: 2
//         },
//         {
//           label: "Pending Approval",
//           backgroundColor: "rgb(51, 153, 255)",
//           data: [35, 5, 25, 10],
//           stack: 3
//         },
//         {
//           label: "Invoice Created!",
//           backgroundColor: "rgb(51, 204, 51)",
//           data: [51, 25, 10, 30],
//           stack: 3
//         },
//         {
//           label: "Approved!",
//           backgroundColor: "green",
//           data: [45, 40, 22, 55],
//           stack: 3
//         },
//         {
//           label: "Pending Approval",
//           backgroundColor: "rgb(51, 153, 255)",
//           data: [15, 5, 21, 17],
//           stack: 4
//         },
//         {
//           label: "Invoice Created!",
//           backgroundColor: "rgb(51, 204, 51)",
//           data: [51, 25, 10, 30],
//           stack: 4
//         },
//         {
//           label: "Approved!",
//           backgroundColor: "green",
//           data: [45, 40, 22, 55],
//           stack: 4
//         }
//       ]
//     };
//   },

//   options: {
//     cornerRadius: 10,
//     legend: {
//       labels: {
//         generateLabels: function(chart) {
//           return Chart.defaults.global.legend.labels.generateLabels
//             .apply(this, [chart])
//             .filter(function(item, i) {
//               return i <= 2;
//             });
//         }
//       }
//     },
//     scales: {
//       xAxes: [
//         {
//           id: "xAxis1",
//           type: "category",
//           ticks: {
//             display: false
//           }
//         },
//         {
//           id: "xAxis2",
//           type: "linear",
//           ticks: {
//             beginAtZero: true,
//             max: 4,
//             min: 0,
//             stepSize: 0.25,
//             labelOffset: 15,

//             callback: function(value, index, values) {
//               var array = ["W1", "W2", "W3", "W4"];
//               // console.log("values:  ", index % array.length) ;
//               if (index == values.length - 1) return "";
//               return array[index % array.length];
//             }
//           }
//         },
//         {
//           id: "xAxis3",
//           type: "linear",
//           ticks: {
//             beginAtZero: true,
//             max: 4,
//             min: 0,
//             stepSize: 1,
//             labelOffset: 55,
//             callback: function(value, index, values) {
//               var weeks = ["Week I", "Week II", "Week III", "Week IV"];
//               return weeks[index];
//             }
//           }
//         }
//       ],
//       yAxes: [
//         {
//           stacked: true
//         }
//       ]
//     },
//     tooltips: {
//       mode: "nearest",
//       callbacks: {
//         title: function(tooltipItem, data) {
//           const arr = [
//             "W1",
//             "W1",
//             "W1",
//             "W2",
//             "W2",
//             "W2",
//             "W3",
//             "W3",
//             "W3",
//             "W4",
//             "W4",
//             "W4"
//           ];
//           // console.log(tooltipItem);
//           return arr[tooltipItem[0].datasetIndex];
//         }
//       }
//     }
//   }
// };

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
const chartExample4 = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    return {
      labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#00d6b4",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00d6b4",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00d6b4",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [90, 27, 60, 12, 80],
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },

    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0,242,195,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
    },
  },
};

module.exports = {
  chartExample1, // in src/views/Dashboard.js
  chartExample2, // in src/views/Dashboard.js
  chartExample3, // in src/views/Dashboard.js
  chartExample4,
  // example3, // in src/views/Dashboard.js
};
