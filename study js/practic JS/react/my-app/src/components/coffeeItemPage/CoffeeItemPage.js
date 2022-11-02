// import { Component } from "react";
import MainPage from "../MainPage/MainPage"
import CoffeePage from '../CoffePage/CoffeePage'

import './item-page.css'


const CoffeeItemPage = (props) => {

    const ItemPage = () => {
        return (
            <div className="about-our-beans">
                <div>
                    <div className='about-coffee-logo'></div>
                </div>
                <div className='about-our-beans-text'>
                    <h2>About It</h2>
                    <div className='logo-black'></div>
                    <span>
                        <b>Name:</b> {props.name}<br />
                        <b>Country:</b> {props.type ? props.type : "Brazil"}<br />
                        <br />
                        <b>Discription:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quasi minus, cum tenetur iste porro repudiandae exercitationem iusto nostrum dolores doloribus officia odit, suscipit dignissimos ipsam rerum deserunt facere? Exercitationem tenetur perferendis ipsa, qui facere provident?
                        <br /><br />
                        <b>Price:</b> {props.price}
                    </span>
                </div>
            </div>
        )
    }

    const fromMain = new MainPage(),
        fromCoffee = new CoffeePage(),
        HeaderOurCoffee = fromCoffee.Header,
        Footer = fromMain.Footer;
    return (
        <div className="coffee-item-page">
            <HeaderOurCoffee />
            <ItemPage />
            <Footer />
        </div>
    )

}
export default CoffeeItemPage;