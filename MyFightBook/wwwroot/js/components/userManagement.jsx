function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        //this.handleIsManagerChange = this.handleIsManagerChange.bind(this);
        this.state = {
            editingUser: null,
            value: '',
            suggestions: []
        }
    }

    getUser(userId) {
        
    }

    loadSuggestions(value) {
        // Cancel the previous request
        if (this.lastRequestId !== null) {
            clearTimeout(this.lastRequestId);
        }

        this.setState({
            isLoading: true
        });

        this.lastRequestId = fetch(this.props.autosuggestUrl + '?s=' + value)
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    isLoading: false,
                    suggestions: data
                });
            });
    }
    
    render() {
        const { value, suggestions } = this.state;
        
        const getSuggestionValue = suggestion => suggestion.username;

        // Use your imagination to render suggestions.
        const renderSuggestion = suggestion => (
            <div>
                {suggestion.username}
            </div>
        );

        this.onChange = (event, { newValue }) => {
            this.setState({
                value: newValue
            });
        };

        // Autosuggest will call this function every time you need to update suggestions.
        // You already implemented this logic above, so just use it.
        this.onSuggestionsFetchRequested = ({ value }) => {
            this.loadSuggestions(value);
        };

        // Autosuggest will call this function every time you need to clear suggestions.
        this.onSuggestionsClearRequested = () => {
            this.setState({
                suggestions: []
            });
        };

        this.onSuggestionSelected = (e, {suggestion}) => {
            console.log('selected', suggestion.userId);
            fetch(this.props.getUserUrl + '?userId=' + suggestion.userId)
                .then((resp) => resp.json())
                .then((data) => {
                    this.setState({
                        editingUser: data
                    });

                    console.log(this.state.editingUser);
                });
        };

        this.handleIsManagerChange = (value) => {
            this.setState((prevState) => {
                var s = prevState;
                s.editingUser.isManager = value;
                return s;
            });
        }

        const inputProps = {
            placeholder: 'Type a username',
            value,
            onChange: this.onChange
        };

        return (
            <div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="form-control" />
                    </div>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={this.onSuggestionSelected}/>

                    {this.state.editingUser &&
                        <UserEditor user={this.state.editingUser} onIsManagerChange={this.handleIsManagerChange} />
                    }
                </div>
            </div>
        );
    }
}

class UserEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleIsManagerChange = this.handleIsManagerChange.bind(this);
    }

    handleIsManagerChange(e) {
        console.log(e.target.checked);
        this.props.onIsManagerChange(e.target.checked);
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Manager</label>
                    
                    <input
                        checked={this.props.user.isManager}
                        onChange={this.handleIsManagerChange}
                        type="checkbox"
                        className="form-control" />
                    
                </div>
            </div>
        );
    }
}
//ReactDOM.render(<UserManagement autosuggestUrl="/admin/users/queryUser" getUserUrl="/admin/users/getUser" />, document.getElementById('test'))