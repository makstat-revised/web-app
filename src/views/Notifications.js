import React, { useState } from "react";
import classNames from "classnames";
import { chartColors } from "../contexts/colors";
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
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
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
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  menuPaper: {
    maxHeight: "470px",
    fontSize: "10px",
    width: "500px",
    whiteSpace: "normal",
    breakWord: "break-all",
    '&.MuiMenuItem-root': {
      padding: "10px",
      backgroundColor: "pink"
    }
    //  backgroundColor: "blue",
    //  minHeight: "170px"
  },

  menuList: {
    '&.MuiMenuItem-root': {
      padding: "10px",
      backgroundColor: "pink"
    }
  }
}))
function About() {
  const classes = useStyles();
  const [makstatData, setMakstatData] = React.useState([]);
  const [bigChartData, setbigChartData] = React.useState("data1");
  const [dropdownValue, setDropdownValue] = React.useState(undefined);
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  const [selectedSubCategory, setSelectedSubcategory] = React.useState("I ACCOMMODATION AND FOOD SERVICE ACTIVITIES");
  const [selectedYear, setSelectedYear] = React.useState(2012);
  const [graphType, setGraphType] = React.useState("bar");
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
            console.log('yearsWithGenders', yearsWithGenders);

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

  const getArrayOfCounts = (gender, subCat) => {
    let tempArr = [];
    [].concat.apply(
      [],
      makstatData.map((subCategory) => {
        console.log("subCategory", subCategory);
        if (subCategory.subCategory === subCat) {
          console.log("subcategory", subCategory.subCategory);
          return [].concat.apply(
            [],
            subCategory.years.map((year) => {
              console.log(year.counts);
              return year.counts
                .filter((count) => count.gender === gender)
                .map((count) => {
                  tempArr.push(count.count);
                  return count.count
                })
            })
          );
        }
      })
    );

    //   console.log("tempArr", tempArr);
    return tempArr;
  }
  const getArrayOfCountsAllSubcategories = (gender, selectedYear) => {
  let subCategoryCount=0;
    let tempArr = [[]];
    let tempSum = 0;
    [].concat.apply(
      [],
      makstatData.map((subCategory) => {
        console.log("subcategory", subCategory.subCategory);

        return [].concat.apply(
          [],
          subCategory.years.map((year, index) => {
         //   console.log("year", year);
            //   console.log("tempArr.length", tempArr.length);
            subCategoryCount++;
            if (selectedYear) {
              if (year.year === selectedYear)
                return year.counts
                  .filter((count) => count.gender === gender)
                  .map((count) => {
                    if (tempArr[index] === undefined || tempArr[index] === null) {
                      tempArr[index] = [];
                    }
                    tempArr[index].push(count.count);
                    return count.count
                  })
            } else {
              return year.counts
                .filter((count) => count.gender === gender)
                .map((count) => {
                  if (tempArr[index] === undefined || tempArr[index] === null) {
                    tempArr[index] = [];
                  }
                  tempArr[index].push(count.count);
                  console.log("tempArr[index", tempArr[index]);

                  console.log("gendeer", gender);
                  console.log("count.yar", year);
                  return count.count
                })
            }
          })
        )
      })
    );
    
    var result = tempArr.reduce(function (array1, array2) {
      return array2.map(function (value, index) {
        return value + (array1[index] || 0);
      }, 0);
    }, []);
    result.map(r=>{
      tempSum=tempSum+r;
    })
    console.log(result);
  //  console.log(result);
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
  const getYearsForSubcategory = (subCat) => {
    let yearsForSubcategoryArray = [];
    [].concat.apply(
      [],
      makstatData.map((subCategory) => {
        if (subCategory.subCategory === subCat) {
          return subCategory.years.map(
            (year) => { yearsForSubcategoryArray.push(year.year) }
          );
        }
      }),
    );
    return yearsForSubcategoryArray;
  }
  let data1 = {};



  let data = {};

 
  const getTotalData = (year) => {
    return (
      data = {
        data: (canvas) => {
          let ctx = canvas.getContext("2d");
          console.log("year insde getTotsl", year);
          console.log("getArrayOfCountsAllSubcategories(female,year),", getArrayOfCountsAllSubcategories("female", year));
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
            labels: year,
            datasets: [
              {
                label: "Female",
                fill: true,
                backgroundColor: "red",//gradientStroke,
                hoverBackgroundColor: "red", gradientStroke,
                borderColor: "red",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                data: getArrayOfCountsAllSubcategories("female", year),
              },
              {
                label: "Male",
                fill: true,
                backgroundColor: "red",
                hoverBackgroundColor: "red",//gradientStroke,
                borderColor: "red",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                data: getArrayOfCountsAllSubcategories("male", year),
              },
            ],
          };
        },
      }
    )
  };
  
  const dataDonut = (year) => {
    const sumOfMaleAndFemaleData=getArrayOfCountsAllSubcategories("male", year)+getArrayOfCountsAllSubcategories("female", year);
    const femaleData=getArrayOfCountsAllSubcategories("female", year)/sumOfMaleAndFemaleData*100;
    const maleData=getArrayOfCountsAllSubcategories("male", year)/sumOfMaleAndFemaleData*100;
    return (
      data = {
        maintainAspectRatio: false,
        responsive: false,
        labels: ["female", "male"],
        datasets: [
          {
            data: [femaleData.toFixed(2), maleData.toFixed(2)],
            // backgroundColor: chartColors,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',],
            hoverBackgroundColor: [
              '#ff335f',
              '#1277ba',],
            hoverOffset:35
          }
        ]
      }
    );
  };

  const doughnutOptions = {
    legend: {
      display: true,
      position: "right"
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };
 
  let resulttemp = getYearsForSubcategory("I ACCOMMODATION AND FOOD SERVICE ACTIVITIES");

  {
    debugger;
    return (
      <div className="content">
        <Grid container spacing={3}>
        {console.log("resilttemo", resulttemp)}
        {resulttemp.map((idx) => {
          return (

            <>
              {/* <Row> */}
              {/*           
          <Col xs="5"> */}
          <Grid item xs={3}  style={{display:"inline-block", marginRight:"0px"}}>
              <Card className="card-chart" style={{ width: "100%", padding: "30px" }}>

                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category"></h5>
                    </Col>
                    <Col sm="6">
                    </Col>
                    <Col sm="6" style={{ marginTop: "30px" }}>
                      <h2> Year {idx}</h2>

                    
                    </Col>

                    
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area" style={{ height: "390px" }}>
                    {/* <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  /> */}
                    <div>


                      <Doughnut data={dataDonut(idx)} width={700}
                        height={380} options={doughnutOptions} options={{ maintainAspectRatio: false }} />



                    </div>
                   <tr><td>Female: </td> <td>    {getArrayOfCountsAllSubcategories("female",idx)}</td></tr> 
                   <tr><td>Male: </td> <td>    {getArrayOfCountsAllSubcategories("male",idx)}</td></tr> 

                  </div>
                </CardBody>

              </Card>
              </Grid>
              {/* </Col> */}
              {/* </Row> */}
            </>
          );
        })}
        {/* })
                }  */}
</Grid>

      </div>
    );
  }
}

export default About;
