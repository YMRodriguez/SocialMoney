import React, { Component } from "react";
import { init } from "ityped";

export default class InteractiveDescription extends Component {
    componentDidMount() {
        const myElement = document.querySelector("#viewport-header");
        init(myElement, {
            showCursor: false,
            strings: ["Join the growing social media for investment interests.", "Avoid scammers.", "Learn, share, invest."]
        });
    }
    render() {
        return (
            <header id="viewport-header">
            </header>);
    }
}