import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';
import DisplayQuestion from './components/DisplayQuestion';

function App() {
  const [players, setPlayers] = useState([]);

  const updatePlayerScores = (name, score) => {
    setPlayers((prevPlayers) => [...prevPlayers, { name, score }]);
  };

  return (
    <Router>
      <div className="app-container">
        <Link to="/">
          <img src='https://res.cloudinary.com/dq1ktqbtb/image/upload/v1728371207/KBC_logo_pnumxr.png' alt='' className='kbcLogo' />
        </Link>
        <div className='appBg-container'>
          <Routes>
            <Route
              path="/"
              element={
                <div className='qr-container'>
                  <QRCodeCanvas
                    value="http://192.168.209.28:3000/quizpage"
                    size={200}
                  />
                  <p className='description'>Scan the QR code to start the quiz on your mobile device.</p>

                  <h2 className='leaderBoardHeading'>Leaderboard</h2>
                  <ul className='plaersList'>
                    {players.length > 0 ? (
                      players.map((player, index) => (
                        <li key={index} className='leaderBoardText'>
                          {player.name}: {player.score} points
                        </li>
                      ))
                    ) : (
                      <p className='description'>No players yet. Start the quiz to see results here!</p>
                    )}
                  </ul>

                  <Link to="/quizpage">
                    <button className='startButton'>Start Quiz</button>
                  </Link>
                </div>
              }
            />

            <Route
              path="/quizpage"
              element={<DisplayQuestion updatePlayerScores={updatePlayerScores} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


