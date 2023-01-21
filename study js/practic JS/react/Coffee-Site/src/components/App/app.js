import { Component } from "react";
import { Route, Routes } from 'react-router-dom'

import MainPage from "../MainPage/MainPage";
import ForPleasurePage from "../ForPleasurePage/ForPleasurePage";
import CoffeePage from "../CoffePage/CoffeePage";
import CoffeeItemPage from "../coffeeItemPage/CoffeeItemPage";
import CoffeeItem from "../coffee-item/coffee-item";
import "./app.css";

import salimo from '../coffee-item/img/salimo.png'
import presto from '../coffee-item/img/presto.png'
import aromistico from '../coffee-item/img/aromistico.png'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                { img: `${salimo}`, name: "Solimo Coffee Beans 2 kg", price: 10.99, favorite: true, id: 1 },
                { img: `${presto}`, name: "Presto Coffee Beans 1 kg", price: 15.99, favorite: true, id: 2 },
                { img: `${aromistico}`, name: "AROMISTICO Coffee 1 kg", price: 6.99, favorite: true, id: 3 },
                { img: `${aromistico}`, name: "Solimo Coffee 1 kg", price: 6.99, type: "Brazil", favorite: false, id: 4 },
                { img: `${aromistico}`, name: "Presto Coffee 1 kg", price: 6.99, type: "Kenya", favorite: false, id: 5 },
                { img: `${aromistico}`, name: "AROMISTICO Coffee 1 kg", price: 6.99, type: "Columbia", favorite: false, id: 6 },
                { img: `${aromistico}`, name: "AROMISTICO Coffee 2 kg", price: 10.99, type: "Kenya", favorite: false, id: 7 },
                { img: `${aromistico}`, name: "AROMISTICO Coffee 2 kg", price: 10.99, type: "Brazil", favorite: false, id: 8 },
                { img: `${aromistico}`, name: "AROMISTICO Coffee 2 kg", price: 10.99, type: "Columbia", favorite: false, id: 9 }
            ],
            term: '',
            filter: ""
        }
    }


    searchEmp = (data, term) => {
        // const defaultData = data.map(item => !item.favorite)
        if (term.length === 0) {
            return data;
        }
        return data.filter(items => {
            return items.name.indexOf(term) > -1
        });
    }

    searchStateTerm = (term) => {
        this.setState({ term });
    }
    searchStateStateFilter = (filter) => {
        this.setState({ filter });
    }

    filterPost = (data, filter) => {
        switch (filter) {
            case "Brazil":
                return data.filter(item => item.type === "Brazil");
            case "Kenya":
                return data.filter(item => item.type === "Kenya");
            case "Columbia":
                return data.filter(item => item.type === "Columbia");
            default: return data;
        }
    }


    pageSelector = (e) => {

    }
    render() {
        const { data, term, filter } = this.state;
        const searchEmp = this.searchEmp(data, term),
            visibleData = this.filterPost(searchEmp, filter),
            showItems = (data, favorite = false) => {
                const elements = data.map(item => {
                    const { ...itemsProps } = item;
                    if (item.favorite === favorite)
                        return (
                            <CoffeeItem
                                {...itemsProps}
                            />
                        )
                    return "";
                })
                return elements;
            }
        const coffeeItemPages = data.map(item => {
            const { id, ...itemsProps } = item;
            return (
                <Route key={id} path={`/coffeeitem${id}`} element={<CoffeeItemPage {...itemsProps} />} />
            )

        })
        return (
            <Routes>
                <Route path="/" element={<MainPage
                    data={showItems(visibleData, true)}

                />} />
                <Route path="/aboutcoffee" element={
                    <CoffeePage
                        data={showItems(visibleData)}
                        searchStateTerm={this.searchStateTerm}
                        searchStateStateFilter={this.searchStateStateFilter} />} />
                {coffeeItemPages}
                {/* <Route path="/coffeeitem" element={<CoffeeItemPage />} /> */}
                <Route path="/forpleasurepage" element={<ForPleasurePage data={showItems(visibleData)} />} />

                <Route path="*" element={<h1>404 NOT FOUND</h1>} />
            </Routes>

        )
    }
}








export default App; 