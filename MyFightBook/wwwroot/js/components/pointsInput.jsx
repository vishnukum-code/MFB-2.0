class PointsInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onChange(parseInt(e.target.value));
    }
    render() {
        return (
            <div className="form-group">
                <label>Points</label>
                <input
                    id={this.props.name}
                    name={this.props.name}
                    type="number"
                    value={this.props.points}
                    onChange={this.handleChange}
                    className="form-control" />
            </div>);
    }
}