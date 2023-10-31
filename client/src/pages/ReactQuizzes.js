import React, { Component } from 'react';

class ReactQuizzes extends Component {

    // Initialize the state
    constructor(props){
      super(props);
      this.state = {
        list: []
      }
    }

    componentDidMount() {
      this.getList();
    }
  
    // Retrieves the list of items from the Express app
    getList = () => {
      fetch('/quizzes', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      })
      .then(res => console.log(res.json()))
      // .then(res => res.json())
      // .then(list => this.setState({ list }))
    }

    render () {
      const { list } = this.state
      return (
        <div className="App">
          <h1>List of Items</h1>
          {/* Check to see if any items are found*/}
          {list.length ? (
            <div>
              {/* Render the list of items */}
              {list.map((item) => {
                return(
                  <div>
                    {item}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <h2>No List Items Found</h2>
            </div>
          )
        }
        </div>
      );
    }
  }
  
  export default ReactQuizzes;