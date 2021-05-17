import React from "react";
import Plot from 'react-plotly.js';
import AsyncSelect from 'react-select/async';
import InputBase from '@material-ui/core/InputBase';


const dot = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const styles = {
    input: styles => ({ ...styles, ...dot() }),
    placeholder: styles => ({ ...styles, ...dot() }),
    control: styles => ({
        ...styles,
        width: '50%',
        margin: '0 auto'
    }),
    option: styles => ({
        ...styles,
        // borderBottom: '1px dotted black',
        margin: '0 auto'
    }),
    menu: styles => ({
        ...styles,
        margin: '0 auto'
    })
}

class StockChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentData: [],
            symbol: "QQQ",
            newsymbol: "",
            API_KEY: "6CX48JD3Y460OZQH",
            outputsize: "full",
            stockChartXValues: [],
            stockChartOpenValues: [],
            stockChartLowValues: [],
            stockChartHighValues: [],
            stockChartCloseValues: []
        }
    }

    componentDidMount() {
        this._fetchStock()
    }


    _fetchStock() {
        let res = async () => await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + this.state.symbol + "&outputsize=" + this.state.outputsize + "&apikey=" + this.state.API_KEY, {
            method: 'GET'
        }).then(r => {
            return r.json()
        }
        ).then(data => {
            let stockChartXValuesFunction = [];
            let stockChartOpenValuesFunction = [];
            let stockChartLowValuesFunction = [];
            let stockChartHighValuesFunction = [];
            let stockChartCloseValuesFunction = [];

            for (var key in data['Time Series (Daily)']) {
                stockChartXValuesFunction.push(key);
                stockChartOpenValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                stockChartHighValuesFunction.push(data['Time Series (Daily)'][key]['2. high']);
                stockChartLowValuesFunction.push(data['Time Series (Daily)'][key]['3. low']);
                stockChartCloseValuesFunction.push(data['Time Series (Daily)'][key]['4. close']);

            }
            this.setState({
                stockChartXValues: stockChartXValuesFunction,
                stockChartOpenValues: stockChartOpenValuesFunction,
                stockChartLowValues: stockChartLowValuesFunction,
                stockChartHighValues: stockChartHighValuesFunction,
                stockChartCloseValues: stockChartCloseValuesFunction
            })
            this.setState({ currentData: data })
        })
        res()
    }

    _handleChange = () => {
        this._fetchStock()
    }

    render() {

        return (
            <div>
                <InputBase
                    placeholder="Write the ticker you want"
                    onChange={async (e) => { this.setState({ symbol: e.target.value }) }}
                />
                <div><button onClick={this._handleChange}>Buscar</button></div>
                <Plot
                    useResizeHandler={true}
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            close: this.state.stockChartCloseValues,
                            high: this.state.stockChartHighValues,
                            low: this.state.stockChartLowValues,
                            increasing: { line: { color: '#17BECF' } },
                            decreasing: { line: { color: '#7F7F7F' } },
                            line: { color: 'rgba(31,119,180,1)' },
                            open: this.state.stockChartOpenValues,
                            type: 'candlestick',
                            xaxis: 'x',
                            yaxis: 'y'
                        }]
                    }
                    layout={
                        {
                            title: this.state.symbol,
                            width: 800,
                            height: 400,
                            autosize: true,
                            style: { position: 'relative', width: '100%', height: '100%' },
                            xaxis: {
                                autorange: true,
                                rangeselector: {
                                    buttons: [
                                        {
                                            count: 250,
                                            label: '1d',
                                            step: 'day',
                                            stepmode: 'backward'
                                        },
                                        {
                                            count: 5,
                                            label: '3d',
                                            step: 'day',
                                            stepmode: 'backward'
                                        },
                                        {
                                            count: 1,
                                            label: '1m',
                                            step: 'month',
                                            stepmode: 'backward'
                                        },
                                        {
                                            count: 1,
                                            label: '1y',
                                            step: 'year',
                                            stepmode: 'backward'
                                        },
                                        {
                                            count: 5,
                                            label: '5y',
                                            step: 'year',
                                            stepmode: 'backward'
                                        },
                                        { step: 'all' }
                                    ]
                                },
                                rangeslider: { range: [] },
                                type: 'date'
                            }
                        }
                    }
                />
            </div>
        )
    }
}

export default StockChart;