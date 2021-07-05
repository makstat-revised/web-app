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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";

 const useStyles = makeStyles(theme => ({
   menuPaper: {
     maxHeight: "470px",
     fontSize: "10px",
     width: "500px",
     whiteSpace: "normal",
     breakWord: "break-all",
     '&.MuiMenuItem-root':{
      padding:"10px",
      backgroundColor: "pink"
  }
    //  backgroundColor: "blue",
    //  minHeight: "170px"
   },

   menuList :{
     '&.MuiMenuItem-root':{
       padding:"10px",
       backgroundColor: "pink"
   }}
 }))
function About() {
    const classes = useStyles();
    const [makstatData, setMakstatData] = React.useState([]);
    const [bigChartData, setbigChartData] = React.useState("data1");
    const [dropdownValue, setDropdownValue] = React.useState(undefined);
    const setBgChartData = (name) => {
      setbigChartData(name);
    };
    const[selectedSubCategory,setSelectedSubcategory]= React.useState("I ACCOMMODATION AND FOOD SERVICE ACTIVITIES");
    const[graphType, setGraphType]=React.useState("bar");
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
              console.log("subCategory", subCategory);
                if(subCategory.subCategory===subCat)
                {
                    console.log("subcategory", subCategory.subCategory);
                    return [].concat.apply(
                        [],
                        subCategory.years.map((year) => 
                        { console.log(year.counts);
                            return year.counts
                                .filter((count) => count.gender === gender)
                                .map((count) =>{
                                  tempArr.push(count.count);
                                   return count.count})
                        })
                    );
                }        
            })
        );
        
    console.log("tempArr", tempArr);
        return tempArr;
        
      }
      const getArrayOfCountsAllSubcategories = (gender) =>{
        let sumOfCounts=[];
        let tempArr=[[]];
        let tempSum=[];
        let tempAllCounts=[];
          [].concat.apply(
              [],
              makstatData.map((subCategory) => {
                      console.log("subcategory", subCategory.subCategory);
                      return [].concat.apply(
                          [],
                          subCategory.years.map((year, index) => 
                          { console.log(year.counts);
                            console.log("tempArr.length", tempArr.length);
                          
                            // for(let i=0;i<tempArr.length;i++)
                            // {
                            //   console.log('temparr[i]', tempArr[i]);
                            //   for(let j=0; j<tempArr[i]; j++)
                            //   {

                            //     let num = parseInt(tempArr[j]);
                            //     console.log("num", num);
                            //     tempSum[i]+=num;
                            //     console.log("tempSum[i]",tempSum[i]);
                            //   }
                            // }
                            
                            console.log("(tempSum)", tempSum);
                           
                            console.log("tempArr", tempArr);
                              return year.counts
                                  .filter((count) => count.gender === gender)
                                  .map((count) =>{
                                  if(tempArr[index] === undefined || tempArr[index] ===null ){
                                    tempArr[index] = [];
                                  }
                                  tempArr[index].push(count.count);
                                  console.log("tempArr[index", tempArr[index]);
                                  return count.count})
                          })

                      )

                  
              })
          );
          for(let i=0;i<tempArr.length;i++)
          {
            console.log('temparr in SUMMING', tempArr);
            for(let j=0; j<tempArr[i].length; j++)
            {
              console.log("tempArra[i][j]", tempArr[j][i]);
              let num = parseInt(tempArr[j][i]);
              if(tempSum[i] === undefined || tempSum[i] ===null ){
                tempSum[i] = 0;
              }
              tempSum[i]+=num;
              console.log("tempSum[i]", tempSum[i]);
            }
          }
          console.log("FINAL Tempsum", tempSum);
        return tempSum;
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
                (year) => {yearsForSubcategoryArray.push(year.year)}
            );
          }
        }),         
      );
      return yearsForSubcategoryArray;
    }
    let data1={};
   const getData1=(subCat)=>{
      return (
      data1={
        labels: ['a','b'],

        datasets: [
            {
                label: "female",
                data: getArrayOfCounts("female","I ACCOMMODATION AND FOOD SERVICE ACTIVITIES"),
                backgroundColor: "rgb(255, 255, 132)",
            },
            {
                label: "male",
                data: getArrayOfCounts("male","I ACCOMMODATION AND FOOD SERVICE ACTIVITIES"),
                backgroundColor: "rgb(54, 162, 235)",
            },
        ],
    })
  };
    const options1 = {
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

    let data={};
  const getLineData=(subCat)=>{
    return (
    data = {
      data: (canvas) => {
        let ctx = canvas.getContext("2d");
    
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    
        return {       
            // labels: [].concat.apply(
            //     [],
            //     makstatData.map((subCategory) => {
            //         return subCategory.years.map(
            //             (year) => `${subCategory.subCategory} -> ${year.year}`
            //         );
            //     })
            // ),
          labels: getYearsForSubcategory("I ACCOMMODATION AND FOOD SERVICE ACTIVITIES"),     
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
  const getBarData=(subCat)=>{
    return (
    data = {
      data: (canvas) => {
        let ctx = canvas.getContext("2d");
    
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    
        return {       
            // labels: [].concat.apply(
            //     [],
            //     makstatData.map((subCategory) => {
            //         return subCategory.years.map(
            //             (year) => `${subCategory.subCategory} -> ${year.year}`
            //         );
            //     })
            // ),
          labels: getYearsForSubcategory("I ACCOMMODATION AND FOOD SERVICE ACTIVITIES"),     
          datasets: [
            {
              label: "female",
              fill: true,
              backgroundColor: "#d048b6",
              hoverBackgroundColor: "#d048b6",
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: getArrayOfCounts("female",subCat),
            },
            {
              label: "Male",
              fill: true,
              backgroundColor: "#1000bb",
              hoverBackgroundColor: "#1000bb",
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
  const getTotalData=()=>{
    return (
    data = {
      data: (canvas) => {
        let ctx = canvas.getContext("2d");
    
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    
        return {       
            // labels: [].concat.apply(
            //     [],
            //     makstatData.map((subCategory) => {
            //         return subCategory.years.map(
            //             (year) => `${subCategory.subCategory} -> ${year.year}`
            //         );
            //     })
            // ),
          labels: getYearsForSubcategory("I ACCOMMODATION AND FOOD SERVICE ACTIVITIES"),
          datasets: [
            {
              label: "female",
              fill: true,
              backgroundColor: "#d048b6",//gradientStroke,
              hoverBackgroundColor:"#d048b6", gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: getArrayOfCountsAllSubcategories("female"),
            },
            {
              label: "Male",
              fill: true,
              backgroundColor: "#1000bb",
              hoverBackgroundColor: "#1000bb",//gradientStroke,
              borderColor: "#1000bb",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: getArrayOfCountsAllSubcategories("male"),
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
                fontColor: "#0000",
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
                fontColor: "#00000",
              },
            },
          ],
        },
      },
    };

{debugger;
    return (
        // <div className="content">
    
          
        //   <div>
        //     <h3>About us</h3>
        //     <Bar data={chartExample3.data} options={chartExample3.options} />
        //    </div>
        // </div>
        <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart" style={{width:"100%", padding: "30px"}}>
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Number of employment selected in categories, devided by gender</h5>
                    <CardTitle tag="h2">Employment</CardTitle>
                  </Col>
                  <Col  sm="6"> 
                  </Col>
                  <Col sm="6" style={{marginTop: "30px"}}>

                  <FormControl variant="outlined" style={{width: "500px", height:"40px" }}>
                    <InputLabel id="demo-simple-select-outlined-label">SubCategory</InputLabel>
                    <Select style={{width:"500px"}}
                      MenuProps={{classes: {paper: classes.menuPaper, list: classes.menuList}}}
                      value={dropdownValue}
                      onChange={(event)=> setDropdownValue(event.target.value)}
                      label="SubCategory"
                      
                    >
                      {makstatData.map((subCategory)=> {
                        return (
                          <MenuItem value={subCategory.subCategory} 
                              onClick={() => setSelectedSubcategory(subCategory.subCategory)}>
                                {subCategory.subCategory}
                              </MenuItem>
                        )
                      })}
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                     
                    </Select>
                  </FormControl>
                  </Col>

                      <Col className="text-right" sm="6">

                  {/* { makstatData.map((subCategory)=>{
                      return(
                        <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: selectedSubCategory === subCategory.subCategory,
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setSelectedSubcategory(subCategory.subCategory)}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        {subCategory.subCategory}
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      );
                    })} */}

                   
                   
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
  
                        <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: graphType==="Line",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setGraphType("Line")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Line
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: graphType==="Bar",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setGraphType("Bar")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Bar
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{height: "350px"}}>
                  {/* <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  /> */}
                  <div>
               
               {
                 graphType==="Bar" ? (
                <Bar data={getBarData(selectedSubCategory).data} width={700}
                height={380} options={options} options={{ maintainAspectRatio: false }}/>
                 ): (
                <Line data={getLineData(selectedSubCategory).data} 
                width={700}
                height={380}
                  options={options} 
                  options={{ maintainAspectRatio: false }}
                 />
                 )}
                </div>
                {/* <Bar data={chartExample3.data} options={chartExample3.options} /> */}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row>
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
  
                        <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: graphType==="Line",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setGraphType("Line")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Line
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: graphType==="Bar",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setGraphType("Bar")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Bar
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
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
               {/*      <div style={{ position: "relative", margin: "auto", display: "block", height: "199px",  width: "399px"}}>
               
             {
                 graphType==="Bar" ? (
                <Bar data={getTotalData().data} options={options} />
                 ): (
                <Line data={getTotalData().data} options={options} />
                 )}
                </div> */}
                {/* <Bar data={chartExample3.data} options={chartExample3.options} /> */}
                {/* </div> */}
              {/* </CardBody>
            </Card>
        </Col>
       </Row> */} 
        </div>
    );
}}

export default About;
