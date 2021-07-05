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
import Dashboard from "views/Dashboard.js";
import Home from "views/Home.js";
import AgeGroups from "views/AgeGroups.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: "icon-chart-bar-32",
    component: Home,
    layout: "/admin",
  },
  {
    path: "/sectors",
    name: "Sectors",
    rtlName: "لوحة القيادة",
    icon: "icon-chart-bar-32",
    component: Dashboard,
    layout: "/admin",
  },
  
  {
    path: "/agegroups",
    name: "Age groups",
    rtlName: "الرموز",
    icon: "icon-chart-bar-32",
    component: AgeGroups,
    layout: "/admin",
  },
  // {
  //   path: "/map",
  //   name: "Map",
  //   rtlName: "خرائط",
  //   icon: "tim-icons icon-pin",
  //   component: Map,
  //   layout: "/admin",
  // },
  {
    path: "/gendergap",
    name: "Gender Gap",
    rtlName: "إخطارات",
    icon: "icon-chart-bar-32",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/covid19",
    name: "COVID-19 period",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "icon-chart-bar-32",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/wagegroups",
    name: "Wage Group",
    rtlName: "قائمة الجدول",
    icon: "icon-chart-bar-32",
    component: TableList,
    layout: "/admin",
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl",
  // },
];
export default routes;
