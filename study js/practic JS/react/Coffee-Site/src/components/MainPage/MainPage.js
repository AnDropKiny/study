import { Component } from "react";
import { Link } from "react-router-dom";
import './MainPage.css'


export default class MainPage extends Component {
    // constructor(props) {
    //     super(props);
    // }

    HeaderMain = () => {
        return (
            <div className='header'>
                <div className="header-btns">
                    <div className='logo'>
                        <a href='/' className='coffee-house main-link'>Coffee house</a>
                    </div>
                    <div className='our-coffee'>
                        <a href='/aboutcoffee' className='main-link'>Our coffee</a></div>
                    <div className='fyp'>
                        <a href='/forpleasurepage' className='main-link'>For your pleasure</a></div>
                </div>
                <div className='header-text'>
                    <h1 className='header-text-title'>Everything You Love About Coffee</h1>
                    <i className='beans-logo'></i>
                    <h2>We makes every day full of energy and taste</h2>
                    <h2>Want to try our beans?</h2>
                    <Link to='/aboutcoffee'
                        type='button' className="btn btn-outline-light">More</Link>
                </div>

            </div>
        )
    }
    AboutUs = () => {

        return (
            <div className='about'>
                <h2>About Us</h2>
                <div className='logo-black'></div>
                <span><p />Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible.
                    Afraid at highly months do things on at. Situation recommend objection do intention
                    so questions. As greatly removed calling pleased improve an. Last ask him cold feel
                    met spot shy want. Children me laughing we prospect answered followed. At it went
                    is song that held help face.
                    <p />

                    Now residence dashwoods she excellent you. Shade being under his bed her, Much
                    read on as draw. Blessing for ignorant exercise any yourself unpacked. Pleasant
                    horrible but confined day end marriage. Eagerness furniture set preserved far
                    recommend. Did even but nor are most gave hope. Secure active living depend son
                    repair day ladies now.</span>
            </div>
        )
    }
    BestOffer = () => {
        const data = this.props.data;
        return (
            <div className='best'>
                <h2>Our Best</h2>
                <div className="best-items-list">
                    {data}
                </div>
            </div>
        )
    }

    Footer = () => {
        return (
            <div className='footer'>
                <div className="footer-btns">
                    <Link to='/' className='coffee-house-black main-link-black'>Coffee house</Link>
                    <div className='our-coffee-black'>
                        <a href='/aboutcoffee' className='main-link-black'>Our coffee</a></div>
                    <div className='fyp-black'>
                        <a href='/forpleasurepage' className='main-link-black'>For your pleasure</a></div>
                </div>
                <i className='beans-black-logo'></i>

            </div>

        )
    }

    massage = () => {
        console.log('MSG')
    }


    render() {
        return (
            <div className="main-page">
                <this.HeaderMain />
                <this.AboutUs />
                <this.BestOffer />
                <this.Footer />
            </div>
        )
    }
}
// const footer = new MainPage();
// footer.massage();