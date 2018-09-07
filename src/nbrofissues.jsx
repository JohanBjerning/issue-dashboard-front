import React, { Component } from "react";
import "./nbrofissues.css";

class NbrOfIssues extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            layout: props.layout,
            selected: []
        };

        props.model.on("changed", () => this.updateLayout());
    }

    async updateLayout() {
        const { model } = this.props;
        const layout = await model.getLayout();
        this.setState({ layout });
    }

    render() {
        const { layout } = this.state;
        const numberOfItems = layout.qHyperCube.qDataPages[0].qMatrix.length;

        return (
            <p class="center-text">
                {numberOfItems}
            </p>
        );
    }
}

export default NbrOfIssues;