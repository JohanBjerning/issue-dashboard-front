import React, { Component } from "react";
import "./tablelist.css";

class IssueTable extends React.Component {

    coreIssuesSelected = true;
    showHandledIssues = false;
    qlikApp;
    KEY_CODE_c = 99;
    KEY_CODE_a = 97;

    constructor(props) {
        super(props);

        this.state = {
            layout: props.layout,
            selected: []
        };

        props.model.on("changed", () => this.updateLayout());
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.qlikApp = props.qlikApp;
    }

    async toggleCoreIssues() {
        if (app) {
            const field = await this.qlikApp.getField('iscorerepo');
            // Toggle selection of core repos
            this.coreIssuesSelected ? await field.select("no") : await field.select("yes");
            this.coreIssuesSelected = !this.coreIssuesSelected;
        }
    }

    async toggleHandeledIssues() {
        if (app) {
            const field = await this.qlikApp.getField('usertype');
            this.showHandledIssues ? await field.clear() : await field.select("NONE");
            this.showHandledIssues = !this.showHandledIssues;
        }
    }

    handleKeyPress(event) {
        switch (event.keyCode) {
            case this.KEY_CODE_c:
                this.toggleCoreIssues();
                break;
            case this.KEY_CODE_a:
                this.toggleHandeledIssues();
                break;
            default:
                console.log(`Unbound keycode: ${event.keyCode}`);
        }
    }

    componentDidMount() {
        document.addEventListener("keypress", this.handleKeyPress, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keypress", this.handleKeyPress, false);
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