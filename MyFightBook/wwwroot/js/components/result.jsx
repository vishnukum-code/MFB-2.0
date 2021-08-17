class Result extends React.Component {
    constructor(props) {
        super(props);
        this.handleEndingChange = this.handleEndingChange.bind(this);
        this.handleWinnerChange = this.handleWinnerChange.bind(this);
        this.handleFighter1PointsChange = this.handleFighter1PointsChange.bind(this);
        this.handleFighter2PointsChange = this.handleFighter2PointsChange.bind(this);
    }
    handleEndingChange(e) {
        this.props.onEndingChange(parseInt(e.target.value));
    }
    handleWinnerChange(e) {
        this.props.onWinnerChange(parseInt(e.target.value));
    }
    handleFighter1PointsChange(points) {
        this.props.onFighter1PointsChange(points);
    }
    handleFighter2PointsChange(points) {
        this.props.onFighter2PointsChange(points);
    }
    render() {
        return this.props.fighter1 && this.props.fighter2 ? (
            <div>
                <div className="col-md-6">
                    <label>Result</label>
                    <select
                        id="endingId"
                        name="endingId"
                        value={this.props.ending ? this.props.ending.endingId : ''}
                        onChange={this.handleEndingChange}
                        className="form-control">
                        {this.props.endings.map((ending) => {
                            return (
                                <option key={ending.endingId} value={ending.endingId}>{ending.description}</option>);
                        })}
                    </select>
                </div>
                <div className="col-md-6">
                    <label>Winner</label>
                    <select
                        id="winnerId"
                        name="winnerId"
                        value={this.props.winner ? this.props.winner.userId : ''}
                        onChange={this.handleWinnerChange}
                        className="form-control">
                        <option>--select--</option>
                        {this.props.fighter1 != null &&
                            <option value={this.props.fighter1.userId}>{this.props.fighter1.firstname}</option>
                        }
                        {this.props.fighter2 != null &&
                            <option value={this.props.fighter2.userId}>{this.props.fighter2.firstname}</option>
                        }
                    </select>
                </div>
                {this.props.ending && this.props.ending.points &&
                    <div>
                        <div className="col-md-6">
                            <PointsInput name="fighter1Points" points={this.props.fighter1Points} onChange={this.handleFighter1PointsChange} />
                        </div>
                        <div className="col-md-6">
                            <PointsInput name="fighter2Points" points={this.props.fighter2Points} onChange={this.handleFighter2PointsChange} />
                        </div>
                    </div>
                }
            </div>) : null;
    }
}