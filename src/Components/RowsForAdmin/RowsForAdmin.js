import React, {Component} from 'react';
import './RowsForAdmin.css';
import { async } from 'q';

class RowsForAdmin extends Component{
    state = {
        coords: {},
        sizes: {},
        clicked: false,
        rows: [],
        selected: false,
    }

    componentDidMount(){
        this.refs.canvas.addEventListener('mousedown', this.mouseDownHandler, false);
        this.refs.canvas.addEventListener('mousemove', this.mouseMoveHandler, false);
        this.refs.canvas.addEventListener('mouseup',this.mouseUpHandler, false);
    }

    mouseDownHandler = (event) => {
        this.removeHighlight();
        let {x, y} = this.getCoords(event);
        this.setState({
            clicked: true,
            coords: {
                x, 
                y
            }
        });
    }

    mouseMoveHandler = (event) => {
        if(this.state.clicked){
            const {width, height}  = this.getWidth(event);
            this.setState({
                sizes:{
                    width,
                    height
                }
            }, this.drawRectangle);
        }
    }

    mouseUpHandler = (event) => {
        if (this.state.clicked){
            const {width, height} = this.getWidth(event);
            this.setState({
                sizes:{
                    width,
                    height
                },
                clicked: false
            }, this.highlightSeats);
        }
    }

    removeHighlight = () => {
        let rows = this.copyMatrix(this.state.rows);
        rows.forEach((row, i) => {
            row.forEach((element, j) => {
                if (element.type === 'selected'){
                    element.type = element.previous;
                }
                row[j] = element;
            })
        });
        this.props.handler(rows);
        this.refs.canvas.getContext("2d").clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.width);
        this.setState({rows}, this.drawRows(rows, false, ''));
    }


    highlightSeats = () => {
        let ctx = this.refs.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.width);
        this.drawRows(this.state.rows);
        console.log(this.state);
        let rows = this.copyMatrix(this.state.rows);
        const {x, y} = this.state.coords;
        const {width, height} = this.state.sizes;
        rows.forEach((row, i) => {
            row.forEach((element, j) => {
                if (((element.x - x >= 0)) &&((element.x - x) <= width) && ((element.y - y) <= height) && (element.y - y >= 0)){
                    if (element.type !== 'delete'){
                        element.previous = element.type;
                        element.type = "selected";
                    }
                    row[j] = element;
                }
            })
        });
        this.props.handler(rows);
        this.setState({
            rows
        },this.drawRows(this.state.rows, false, ''));
    }

    drawRectangle = () => {
        let ctx = this.refs.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.width);
        this.drawRows(this.state.rows);
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.fillStyle="#ccc"; 
        let {x, y} = this.state.coords;
        let {width, height} = this.state.sizes;
        ctx.rect(x, y, width, height);
        ctx.stroke(); 
    }

    getWidth = (event) => {
        const {x, y} = this.getCoords(event);
        let width = (x - this.state.coords.x) ;
        let height = (y - this.state.coords.y) ;
        return {
            width,
            height
        } 
    }

    getScale = () => {
        let coords = this.refs.canvas.getBoundingClientRect();
        const scaleX = this.refs.canvas.width / coords.width;
        const scaleY = this.refs.canvas.height / coords.height;
        return {
            scaleX,
            scaleY
        }
    }

    getCoords = (event) =>{
        let coords = this.refs.canvas.getBoundingClientRect();
        let x = event.clientX - coords.left;
        let y = event.clientY - coords.top;
        const {scaleX, scaleY} = this.getScale();
        x = x * scaleX;
        y = y * scaleY;
        let result = {
            x,
            y
        }
        return result;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: nextProps.rows
        }, this.drawRows(nextProps.rows, false, ''));
        if (nextProps.newType){
            this.setState({
                rows: nextProps.rows
            }, this.drawRows(this.state.rows, true, nextProps.newType));
        }
    }

    copyMatrix = (matrix) => {
        return matrix.map((row) => {
            return JSON.parse(JSON.stringify(row));
        })
    }

    drawRows =  (rowsDraw, flag, newType) => {
        let rows = rowsDraw;
        let ctx = this.refs.canvas.getContext("2d");
        if (flag){
            ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.width);
            this.changeType(rows, newType);
            rows = this.checkForDeletedRows(rows);
        }
        let rowStartX = 10;
        let rowStartY = 10;
        let radius = 5;
        rows.forEach((element, index) => {
            let row = index;
            element.forEach((value, index) => {
                ctx.beginPath();        
                ctx.lineWidth="2";
                switch(value.type){
                    case 'basic':
                        ctx.fillStyle="#ccc";
                        break
                    case 'vip':
                            ctx.fillStyle="rgb(218, 241, 4)";
                            break;
                    case 'forPairs':
                            ctx.fillStyle="rgb(201, 11, 11)";
                            break;
                    case 'selected':
                            ctx.fillStyle="rgb(23, 6, 117)";
                            break;
                    case 'delete':
                            ctx.fillStyle="white";
                            break;
                }
                    const x = rowStartX + (index * 2.5 * radius);
                    const y = rowStartY + (row * 2.5 * radius);
                    value.x = x;
                    value.y = y;
                    element[index] = value; 
                    ctx.arc( x, y, 5, 0, 2 * Math.PI);
                    ctx.fill();
                
            })
        });
        if (flag){
            this.props.handler(rows);
        }
    }

    changeType = (matrix, newType) =>{
        matrix.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value.type === 'selected'){
                    row[j].type = newType;
                }
            })
        })
    }

    checkForDeletedRows = (matrix) => {
        let newMatrix = [];
        matrix.forEach(element => {
            let counter = 0;
            element.forEach(element => {
                if(element.type === 'delete')
                    counter++;
            })    
            if (counter !== element.length){
                newMatrix.push(element);
            }
        });
        return newMatrix;
    }
   

    adaptCanvasSize = (rows, radius) => {
        
    }

    render(){
        return(
            <div className="canvasWrapper" id="canvasWrapper">
                <canvas  ref="canvas" className="rowsCanvas">
                           
                </canvas>
            </div>
        )
    }
}

export default RowsForAdmin;