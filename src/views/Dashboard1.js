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
import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar, Chart } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  // example3,
  chartExample4,
} from "variables/charts.js";
// import {Chart} from 'chart.js';


require('../variables/RoundedBars');

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  const [data,setData]=useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [lineAgriCulture, setLineAgriculture]= useState(undefined);
  const [dataChart, setDataChart] = useState(undefined);
  const [itemsArray, setItemsArray] = useState([]);
  const [itemsLabels,  setItemsLabels] = useState([]);
  const [itmTmp, setItmTmp]= useState([]);
  const [example4, setExample4] = useState(undefined)








  // import React from "react";
  // import Title from "@components/title";
  // import Navbar from "@components/navbar";
  
  // import { Bar } from "react-chartjs-2";
  
  // function About() {
      const [makstatData, setMakstatData] = React.useState([]);
  
      React.useEffect(() => {
          const fetchData = async () => {
              const category = "sector";
  
              try {
                  const subCategoriesResult = await fetch(
                      `http://localhost:8080/employeeCount/${category}`
                  );
                  const subCategoriesData = await subCategoriesResult.json();
                  const subCategories =
                      subCategoriesData.subCategories._embedded.subCategories.map(
                          (subCategory) => subCategory.subCategory
                      );
  
                  console.log("subCategories", subCategories);
  
                  const subCategoriesWithYearsAndGenders = await Promise.all(
                      subCategories.map(async (subCategory) => {
                          const yearsResult = await fetch(
                              `http://localhost:8080/employeeCount/${category}/${subCategory}`
                          );
                          const yearsData = await yearsResult.json();
                          const years = yearsData.years._embedded.years.map(
                              (year) => year.year
                          );
  
                          const yearsWithGenders = await Promise.all(
                              years.map(async (year) => {
                                  const gendersResult = await fetch(
                                      `http://localhost:8080/employeeCount/${category}/${subCategory}/${year}`
                                  );
                                  const gendersData = await gendersResult.json();
                                  const genders =
                                      gendersData.genders._embedded.genders.map(
                                          (gender) => {
                                              return {
                                                  gender: gender.gender,
                                                  count: gender.count,
                                              };
                                          }
                                      );
                                  return {
                                      year,
                                      counts: genders,
                                  };
                              })
                          );
  
                          return {
                              subCategory,
                              years: yearsWithGenders,
                          };
                      })
                  );
  
                  console.log(
                      "subCategoriesWithYearsAndGenders",
                      subCategoriesWithYearsAndGenders
                  );
  
                  setMakstatData(subCategoriesWithYearsAndGenders);
              } catch (error) {
                  console.log(error);
              }
          };
  
          fetchData();
      }, []);
  
      const getArrayOfCounts = (gender) =>
          [].concat.apply(
              [],
              makstatData.map((subCategory) => {
                  return [].concat.apply(
                      [],
                      subCategory.years.map((year) => {
                          return year.counts
                              .filter((count) => count.gender === gender)
                              .map((count) => count.count);
                      })
                  );
              })
          );
  
      const dataBlend = {
          labels: [].concat.apply(
              [],
              makstatData.map((subCategory) => {
                  return subCategory.years.map(
                      (year) => `${subCategory.subCategory} -> ${year.year}`
                  );
              })
          ),
  
          datasets: [
              {
                  label: "female",
                  data: getArrayOfCounts("female"),
                  backgroundColor: "rgb(255, 99, 132)",
              },
              {
                  label: "male",
                  data: getArrayOfCounts("male"),
                  backgroundColor: "rgb(54, 162, 235)",
              },
          ],
      };
  
      const optionsBlend = {
          scales: {
              yAxes: [
                  {
                      stacked: true,
                      ticks: {
                          beginAtZero: true,
                      },
                  },
              ],
              xAxes: [
                  {
                      stacked: true,
                  },
              ],
          },
      };
  
      // return (
      //     <div>
      //         <Title />
      //         <Navbar page={"about"} />
      //         <div>
      //             <h3>About us</h3>
      //             <Bar data={data} options={options} />
      //         </div>
      //     </div>
      // );
  //}
  
  // export default About;
  






  console.log("items",items);
  let temp1;
  let itemsArray1 = [];
  useEffect(() => {

  temp1 =[
   
    {
      label: "Invoice Created",
      backgroundColor: "rgb(51, 204, 51)",
      data: [60, 20, 20, 30],
      stack: 1
    },
    {
      label: "Approved!",
      backgroundColor: "pink",
      data: [40, 50, 20, 45],
      stack: 1
    },
    {
      label: "Invoice Created!",
      backgroundColor: "rgb(51, 204, 51)",
      data: [51, 25, 10, 30],
      stack: 2
    },
    {
      label: "Approved!",
      backgroundColor: "pink",
      data: [45, 40, 22, 55],
      stack: 2
    },
    {
      label: "Invoice Created!",
      backgroundColor: "rgb(51, 204, 51)",
      data: [51, 25, 10, 30],
      stack: 3
    },
    {
      label: "Approved!",
      backgroundColor: "pink",
      data: [45, 40, 22, 55],
      stack: 3
    },
    {
      label: "Invoice Created!",
      backgroundColor: "rgb(51, 204, 51)",
      data: [51, 25, 10, 30],
      stack: 4
    },
    {
      label: "Approved!",
      backgroundColor: "pink",
      data: [45, 40, 22, 55],
      stack: 4
    }
  ]
      // setItmTmp(temp);
 
    
    fetch("http://localhost:8080/employeeCount/")
    // {
    //   headers : { 
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //    }
    // })
    .then(res => res.json())
    .then(
      (result) => { debugger;
        console.log('result.results',result.results);
        console.log('result.categories',result.categories);
        console.log('result.categories._embedded.categories[0]', result.categories._embedded.categories[0].subCategories._embedded.subCategories);
        console.log('years._embedded.years', result.categories._embedded.categories[0].subCategories._embedded.subCategories[0].years._embedded.years);
        setData(result.categories._embedded.categories[0].subCategories._embedded.subCategories);

        setIsLoaded(true);
        console.log('result',result.categories._embedded.categories);
        setItems(result.categories._embedded.categories); 
        let res = result.categories._embedded.categories;
        setDataChart([{
          name: res? `${res[0].subCategories._embedded.subCategories[0].years._embedded.years[0].year}`:'kaltrina',
          male: res? `${res[0].subCategories._embedded.subCategories[0].years._embedded.years[0].genders._embedded.genders[0].count}`: 'kaltrina',
          female: res? `${res[0].subCategories._embedded.subCategories[0].years._embedded.years[0].genders._embedded.genders[1].count}`: 'kaltrina',
          amt: 2400,
        },
        {
          name: res? `${res[0].subCategories._embedded.subCategories[0].years._embedded.years[1].year}`:'kaltrina',
          male: res? `${res[0].subCategories._embedded.subCategories[0].years._embedded.years[1].genders._embedded.genders[0].count}`: 'kaltrina',
          female: res? `${res[0].subCategories._embedded.subCategories[0].years._embedded.years[1].genders._embedded.genders[1].count}`: 'kaltrina',
          amt: 2210,
        },
        ]);
        let data1= result.categories._embedded.categories[0].subCategories._embedded.subCategories;
        let itemsLabels1 = [];

        let temp=[];
        data1 && data1.length>0 && data1.map((item, i)=> {
          word+=`subcategory: ${item.subCategory}\n`;
          itemsLabels1[i]= item.subCategory;
          let femaleCount =[];
          let maleCount = [];

        item.years._embedded.years.map((itm, index) => {
            word+=`year: ${itm.year}\n`;
            itm.genders._embedded.genders.map(it => {
              word+=`gender: ${it.gender} count: ${it.count}\n`
              
              if(it.gender == "female"){ debugger;
                femaleCount.push(it.count);
              
                itemsArray1[`${item.subCategory} + ${it.gender}`]= {
                  label: "Female",
                  backgroundColor: "pink",
                  data: femaleCount,
                  stack: i+1
                }
              }
              else {
                maleCount.push(it.count);

                itemsArray1[`${item.subCategory} + ${it.gender}`]= {
                  label: "Male",
                  backgroundColor: "blue",
                  data: maleCount,
                  stack: i+1
                }
              } 
              
            })

        })
      })      
      console.log("word", word);
      console.log("itemsArray1", itemsArray1);

      let finalArray = Object.values(itemsArray1);
       console.log("finalArray", finalArray);



      setExample4({data: {
        labels: ['Week I', 'Week II', 'Week III', 'Week IV'],
        datasets: Object.values(itemsArray1),// finalArray, //Object.values(itemsArray1),
      },

    options: {
      cornerRadius: 0,
      legend: {
        labels: {
          generateLabels: function(chart) {
            return Chart.defaults.global.legend.labels.generateLabels
              .apply(this, [chart])
              .filter(function(item, i) {
                return i <= 2;
              });
          }
        }
      },
      scales: {
        xAxes: [
          {
            id: 'xAxis1',
            type: 'category',
            ticks: {
              display: false
            }
          },
          {
            id: 'xAxis2',
            type: 'linear',
            ticks: {
              beginAtZero: true,
              max: 4,
              min: 0,
              stepSize: 0.25,
              labelOffset: 15,

              callback: function(value, index, values) {
                var array = ['W1', 'W2', 'W3', 'W4'];
                // console.log("values:  ", index % array.length) ;
                if (index == values.length - 1) return '';
                return array[index % array.length];
              }
            }
          },
          {
            id: 'xAxis3',
            type: 'linear',
            ticks: {
              beginAtZero: true,
              max: 4,
              min: 0,
              stepSize: 1,
              labelOffset: 55,
              callback: function(value, index, values) {
                var weeks = kaltrina;
                return weeks[index];
              }
            }
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      },
      tooltips: {
        mode: 'nearest',
        callbacks: {
          title: function(tooltipItem, data) {
            const arr = [
              'W1',
              'W1',
              'W1',
              'W2',
              'W2',
              'W2',
              'W3',
              'W3',
              'W3',
              'W4',
              'W4',
              'W4'
            ];
            // console.log(tooltipItem);
            return arr[tooltipItem[0].datasetIndex];
          }
        }
      }
    }});
  //----------------------------------------------------------------    
        if(res.length!==0){
          let chartE1 = {
            data1: (canvas) => {
              let ctx = canvas.getContext("2d");
          
              let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
          
              gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
              gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
              gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
          
              return {
                labels: [
                  res? `${res[0].subCategories._embedded.subCategories[0].subCategory}`:"kaltrina",
                  // items? items.years._embedded.years[0].genders._embedded.genders[0].gender: "",
                  res? `${res[0].subCategories._embedded.subCategories[1].subCategory}`:"kaltrina",
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
                    data: [100, 70]//90]//, 70, 85, 60, 75, 60, 90, 80, 110, 100],
                  },
                ],
              };
            },
          }
          setLineAgriculture(chartE1);
          console.log("chartE1", chartE1);
        }   
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
    
  }, []);

  
 const labels= data.map((item)=>item.subCategory);
 const yearsAr=data.map((item)=>item.years._embedded.years);
//  const sectorData=data.map((item)=>item[0].years._embedded.years.year);
  const kaltrina= ['a','b','c','d'];
  // const [example4, setExample4] = useState(undefined)
    // data: {
    //     labels: ['Week I', 'Week II', 'Week III', 'Week IV'],
    //     datasets: temp,
    //   },

    // options: {
    //   cornerRadius: 0,
    //   legend: {
    //     labels: {
    //       generateLabels: function(chart) {
    //         return Chart.defaults.global.legend.labels.generateLabels
    //           .apply(this, [chart])
    //           .filter(function(item, i) {
    //             return i <= 2;
    //           });
    //       }
    //     }
    //   },
    //   scales: {
    //     xAxes: [
    //       {
    //         id: 'xAxis1',
    //         type: 'category',
    //         ticks: {
    //           display: false
    //         }
    //       },
    //       {
    //         id: 'xAxis2',
    //         type: 'linear',
    //         ticks: {
    //           beginAtZero: true,
    //           max: 4,
    //           min: 0,
    //           stepSize: 0.25,
    //           labelOffset: 15,

    //           callback: function(value, index, values) {
    //             var array = ['W1', 'W2', 'W3', 'W4'];
    //             // console.log("values:  ", index % array.length) ;
    //             if (index == values.length - 1) return '';
    //             return array[index % array.length];
    //           }
    //         }
    //       },
    //       {
    //         id: 'xAxis3',
    //         type: 'linear',
    //         ticks: {
    //           beginAtZero: true,
    //           max: 4,
    //           min: 0,
    //           stepSize: 1,
    //           labelOffset: 55,
    //           callback: function(value, index, values) {
    //             var weeks = kaltrina;
    //             return weeks[index];
    //           }
    //         }
    //       }
    //     ],
    //     yAxes: [
    //       {
    //         stacked: true
    //       }
    //     ]
    //   },
    //   tooltips: {
    //     mode: 'nearest',
    //     callbacks: {
    //       title: function(tooltipItem, data) {
    //         const arr = [
    //           'W1',
    //           'W1',
    //           'W1',
    //           'W2',
    //           'W2',
    //           'W2',
    //           'W3',
    //           'W3',
    //           'W3',
    //           'W4',
    //           'W4',
    //           'W4'
    //         ];
    //         // console.log(tooltipItem);
    //         return arr[tooltipItem[0].datasetIndex];
    //       }
    //     }
    //   }
    // }
  // }
// )

// window.chart =require("../variables/RoundedBars");


const a= [];
let word ="";

let finalResult = itemsArray!==undefined? {data: {
  labels: ['Week I', 'Week II', 'Week III', 'Week IV'],
  datasets: Object.values(itemsArray),// finalArray, //Object.values(itemsArray1),
},

options: {
cornerRadius: 0,
legend: {
  labels: {
    generateLabels: function(chart) {
      return Chart.defaults.global.legend.labels.generateLabels
        .apply(this, [chart])
        .filter(function(item, i) {
          return i <= 2;
        });
    }
  }
},
scales: {
  xAxes: [
    {
      id: 'xAxis1',
      type: 'category',
      ticks: {
        display: false
      }
    },
    {
      id: 'xAxis2',
      type: 'linear',
      ticks: {
        beginAtZero: true,
        max: 4,
        min: 0,
        stepSize: 0.25,
        labelOffset: 15,

        callback: function(value, index, values) {
          var array = ['W1', 'W2', 'W3', 'W4'];
          // console.log("values:  ", index % array.length) ;
          if (index == values.length - 1) return '';
          return array[index % array.length];
        }
      }
    },
    {
      id: 'xAxis3',
      type: 'linear',
      ticks: {
        beginAtZero: true,
        max: 4,
        min: 0,
        stepSize: 1,
        labelOffset: 55,
        callback: function(value, index, values) {
          var weeks = kaltrina;
          return weeks[index];
        }
      }
    }
  ],
  yAxes: [
    {
      stacked: true
    }
  ]
},
tooltips: {
  mode: 'nearest',
  callbacks: {
    title: function(tooltipItem, data) {
      const arr = [
        'W1',
        'W1',
        'W1',
        'W2',
        'W2',
        'W2',
        'W3',
        'W3',
        'W3',
        'W4',
        'W4',
        'W4'
      ];
      // console.log(tooltipItem);
      return arr[tooltipItem[0].datasetIndex];
    }
  }
}
}} : undefined; 
{debugger;
  return (
    <>{console.log("ITEMS ARRAY IN RETURN", itemsArray)}
      {console.log("finalResult", finalResult)}
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Shipments</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                        {/* <div>
                          {data && data.length>0 && data.map((item)=><h1>{item[0].years._embedded.years.year}</h1>)}
                        </div> */}
                        <div>

                       
                        {data && data.length>0 && data.map((item)=><h1>{item.subCategory}</h1>)}
                        
                        {/* {
                          data && data.length>0 && data.map((item, i)=> {
                              word+=`subcategory: ${item.subCategory}\n`;
                              itemsLabels[i]= item.subCategory;
                              let femaleCount =[];
                              let maleCount = [];
                            item.years._embedded.years.map((itm, index) => {
                                word+=`year: ${itm.year}\n`;
                                itm.genders._embedded.genders.map(it => {debugger;
                                  word+=`gender: ${it.gender} count: ${it.count}\n`
                                  
                                  if(it.gender == "female"){
                                    femaleCount.push(it.count);

                                    itemsArray[`${item.subCategory} + ${it.gender}`]= {
                                      label: "Female",
                                      backgroundColor: "pink",
                                      data: femaleCount,
                                      stack: i+1
                                    }
                                  }
                                  else {
                                    maleCount.push(it.count);
                                    itemsArray[`${item.subCategory} + ${it.gender}`]= {
                                      label: " Male",
                                      backgroundColor: "blue",
                                      data: maleCount,
                                      stack: i+1
                                    }
                                  } 
                                  
                                })

                            })
                          })
                         
                        } */}
                        </div>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
              {/* {dataChart && <div className="chart-area">
                  <Line
                    data={dataChart}
                  />
                </div> } */}
                   {lineAgriCulture && <div className="chart-area">
                  <Line
                    data={lineAgriCulture.data1}
                    options={lineAgriCulture.options}
                  />
                </div> }
                <div>
                  <h3>About us</h3>
                  <Bar data={dataBlend} options={optionsBlend} />
              </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Shipments</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 763,215
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="7">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Daily Sales</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  3,500€
                </CardTitle>
              </CardHeader>
              {/* <CardBody> */}
                <div>
                {/* <div className="chart-area"> */}
                 {example4 &&  <Bar
                    data={example4.data}
                    options={example4.options}
                  /> }
                </div>
              {/* </CardBody> */}
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Tasks(5)</h6>
                <p className="card-category d-inline"> today</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Update the Documentation</p>
                          <p className="text-muted">
                            Dwuamish Head, Seattle, WA 8:47 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">GDPR Compliance</p>
                          <p className="text-muted">
                            The GDPR is a regulation that requires businesses to
                            protect the personal data and privacy of Europe
                            citizens for transactions that occur within EU
                            member states.
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip457194718"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Solve the issues</p>
                          <p className="text-muted">
                            Fifty percent of all respondents said they would be
                            more likely to shop at a company
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip362404923"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip362404923"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Release v2.0.0</p>
                          <p className="text-muted">
                            Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip818217463"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip818217463"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Export the processed files</p>
                          <p className="text-muted">
                            The report also shows that consumers will not easily
                            forgive a company once a breach exposing their
                            personal data occurs.
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip831835125"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip831835125"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Arival at export process</p>
                          <p className="text-muted">
                            Capitol Hill, Seattle, WA 12:34 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip217595172"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip217595172"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}}

export default Dashboard;
