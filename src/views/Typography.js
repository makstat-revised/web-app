import React, { useState } from "react";
import classNames from "classnames";
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
import { Bar, Line } from "react-chartjs-2";
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "../variables/charts";
import { array } from "prop-types";
function EmploymentTimeOfCovid() {
    const [makstatData, setMakstatData] = React.useState([]);
    const [bigChartData, setbigChartData] = React.useState("data1");
    const setBgChartData = (name) => {
      setbigChartData(name);
    };
    const[subCategory,setSubcategory]= React.useState("agriculture");

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
                        console.log('yearsWithGenders',yearsWithGenders);

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

    const getArrayOfCounts = (gender, subCat) =>{
      let tempArr=[];
        [].concat.apply(
            [],
            makstatData.map((subCategory) => {
                if(subCategory.subCategory===subCat)
                {
                    console.log("subcategory", subCategory.subCategory);
                    return [].concat.apply(
                        [],
                        subCategory.years.map((year) => 
                        { console.log(year.counts);
                          if(year.year>2010)
                          {
                            return year.counts
                                .filter((count) => count.gender === gender)
                                .map((count) =>{
                                  tempArr.push(count.count);
                                   return count.count})
                          }
                        })
                    );
                }        
            })
        );
        return tempArr;
      }

    // const getSubcategories=()=>{
    //   [].concat.apply(
    //     [],
    //     makstatData.map((subCategory)=>{
    //       return subCategory.subCategory;
    //     })
    //   )
    // }
    const getYearsForSubcategory=(subCat)=>
    {    
    let yearsForSubcategoryArray=[];
      [].concat.apply(
        [],
        makstatData.map((subCategory) => {
          if(subCategory.subCategory===subCat)
          {
            return subCategory.years.map(
                (year) => {yearsForSubcategoryArray.push(`${subCategory.subCategory} -> ${year.year}`)}
            );
          }
        }),         
      );
      return yearsForSubcategoryArray;
    }

    let data={};
  const getData=(subCat)=>{
    return (
    data = {
      data: (canvas) => {
        let ctx = canvas.getContext("2d");
    
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    
        return {   
          labels: getYearsForSubcategory("agriculture"),
          datasets: [
            {
              label: "female",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: getArrayOfCounts("female",subCat),
            },
            {
              label: "Male",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#1000bb",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: getArrayOfCounts("male",subCat),
            },
          ],
        };
      },
    }
  )};  
    const options={
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
              stacked:false,
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
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {         
              
              stacked: false,
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
{debugger;
    return (
        <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Number of employment selected in categories, devided by gender</h5>
                    <CardTitle tag="h2">Employment</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
  
                  { makstatData.map((subCategory)=>{
                      return(
                        <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: subCategory === subCategory.subCategory,
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setSubcategory(subCategory.subCategory)}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        {subCategory.subCategory}
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      );
                    })}
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {/* <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  /> */}
                  <div style={{ position: "relative", margin: "auto", display: "block", height: "199px",  width: "399px"}}>
                <Bar data={getData(subCategory).data} options={options} />
                </div>
                {/* <Bar data={chartExample3.data} options={chartExample3.options} /> */}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Number of employment selected in categories, devided by gender</h5>
                    <CardTitle tag="h2">Employment</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                  { makstatData.map((subCategory)=>{
                      return(
                        <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: subCategory === subCategory.subCategory,
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setSubcategory(subCategory.subCategory)}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        {subCategory.subCategory}
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      );
                    })}
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {/* <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  /> */}
                  <div style={{ position: "relative", margin: "auto", display: "block", height: "199px",  width: "399px"}}>
                <Line data={getData(subCategory).data} options={options} />
                </div>
                {/* <Bar data={chartExample3.data} options={chartExample3.options} /> */}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
    );
}}

export default EmploymentTimeOfCovid;
