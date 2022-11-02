import { Component } from "react"
import MainPage from "../MainPage/MainPage"
import CoffeePage from '../CoffePage/CoffeePage'

import './forPleasure.css';

export default class ForPleasurePage extends Component {

    ForPleasure = () => {

        return (
            <div className='main'>
                <div className="about-our-beans">
                    <div>
                        <div className='drink-coffee-logo'></div>
                    </div>
                    <div className='about-our-beans-text'>
                        <h2>About our goods</h2>
                        <div className='logo-black'></div>
                        <span>
                            Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible.
                            <p />Afraid at highly months do things on at. Situation <br />recommend objection do intention<br />
                            so questions.<br />
                            As greatly removed calling pleased improve an.<br /> Last ask him cold feel<br />
                            met spot shy want. Children me laughing we prospect answered followed. At it went<br />
                            is song that held help face.
                        </span>
                    </div>

                </div>
                <hr />
                <div className='coffee-items-box'>
                    {this.props.data}
                </div>
            </div>
        )
    }

    render() {

        const fromMain = new MainPage(),
            fromCoffee = new CoffeePage(),
            HeaderOurCoffee = fromCoffee.Header,
            Footer = fromMain.Footer;

        return (
            <div className="for-pleasure">
                <HeaderOurCoffee title="For your pleasure" />
                <this.ForPleasure />
                <Footer />
            </div>
        )

    }
}