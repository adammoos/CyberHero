import React, { useState } from 'react';
import * as THREE from 'three';
import { GameScene } from './components/GameScene';
import { GameHUD } from './components/GameHUD';
import { ExplanationScreen } from './components/ExplanationScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { gameLevels } from './game-data';
import { Shield } from 'lucide-react';
import { playFailSound, playSuccessSound, playFallingVoice } from './utils/sounds';

type GameState = 'menu' | 'playing' | 'explanation' | 'success' | 'victory';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(new THREE.Vector3(0, 1, 8));
  const [isFalling, setIsFalling] = useState(false);
  const [resetPlayer, setResetPlayer] = useState(false);
  const [attemptsBlocked, setAttemptsBlocked] = useState(0);
  const [wrongChoice, setWrongChoice] = useState<'A' | 'B' | 'C' | null>(null);

  const currentLevel = gameLevels[currentLevelIndex];

  const handleStartGame = () => {
    setGameState('playing');
    setCurrentLevelIndex(0);
    setAttemptsBlocked(0);
    setPlayerPosition(new THREE.Vector3(0, 1, 8));
    setIsFalling(false);
    setResetPlayer(false);
  };

  const handleDoorChoice = (door: 'A' | 'B' | 'C') => {
    if (isFalling || gameState !== 'playing') return;

    if (door === currentLevel.correctDoor) {
      // Correct choice - play success sound and show success screen
      playSuccessSound();
      
      if (currentLevelIndex < gameLevels.length - 1) {
        // Show success screen before next level
        setGameState('success');
      } else {
        // All levels completed - victory!
        setGameState('victory');
      }
    } else {
      // Wrong choice - player falls
      setWrongChoice(door);
      setIsFalling(true);
      setAttemptsBlocked(attemptsBlocked + 1);
      playFailSound();
      playFallingVoice();
      
      // Show explanation after a short delay
      setTimeout(() => {
        setGameState('explanation');
      }, 1500);
    }
  };

  const handleNextLevel = () => {
    setCurrentLevelIndex(currentLevelIndex + 1);
    setPlayerPosition(new THREE.Vector3(0, 1, 8));
    setGameState('playing');
    setResetPlayer(true);
  };

  const handleRespawn = () => {
    setGameState('playing');
    setIsFalling(false);
    setWrongChoice(null);
    setResetPlayer(true);
  };

  const handleReplay = () => {
    handleStartGame();
  };

  const handleResetComplete = () => {
    setResetPlayer(false);
  };

  if (gameState === 'menu') {
    return (
      handleStartGame() 
    );
  }

  if (gameState === 'victory') {
    return (
      <VictoryScreen
        attemptsBlocked={attemptsBlocked}
        totalLevels={gameLevels.length}
        onReplay={handleReplay}
      />
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gray-900">
      {/* 3D Game Scene */}
      <GameScene
        currentLevel={currentLevelIndex}
        onDoorChoice={handleDoorChoice}
        playerPosition={playerPosition}
        setPlayerPosition={setPlayerPosition}
        isFalling={isFalling}
        resetPlayer={resetPlayer}
        onResetComplete={handleResetComplete}
      />

      {/* Game HUD */}
      {gameState === 'playing' && (
        <GameHUD
          currentLevel={currentLevelIndex + 1}
          totalLevels={gameLevels.length}
          level={currentLevel}
        />
      )}

      {/* Explanation Screen */}
      {gameState === 'explanation' && (
        <ExplanationScreen
          title={currentLevel.explanation.title}
          description={currentLevel.explanation.description}
          redFlags={currentLevel.explanation.redFlags}
          tip={currentLevel.explanation.tip}
          onRespawn={handleRespawn}
        />
      )}

      {/* Success Screen */}
      {gameState === 'success' && (
        <SuccessScreen
          onContinue={handleNextLevel}
        />
      )}
    </div>
  );
}