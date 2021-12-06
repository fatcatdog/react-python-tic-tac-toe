import React, { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import { API, Auth } from 'aws-amplify'
import '../App.css';
import { Link } from "react-router-dom";

function Game({ signOut, user }) {
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [gameOver, setGameOver] = useState(false);
    const [currentBoard, setCurrentBoard] = useState(new Array(9));
    const [moveCount, setMoveCount] = useState(0); 

    // useEffect(() => {
    //     fetch('https://mqsejae34a.execute-api.us-east-1.amazonaws.com/dev').then(res => res.json()).then(data => {
    //         console.log({data);
    //     });
    // }, []);

    // async function callApi(){
    //     const user = await Auth.currentAuthenticatedUser()
    //     const token = user.signInUserSession.idToken.jwtToken

    //     console.log({token})

    //     const requestInfo = {
    //         headers: {
    //             Authorization: token
    //         }
    //     }

    //     const data = await API.get('ticTacToeUsersApi', '/users', requestInfo)
    //     console.log({data})
    // }

    function toggleCurrentPlayer(){
        if(currentPlayer === ("X")) {
            setCurrentPlayer("O")
        } else {
            setCurrentPlayer("X")
        }
    }

    function checkIfGameOver(newBoard){
        let winningCombinations = [
            [0, 1 , 2], 
            [3, 4, 5], 
            [6, 7,8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], 
            [0, 4, 8],
            [2, 4, 6]
        ]

        let currPlayer = currentPlayer;

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (newBoard[a] === currPlayer && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
              return true;
            }
          }
          return false;
    }

    function tryMakeMove(index) {
        let validMove = checkIfSpaceOpen(index)

        if(gameOver) {
            alert("Game is already over! Please refresh to play again...")
            return;
        }

        if(validMove) {
            let newBoard = [...currentBoard]
            newBoard[index] = currentPlayer
            setCurrentBoard(newBoard);

            let check = checkIfGameOver(newBoard);

            if(moveCount == 9) {
                alert("Looks like a Draw! Please try play again if you want to...")
            } 

            if(check === true) {
                setGameOver(true)
            } else {
                toggleCurrentPlayer();        
                setMoveCount(moveCount + 1)    
            }

        } else {
            alert("Invalid Move! Please try pick a different spot to click...")
        }

        // console.log(validMove)
        // console.log(index)
        // console.log(currentPlayer)
    }

    function checkIfSpaceOpen(index){
        if(currentBoard[index] == undefined) {
            return true; 
        } else {
            return false;
        }
    }

    function renderBox(index){
        if(currentBoard[index] == undefined){
            return "-";
        } else {
            return currentBoard[index];
        }
    }

    function renderPlayerGameOverInfo(){
        if(gameOver){
            return (
                <div>
                <p>{currentPlayer} Wins!</p>
                </div>
            );
        } else if (moveCount > 8) {
            return (
                <div>
                <p>We have a Draw!</p>
                </div>
            );
        } else {
            return (
                <div>
                <p>Current Player = {currentPlayer}</p>
                </div>
            );
        }
    }

    return(
        <div className="App">
    
      <header className="App-header">
        <p><Link to="/">Home</Link></p>

        <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>


          <h1>Tic Tac Toe</h1>

          {/* <button onClick={callApi}>Call API</button> */}


          {renderPlayerGameOverInfo()}
          <table>
            <tbody>
                <tr>
                    <th><button onClick={(e) => tryMakeMove(0)}>{renderBox(0)}</button></th>
                    <th><button onClick={(e) => tryMakeMove(1)}>{renderBox(1)}</button></th>
                    <th><button onClick={(e) => tryMakeMove(2)}>{renderBox(2)}</button></th>
                </tr>
                <tr>
                    <th><button onClick={(e) => tryMakeMove(3)}>{renderBox(3)}</button></th>
                    <th><button onClick={(e) => tryMakeMove(4)}>{renderBox(4)}</button></th>
                    <th><button onClick={(e) => tryMakeMove(5)}>{renderBox(5)}</button></th>
                </tr>
                <tr>                
                    <th><button onClick={(e) => tryMakeMove(6)}>{renderBox(6)}</button></th>
                    <th><button onClick={(e) => tryMakeMove(7)}>{renderBox(7)}</button></th>
                    <th><button onClick={(e) => tryMakeMove(8)}>{renderBox(8)}</button></th>
                </tr>
            </tbody>
        </table>
        </header>
      </div>
    )
  }

export default withAuthenticator(Game);
