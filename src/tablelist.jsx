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
        return days;
    }

    render() {
        const { layout } = this.state;
        const redStyle = {
            color: "red"
        };
        const yellowStyle = {
            color: "yellow"
        };
        const greenStyle = {
            color: "green"
        };
        function getStatusColor(daysSince) {
            if(daysSince > 15)
                return redStyle;
            if(daysSince > 5)
                return yellowStyle;
            return greenStyle;
        };
        
        const itemInfo = layout.qHyperCube.qDataPages[0].qMatrix.map(
            (item, i) => {
                var daysSince = this.getSinceDays(item[2].qText);
                
                return (
                    <div style={getStatusColor(daysSince)} class="row padding-rows">
                        <div class="col-md-6">
                            {item[0].qText}
                        </div>
                        <div class="col-md-4">
                            {item[1].qText}
                        </div>
                        <div class="col-md-2">
                            {daysSince + " days"}
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