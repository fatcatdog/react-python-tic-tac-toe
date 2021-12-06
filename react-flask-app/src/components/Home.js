import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Home() {

    const leaderboard = [
        ["Jacob", 10, 5, 1],
        ["Dylan", 6, 12, 2],
        ["Alice", 8, 1, 3]
    ]

    const listItems = leaderboard.map((user) =>
    <tr>
        <th>{user[0]}</th>
        <th>{user[1]}</th>
        <th>{user[2]}</th>
        <th>{user[3]}</th>
    </tr>
    );

    return (
        <div>
            <h1>Home</h1>
            <p><Link to="/game">Play a Game</Link></p>
            <h1>Leaderboard</h1>
            <table>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Rank</th>
                    </tr>
                    {listItems}
                </tbody>
            </table>
        </div>
    )
}

export default Home;

