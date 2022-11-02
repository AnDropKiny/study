import './app-info.css';

const AppInfo = ({ data }) => {
    let increaseValue = 0;
    data.forEach(item => {
        if (item.increase) increaseValue++;
    })
    return (
        <div className="app-info">
            <h1>Учёт сотрудников в компании InTrioGames</h1>
            <h2>Общее число сотрудников: {data.length}</h2>
            <h2>Премию получат: {increaseValue} </h2>
        </div>
    )
}

export default AppInfo;