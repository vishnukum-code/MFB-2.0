class CreateFight extends React.Component {
    constructor(props) {
        super(props);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleFightClassChange = this.handleFightClassChange.bind(this);
        this.handleWeightClassChange = this.handleWeightClassChange.bind(this);
        this.handleFighter1ClubChange = this.handleFighter1ClubChange.bind(this);
        this.handleFighter1Change = this.handleFighter1Change.bind(this);
        this.handleFighter2ClubChange = this.handleFighter2ClubChange.bind(this);
        this.handleFighter2Change = this.handleFighter2Change.bind(this);
        this.handleEndingChange = this.handleEndingChange.bind(this);
        this.handleWinnerChange = this.handleWinnerChange.bind(this);
        this.handleFighter1PointsChange = this.handleFighter1PointsChange.bind(this);
        this.handleFighter2PointsChange = this.handleFighter2PointsChange.bind(this);

        this.endings = this.props.initialData.endings;
        this.fightClasses = this.props.initialData.fightClasses;
        this.weightClasses = this.props.initialData.weightClasses;
        this.clubs = this.props.initialData.clubs;

        this.state = {
            number: this.props.initialData.number,
            fightClass: null,
            weightClass: null,
            fighter1Club: null,
            fighter1: null,
            fighter2Club: null,
            fighter2: null,
            ending: null,
            winner: null,
            fighter1Points: this.props.initialData.fighter1Points,
            fighter2Points: this.props.initialData.fighter2Points
        };

        if (this.props.initialData.fightClassId > 0) {
            this.state.fightClass = _.find(this.fightClasses, { fightClassId: this.props.initialData.fightClassId });
        }
        if (this.props.initialData.weightClassId > 0) {
            this.state.weightClass = _.find(this.weightClasses, { weightClassId: this.props.initialData.weightClassId });
        }
        if (this.props.initialData.endingId > 0) {
            this.state.ending = _.find(this.endings, { endingId: this.props.initialData.endingId });
        }
        if (this.props.initialData.fighter1ClubId > 0) {
            this.state.fighter1Club = _.find(this.clubs, { clubId: this.props.initialData.fighter1ClubId });
        }
        if (this.props.initialData.fighter2ClubId > 0) {
            this.state.fighter2Club = _.find(this.clubs, { clubId: this.props.initialData.fighter2ClubId });
        }
        if (this.props.initialData.fighter1UserId > 0) {
            console.log(this.state.fighter1Club.fighters);
            this.state.fighter1 = _.find(this.state.fighter1Club.fighters, { userId: this.props.initialData.fighter1UserId });
        }
        if (this.props.initialData.fighter2UserId > 0) {
            this.state.fighter2 = _.find(this.state.fighter2Club.fighters, { userId: this.props.initialData.fighter2UserId });
        }
        if (this.props.initialData.winnerId > 0) {
            if (this.state.fighter1 && this.state.fighter1.userId === this.props.initialData.winnerId)
                this.state.winner = this.state.fighter1;
            else if (this.state.fighter2 && this.state.fighter2.userId === this.props.initialData.winnerId)
                this.state.winner = this.state.fighter2;
        }
    }
    handleNumberChange(e) {
        if (e.target.value > -1) {
            this.setState({
                number: e.target.value
            });    
        }
    }
    handleFightClassChange(e) {
        let fightClassId = parseInt(e.target.value);
        let fightClass = _.find(this.fightClasses, { fightClassId: fightClassId });
        this.setState({
            fightClass: fightClass
        });
    }
    handleWeightClassChange(e) {
        let weightClassId = parseInt(e.target.value);
        let weightClass = _.find(this.weightClasses, { weightClassId: weightClassId });
        this.setState({
            weightClass: weightClass
        });
    }
    handleFighter1ClubChange(id) {
        let fighterClub = _.find(this.clubs, { clubId: id });
        this.setState({
            fighter1Club: fighterClub,
            fighter1: null,
            winner: null
        });
    }
    handleFighter1Change(id) {
        let fighter = _.find(this.state.fighter1Club.fighters, { userId: id });
        this.setState({
            fighter1: fighter,
            winner: null
        });
    }
    handleFighter2ClubChange(id) {
        let fighter2Club = _.find(this.clubs, { clubId: id });
        this.setState({
            fighter2Club: fighter2Club,
            fighter2: null,
            winner: null
        });
    }
    handleFighter2Change(id) {
        let fighter = _.find(this.state.fighter2Club.fighters, { userId: id });
        this.setState({
            fighter2: fighter,
            winner: null
        });
    }
    handleEndingChange(id) {
        let ending = _.find(this.endings, { endingId: id });
        this.setState({
            ending: ending
        });
    }
    handleWinnerChange(id) {
        let winner = null;
        if (this.state.fighter1.userId === id)
            winner = this.state.fighter1;
        else if (this.state.fighter2.userId === id)
            winner = this.state.fighter2;
        this.setState({
            winner: winner
        });
    }
    handleFighter1PointsChange(points) {
        this.setState({
            fighter1Points: points
        });
    }
    handleFighter2PointsChange(points) {
        this.setState({
            fighter2Points: points
        });
    }
    render() {
        let styles = {
            createFight: {
                maxWidth: '900px'
            }
        }
        return (
            <div className="create-fight" style={styles.createFight}>
                <div className="row">
                    <div className="col-md-6">
                        <p>You are {this.props.initialData.editing ? 'editing a' : 'creating a new'} fight</p>
                        <div className="form-group">
                            <label>Number:</label>
                            <input
                                id="number"
                                name="number"
                                type="number"
                                placeholder="Set a fight number"
                                value={this.state.number}
                                onChange={this.handleNumberChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Class:</label>
                            <select
                                id="fightClassId"
                                name="fightClassId"
                                value={this.state.fightClass ? this.state.fightClass.fightClassId : ''}
                                onChange={this.handleFightClassChange}
                                className="form-control">
                                <option value="0">--select--</option>
                                {this.fightClasses.map((fightClass) => {
                                    return (
                                        <option key={fightClass.fightClassId} value={fightClass.fightClassId}>{fightClass.description}</option>);
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Weight class:</label>
                            <select
                                id="weightClassId"
                                name="weightClassId"
                                value={this.state.weightClass ? this.state.weightClass.weightClassId : ''}
                                onChange={this.handleWeightClassChange}
                                className="form-control">
                                <option>--select--</option>
                                {this.weightClasses.map((weightClass) => {
                                    return (
                                        <option key={weightClass.weightClassId} value={weightClass.weightClassId}>{weightClass.description}</option>);
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Fighter
                            name="fighter1"
                            clubs={this.clubs}
                            club={this.state.fighter1Club}
                            fighter={this.state.fighter1}
                            onClubChange={this.handleFighter1ClubChange}
                            onFighterChange={this.handleFighter1Change}>
                            <p>Fighter 1</p>
                        </Fighter>
                    </div>
                    <div className="col-md-6">
                        <Fighter
                            name="fighter2"
                            clubs={this.clubs}
                            club={this.state.fighter2Club}
                            fighter={this.state.fighter2}
                            onClubChange={this.handleFighter2ClubChange}
                            onFighterChange={this.handleFighter2Change}>
                            <p>Fighter 2</p>
                        </Fighter>
                    </div>
                </div>
                {<p>1: {this.state.fighter1 ? this.state.fighter1.firstname : null}</p>}
                {<p>2: {this.state.fighter2 ? this.state.fighter2.firstname : null}</p>}
                <div className="row">
                    <Result
                        endings={this.endings}
                        ending={this.state.ending}
                        winner={this.state.winner}
                        fighter1={this.state.fighter1}
                        fighter2={this.state.fighter2}
                        fighter1Points={this.state.fighter1Points} 
                        fighter2Points={this.state.fighter2Points}
                        onEndingChange={this.handleEndingChange}
                        onWinnerChange={this.handleWinnerChange}
                        onFighter1PointsChange={this.handleFighter1PointsChange}
                        onFighter2PointsChange={this.handleFighter2PointsChange} />
                </div>
                {this.state.winner &&
                    <p>{this.state.winner.userFirstName}</p>
                }
            </div>);
    }
}
