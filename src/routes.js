/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Posts from "views/posts";
import Category from "views/cateogroy";

var routes = [
  {
    path: "/posts",
    name: "Posts",
    icon: "ni ni-ungroup text-blue",
    component: Posts,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category",
    icon: "ni ni-books text-blue",
    component: Category,
    layout: "/admin",
  },
];
export default routes;
