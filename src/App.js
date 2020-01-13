import React from 'react';
import './App.css';
import Board from './components/Board';
import data from './sampleData';
import Home from './components/pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageNotFound from './components/pages/PageNotFound';
import { boardsRef } from './firebase';

class App extends React.Component{
  state = {
    boards: []
  }
  componentDidMount() {
    this.setState({ boards: data.boards })
  }
  createNewBoard = async board => {
    try { 
      const newBoard = await boardsRef.add({ board })
      const boardObj = {
        id: newBoard.id,
        ...board
      }
      this.setState({ boards: [...this.state.boards, boardObj] })
    } catch(error) {
        console.error('Error creating new board: ', error)
    }
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path='/:userId/boards'
              render={(props) => (
                <Home 
                  {...props}
                  boards={this.state.boards} 
                  createNewBoard={this.createNewBoard} 
                />
              )}
            />
            <Route path='/board/:boardId' 
              render={props => (
                <Board 
                  {...props}
                />
              )}
            />
            <Route component={PageNotFound} />
            
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
