import React from 'react';

import './SideDrawer.css';
import { Link } from 'react-router-dom';

const sideDrawer = props => {
    let drawerClasses = ['side-drawer'];
    if (props.show){
        drawerClasses = ["side-drawer", "open"];
    }
    return (
        <nav className={drawerClasses.join(' ')} id = "sidedrawer">
            <ul >
                <li> <Link to ='/' > Главная </Link></li>
                <li className = "catalog"> 
                        <Link to = {'/catalog'} activeStyle={{color: "#B5561C"}}> Каталог </Link>
                        <ul className = "subMenu">
                            <li> <Link to = {'/catalog/doors'} > Двери  </Link> </li>
                            <li> <Link to = {'/catalog/arches'} activeStyle={{color: "#B5561C"}}> Арки </Link> </li>
                            <li> <Link to = {'/catalog/stairs'} activeStyle={{color: "#B5561C"}}> Лестницы </Link> </li>
                        </ul>
                     </li>
                <li> <Link to = {'/howWeWork'} activeStyle={{color: "#B5561C"}}> Как мы работаем </Link></li>
                <li> <Link to = {'/ourBenefits'} activeStyle={{color: "#B5561C"}}> Наши преимущества </Link></li>
                <li> <Link to = {'/price'} activeStyle={{color: "#B5561C"}}> Стоимость и гарантия </Link></li>
                <li> <Link to = {'/forPartners'} activeStyle={{color: "#B5561C"}}> Партнёрам </Link></li>
            </ul>
        </nav>);
};

export default sideDrawer;