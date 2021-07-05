import React from 'react';
import { Grid } from "@material-ui/core";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
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
import imgBackground from "../assets/img/light.jpg"
function Home() {

  //   React.useEffect(() => {
  //     axios.get('')
  //       .then(function (response) {
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       })
  //   }, []);

  return (
    <div style={{ height: "100%", backgroundImage:  `url(${imgBackground})`,  backgroundRepeat: "no-repeat",
    backgroundSize: "auto"}}> 
      <div>
        <h3>Keys to understanding the world of work</h3>
         <Grid container spacing={3} style={{ marginLeft: "280px", paddingRight: "250px", marginTop:"100px" }}>
         <Grid onClick={()=>{
              window.location.assign("/admin/sectors")
            }} item xs={2} style={{ cursor: "pointer", width: "500px", height: "500px", }}>

            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />

                </div>
                <h2>SECTORS</h2>
                <div className="card-description">
                <p>
                    Emplyees presented by 
                    <br/>- Genders
                    <br/>- Sectors
                    <br/>- Years
                  </p>


                  

                  
                </div>
              </CardBody>
              <CardFooter>

              </CardFooter>
            </Card>

          </Grid>
          <Grid onClick={()=>{
              window.location.assign("/admin/agegroups")
              // window.history.pushState({}, null, "/agegroups");
            }} item xs={2} style={{ cursor: "pointer", width: "500px", height: "500px", }}>
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />

                </div>
                <h2>AGE GROUPS</h2>
                <div className="card-description">
                <p>
                    Emplyees presented by 
                    <br/>- Genders
                    <br/>- Age Group
                    <br/>- Years
                  </p>


                  

                  
                </div>
              </CardBody>
              <CardFooter>

              </CardFooter>
            </Card>
          </Grid>
          <Grid onClick={()=>{
              window.location.assign("/admin/gendergap")
            }} item xs={2} style={{ cursor: "pointer", width: "500px", height: "500px", }}>
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />

                </div>
                <h2>GENDER GROUPS</h2>
                <div className="card-description">
                  <p>
                    Emplyees presented by 
                    <br/>-Genders
                    <br/>- Sectors
                    <br/>- Years
                  </p>

                  

                  
                </div>
              </CardBody>
              <CardFooter>

              </CardFooter>
            </Card>
          </Grid>
          <Grid onClick={()=>{
              window.location.assign("/admin/covid19")
            }} item xs={2} style={{ cursor: "pointer", width: "500px", height: "500px", }}>
            <Card  className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />

                </div>
                <h2>COVID-19 PERIOD</h2>
                <div className="card-description">
                <p>
                    Emplyees presented by 
                    <br/>- Genders
                    <br/>- Sectors
                    <br/>- Years: 2019 and 2020
                  </p>

                  

                  
                </div>
              </CardBody>
              <CardFooter>

              </CardFooter>
            </Card>
          </Grid>
          <Grid onClick={()=>{
              window.location.assign("/admin/wagegroups")
            }} item xs={2} style={{ cursor: "pointer", width: "500px", height: "500px", }}>
            <Card  className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />

                </div>
                <h2>WAGE GROUPS</h2>
                <div className="card-description">
                <p>
                    Wages presented by 
                    <br/>- Wage Groups
                    <br/>- Genders
                    <br/>- Years
                  </p>


                  

                  
                </div>
              </CardBody>
              <CardFooter>

              </CardFooter>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>

  );
}

export default Home;
