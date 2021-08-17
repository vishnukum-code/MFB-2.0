class Fighter extends React.Component {
    constructor(props) {
        super(props);
        this.handleClubChange = this.handleClubChange.bind(this);
        this.handleFighterChange = this.handleFighterChange.bind(this);
    }
    handleClubChange(e) {
        let clubId = parseInt(e.target.value);
        this.props.onClubChange(clubId);
    }
    handleFighterChange(e) {
        let fighterId = parseInt(e.target.value);
        this.props.onFighterChange(fighterId);
    }
    render() {
        return (
            <div>
                {this.props.children}
                <div className="form-group">
                    <label>Club</label>
                    <select
                        id={this.props.name + 'ClubId'}
                        name={this.props.name + 'ClubId'}
                        value={this.props.club ? this.props.club.clubId : ''}
                        onChange={this.handleClubChange}
                        className="form-control">
                        <option>--select--</option>
                        {this.props.clubs.map((club) => {
                            return (
                                <option key={club.clubId} value={club.clubId}>{club.name}</option>);
                        })}
                    </select>
                </div>
                {this.props.club &&
                    <div className="form-group">
                        <label>Fighter</label>
                        <select
                            id={this.props.name + 'UserId'}
                            name={this.props.name + 'UserId'}
                            value={this.props.fighter ? this.props.fighter.userId : ''}
                            onChange={this.handleFighterChange}
                            className="form-control">
                            <option>--select--</option>
                            {this.props.club.fighters.map((fighter) => {
                                return true ? (
                                    <option key={fighter.userId} value={fighter.userId}>{fighter.firstname} {fighter.lastname}</option>
                                ) : null;
                            })}
                        </select>
                    </div>
                }
            </div>);
    }
}