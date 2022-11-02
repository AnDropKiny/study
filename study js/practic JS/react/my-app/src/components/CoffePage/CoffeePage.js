import { Component } from "react";
import MainPage from "../MainPage/MainPage";

import './CoffeePage.css'

export default class CoffeePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            term: '',
            filter: ''
        }

    }
    searchStateTerm = (e) => {
        let term = e.target.value;
        this.setState({ term });
        this.props.searchStateTerm(term);
    }
    btnActiveClass = (e) => {
        const itemBox = document.querySelector('.coffee-items-box'),
            resetMassage = document.querySelector(".resetBtn");
        resetMassage.style.display = "block"
        itemBox.style.justifyContent = "space-evenly";
        itemBox.style.alignItems = "flex-start";
        const btns = e.target.parentElement.childNodes,
            filter = e.target.textContent;
        btns.forEach(btn => {
            btn.classList.remove("active");
        })
        if (e.target) {
            e.target.classList.add("active");
        }
        this.setState({ filter });
        this.props.searchStateStateFilter(filter);
    }

    btnResetFilter = (e) => {
        const btns = document.querySelectorAll('.btn'),
            itemBox = document.querySelector('.coffee-items-box');
        itemBox.style.justifyContent = "";
        itemBox.style.alignItems = "";
        e.target.style.display = "none";
        btns.forEach(btn => {
            btn.classList.remove("active");
        })
        this.props.searchStateStateFilter("")


    }


    Header = ({ title = "Our Coffee" }) => {
        return (

            <div className='coffee-header'>
                <div className="header-btns">
                    <div className='logo'>
                        <a href='/' className='coffee-house main-link'>Coffee house</a>
                    </div>
                    <div className='our-coffee'>
                        <a href='/aboutcoffee' className='main-link'>Our coffee</a></div>
                    <div className='fyp'>
                        <a href='/forpleasurepage' className='main-link'>For your pleasure</a></div>

                </div>
                <h1>{title}</h1>
            </div>
        )
    }

    MainCoffeePage = () => {

        return (
            <div className='main'>
                <div className="about-our-beans">
                    <div>
                        <div className='drink-coffee-logo'></div>
                    </div>
                    <div className='about-our-beans-text'>
                        <h2>About our beans</h2>
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
                <div className="search-filter-box">
                    <div className="search-panel">
                        <span className='search-text'>Lookiing for</span>
                        <input
                            type="text"
                            placeholder="start typing here..."
                            onChange={this.searchStateTerm}
                            value={this.state.term}
                        />
                    </div>
                    <div className="filter-panel">
                        <span className='search-text'>Or filter</span>
                        <div className='btn-box'>
                            <button className="btn btn-3" type='button' onClick={this.btnActiveClass} >Brazil</button>
                            <button className="btn btn-3-2" type='button' onClick={this.btnActiveClass} >Kenya</button>
                            <button className="btn btn-3-1" type='button' onClick={this.btnActiveClass}>Columbia</button>
                        </div>

                    </div>
                </div>
                <span className="resetBtn" onClick={this.btnResetFilter}>Tap Here for Reset</span>
                <div className='coffee-items-box'>
                    {this.props.data}
                </div>
            </div>
        )
    }


    render() {
        const fromMain = new MainPage(),
            Footer = fromMain.Footer;


        return (
            <div className="coffee-page">
                <this.Header />
                <this.MainCoffeePage />
                <Footer />
            </div>
        )

    }
}