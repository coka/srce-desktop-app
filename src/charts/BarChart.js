import React, { Component } from 'react';
import { select } from 'd3-selection';
class BarChart extends Component {
    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }
    componentDidMount() {
        this.createBarChart();
    }
    componentDidUpdate() {
        this.createBarChart();
    }
    createBarChart() {
        var data = [
            { skill: 'CSS', value: 55 },
            { skill: 'HTML', value: 80 },
            { skill: 'JS', value: 40 },
            { skill: 'ANGULAR', value: 35 }
        ];

        const node = this.node;

        select(node)
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect');

        select(node)
            .selectAll('rect')
            .data(data)
            .style('fill', '#8D5FA8')
            .attr('height', 40)
            .attr('width', d => d.value)
            .attr('y', (d, i) => i * 70 + 50)
            .attr('x', 100);

        select(node)
            .selectAll('text')
            .data(data)
            .enter()
            .append('text');

        select(node)
            .selectAll('text')
            .data(data)
            .attr('x', -1)
            .attr('y', (d, i) => i * 70 + 50 + 22)
            .text(d => d.skill);
    }
    render() {
        return (
            <svg
                ref={node => (this.node = node)}
                width={500}
                height={500}
            ></svg>
        );
    }
}
export default BarChart;
