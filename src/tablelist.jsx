import React, { Component } from "react";
import "./tablelist.css";

class IssueTable extends React.Component {
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

    getSinceDays(fromDate) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const today = new Date();
        const reportdate = new Date(fromDate);
        const days = Math.round(Math.abs((today.getTime() - reportdate.getTime()) / (oneDay)));
        return days + " days";
    }

    render() {
        const { layout } = this.state;
        const itemInfo = layout.qHyperCube.qDataPages[0].qMatrix.map(
            (item, i) => {
                return (
                    <div class="row padding-rows">
                        <div class="col-md-6">
                            {item[0].qText}
                        </div>
                        <div class="col-md-4">
                            {item[1].qText}
                        </div>
                        <div class="col-md-2">
                            {this.getSinceDays(item[2].qText)}
                        </div>
                    </div>
                );
            }
        );

        return (
            <div class="tableContainer">
                {itemInfo}
            </div>
        );
    }
}

export default IssueTable;