import React from 'react';


export default class CursorPane extends React.Component {

    static get propTypes() {
        return {
            width: React.PropTypes.number,
            height: React.PropTypes.number,
            strokeWidth: React.PropTypes.number,
            strokeColor: React.PropTypes.string,
        };
    }

    static get contextTypes() {
        return {
            emitter: React.PropTypes.object,
        };
    }

    tweakPoint(point) {
        if (this.props.strokeWidth <= 3) {
            return [point[0] - 2, point[1] + 2];
        } else if (this.props.strokeWidth <= 6) {
            return [point[0] - 2, point[1] + 4];
        } else {
            return [point[0] - 2, point[1] + 6];
        }
    }

    componentDidMount() {
        const that = this;
        this.cursorLayer.addEventListener('mousemove', (ev) => {
            const point = that.tweakPoint([ev.offsetX, ev.offsetY]);
            that.context.emitter.emit('mousemove.canvas', point);
        });
        this.cursorLayer.addEventListener('click', (ev) => {
            const point = [ev.offsetX - 2, ev.offsetY + 2];
            that.context.emitter.emit('click.canvas', point);
        });
    }

    render() {
        const cursorLayerStyle = {
            position: 'absolute',
            zIndex: 2000,
            width: this.props.width,
            height: this.props.height,
            borderStyle: 'none none solid none',
            borderColor: this.props.strokeColor,
        };

        return (
            <div ref={cursorLayer => this.cursorLayer = cursorLayer} style={cursorLayerStyle}></div>
        );
    }
}
