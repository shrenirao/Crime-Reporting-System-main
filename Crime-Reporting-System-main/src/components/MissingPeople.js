import * as firebase from 'firebase';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Search } from '../store/action/auth';
import { connect } from 'react-redux';

const styles = {
  page: {
    padding: '40px 20px',
    background: 'linear-gradient(to right, #f9f9f9, #e0eafc)',
    minHeight: '100vh',
  },
  heading: {
    color: '#3f51b5',
    marginBottom: 30,
  },
  form: {
    marginBottom: 40,
  },
  select: {
    padding: '10px 15px',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    minWidth: 200,
  },
  button: {
    padding: '10px 20px',
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: '#3f51b5',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: '10px auto',
    maxWidth: 500,
    borderRadius: 10,
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
};

class MissingPeopleList extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      arr: [],
    };
    this.onSearch = this.onSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ city: e.target.value });
  }

  onSearch(e) {
    e.preventDefault();
    const ref = firebase.database().ref().child('/missingPeople');
    const city = this.state.city;

    ref.orderByChild('city').equalTo(city).once('value', (snapshot) => {
      const arr = [];
      snapshot.forEach((childSnapshot) => {
        arr.push(childSnapshot.val());
      });

      this.props.searchPeople(arr);
      this.setState({ arr });
    });
  }

  render() {
    return (
      <div style={styles.page}>
        <center>
          <h1 style={styles.heading}>Missing People List</h1>

          <form style={styles.form} onSubmit={this.onSearch}>
            <select
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              required
              style={styles.select}
            >
              <option value="">Select City</option>
              <option value="California">California</option>
              <option value="Florida">Florida</option>
              <option value="New Jersey">New Jersey</option>
              <option value="New York">New York</option>
              <option value="Ohio">Ohio</option>
              <option value="Texas">Texas</option>
              <option value="Washington">Washington</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="New Mexico">New Mexico</option>
              <option value="Oxford">Oxford</option>
            </select>
            <button type="submit" style={styles.button}>Find</button>
          </form>

          {this.state.arr.length === 0 ? (
            <p>No data found for the selected city.</p>
          ) : (
            this.state.arr.map((m, i) => (
              <Paper key={i} style={styles.card} zDepth={3}>
                <p><strong>Name:</strong> {m.missingPersonName}</p>
                <p><strong>City:</strong> {m.city}</p>
                <p><strong>Gender:</strong> {m.gender}</p>
                <p><strong>Age:</strong> {m.age}</p>
                <p><strong>Details:</strong> {m.missingDetails}</p>
                <p><strong>Informer Name:</strong> {m.informerName}</p>
                <p><strong>Informer Mobile:</strong> {m.informerMobile}</p>
              </Paper>
            ))
          )}
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  storeReducer: state.MissingPeopleReducer,
});

const mapDispatchToProps = (dispatch) => ({
  searchPeople: (data) => dispatch(Search(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MissingPeopleList);
