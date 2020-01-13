import React from 'react';
import './App.css';
import Board from './components/Board';
import Home from './components/pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageNotFound from './components/pages/PageNotFound';
import { boardsRef } from './firebase';

class App extends React.Component{
  state = {
    boards: []
  }
 
  getBoards = async userId => {
    try{
      this.setState({ boards: [] })
      const boards = await boardsRef.get()
      boards.forEach(board => {
        const data = board.data().board 
        const boardObj = {
          id: board.id,
          ...data 
        }
        this.setState({ boards: [...this.state.boards, boardObj] })
      })
    } catch (error) {
      console.log('Error getting boards', error)
    }
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
                  getBoards={this.getBoards}
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
