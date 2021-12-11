/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {
  Dashboard,
  EditLiga,
  ListLiga,
  TambahLiga,
  ListJersey,
  TambahJersey,
  EditJersey,
  ListPesanan,
  EditPesanan
} from "./views";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  // {
  //   path: "/liga",
  //   name: "Master Liga",
  //   icon: "nc-icon nc-world-2",
  //   component: ListLiga,
  //   layout: "/admin",
  //   sidebar: true,
  // },
  {
    path: "/liga/tambah",
    name: "Tambah Liga",
    component: TambahLiga,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/liga/edit/:id",
    name: "Edit Liga",
    component: EditLiga,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jersey",
    name: "Service",
    icon: "nc-icon nc-cart-simple",
    component: ListJersey,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/jersey/tambah",
    name: "Add Service",
    component: TambahJersey,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jersey/edit/:id",
    name: "Edit Jersey",
    component: EditJersey,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/pesanan",
    name: "History",
    icon: "nc-icon nc-cart-simple",
    component: ListPesanan,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/pesanan/edit/:id",
    name: "Edit pesanan",
    component: EditPesanan,
    layout: "/admin",
    sidebar: false,
  },
];
export default routes;
