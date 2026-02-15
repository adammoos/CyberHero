import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface GameSceneProps {
  currentLevel: number;
  onDoorChoice: (door: 'A' | 'B' | 'C') => void;
  playerPosition: THREE.Vector3;
  setPlayerPosition: (pos: THREE.Vector3) => void;
  isFalling: boolean;
  resetPlayer: boolean;
  onResetComplete: () => void;
}

export function GameScene({
  currentLevel,
  onDoorChoice,
  playerPosition,
  setPlayerPosition,
  isFalling,
  resetPlayer,
  onResetComplete
}: GameSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const playerRef = useRef<THREE.Mesh | null>(null);
  const doorsRef = useRef<{ A: THREE.Mesh; B: THREE.Mesh; C: THREE.Mesh } | null>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const velocityRef = useRef(new THREE.Vector3());
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickDirection, setJoystickDirection] = useState(() => new THREE.Vector2());
  const playerGroupRef = useRef<THREE.Group | null>(null);
  const walkAnimationRef = useRef(0);
  const leftLegRef = useRef<THREE.Mesh | null>(null);
  const rightLegRef = useRef<THREE.Mesh | null>(null);
  const leftArmRef = useRef<THREE.Mesh | null>(null);
  const rightArmRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    scene.fog = new THREE.Fog(0x0a0a1a, 10, 50);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 15);
    camera.lookAt(0, 2, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x4a90e2, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x00ffff, 1);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.camera.left = -20;
    mainLight.shadow.camera.right = 20;
    mainLight.shadow.camera.top = 20;
    mainLight.shadow.camera.bottom = -20;
    scene.add(mainLight);

    const accentLight1 = new THREE.PointLight(0xff00ff, 1, 20);
    accentLight1.position.set(-8, 3, 0);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x00ffff, 1, 20);
    accentLight2.position.set(8, 3, 0);
    scene.add(accentLight2);

    // Platform - Enhanced version with borders and pattern
    const platformGroup = new THREE.Group();
    
    // Main platform
    const platformGeometry = new THREE.BoxGeometry(30, 0.5, 20);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d1b2a,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x001a33,
      emissiveIntensity: 0.2
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -0.25;
    platform.receiveShadow = true;
    platformGroup.add(platform);

    // Platform edges with neon glow
    const edgeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    });
    const edgeThickness = 0.1;
    
    // Front edge
    const frontEdge = new THREE.Mesh(
      new THREE.BoxGeometry(30, 0.6, edgeThickness),
      edgeMaterial
    );
    frontEdge.position.set(0, -0.25, 10);
    platformGroup.add(frontEdge);
    
    // Back edge
    const backEdge = new THREE.Mesh(
      new THREE.BoxGeometry(30, 0.6, edgeThickness),
      edgeMaterial
    );
    backEdge.position.set(0, -0.25, -10);
    platformGroup.add(backEdge);
    
    // Left edge
    const leftEdge = new THREE.Mesh(
      new THREE.BoxGeometry(edgeThickness, 0.6, 20),
      edgeMaterial
    );
    leftEdge.position.set(-15, -0.25, 0);
    platformGroup.add(leftEdge);
    
    // Right edge
    const rightEdge = new THREE.Mesh(
      new THREE.BoxGeometry(edgeThickness, 0.6, 20),
      edgeMaterial
    );
    rightEdge.position.set(15, -0.25, 0);
    platformGroup.add(rightEdge);

    scene.add(platformGroup);

    // Grid effect on platform - enhanced
    const gridHelper = new THREE.GridHelper(30, 30, 0x00ffff, 0x1a3a5a);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Add hexagonal pattern overlay
    for (let i = 0; i < 15; i++) {
      const hexGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.05, 6);
      const hexMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.05,
        wireframe: true
      });
      const hex = new THREE.Mesh(hexGeometry, hexMaterial);
      hex.position.set(
        (Math.random() - 0.5) * 28,
        0.05,
        (Math.random() - 0.5) * 18
      );
      hex.rotation.x = Math.PI / 2;
      scene.add(hex);
    }

    // Create Human Player Model
    const playerGroup = new THREE.Group();
    playerGroup.position.copy(playerPosition);
    playerGroupRef.current = playerGroup;

    // Skin material
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffdbac,
      metalness: 0.1,
      roughness: 0.8
    });

    // Suit material
    const suitMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.2,
      metalness: 0.7,
      roughness: 0.3
    });

    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    playerGroup.add(head);

    // Eyes
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 1.55, 0.2);
    playerGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.1, 1.55, 0.2);
    playerGroup.add(rightEye);

    // Torso
    const torsoGeometry = new THREE.BoxGeometry(0.5, 0.7, 0.3);
    const torso = new THREE.Mesh(torsoGeometry, suitMaterial);
    torso.position.y = 0.85;
    torso.castShadow = true;
    playerGroup.add(torso);

    // Arms
    const armGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.15);
    
    const leftArm = new THREE.Mesh(armGeometry, suitMaterial);
    leftArm.position.set(-0.35, 0.85, 0);
    leftArm.castShadow = true;
    playerGroup.add(leftArm);
    leftArmRef.current = leftArm;
    
    const rightArm = new THREE.Mesh(armGeometry, suitMaterial);
    rightArm.position.set(0.35, 0.85, 0);
    rightArm.castShadow = true;
    playerGroup.add(rightArm);
    rightArmRef.current = rightArm;

    // Legs
    const legGeometry = new THREE.BoxGeometry(0.18, 0.6, 0.18);
    
    const leftLeg = new THREE.Mesh(legGeometry, suitMaterial);
    leftLeg.position.set(-0.15, 0.2, 0);
    leftLeg.castShadow = true;
    playerGroup.add(leftLeg);
    leftLegRef.current = leftLeg;
    
    const rightLeg = new THREE.Mesh(legGeometry, suitMaterial);
    rightLeg.position.set(0.15, 0.2, 0);
    rightLeg.castShadow = true;
    playerGroup.add(rightLeg);
    rightLegRef.current = rightLeg;

    // Feet
    const footGeometry = new THREE.BoxGeometry(0.18, 0.1, 0.25);
    const footMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a3a,
      metalness: 0.6,
      roughness: 0.4
    });
    
    const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
    leftFoot.position.set(-0.15, -0.05, 0.05);
    leftFoot.castShadow = true;
    playerGroup.add(leftFoot);
    
    const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
    rightFoot.position.set(0.15, -0.05, 0.05);
    rightFoot.castShadow = true;
    playerGroup.add(rightFoot);

    // Glowing aura around player
    const auraGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const auraMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.1,
      wireframe: true
    });
    const aura = new THREE.Mesh(auraGeometry, auraMaterial);
    aura.position.y = 0.7;
    playerGroup.add(aura);

    scene.add(playerGroup);
    playerRef.current = playerGroup as any;

    // Create doors
    const createDoor = (label: string, position: THREE.Vector3, color: number) => {
      const group = new THREE.Group();
      
      // Door frame
      const frameGeometry = new THREE.BoxGeometry(3, 4, 0.3);
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x0d1b2a,
        metalness: 0.9,
        roughness: 0.1
      });
      const frame = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.castShadow = true;
      group.add(frame);

      // Door panel
      const doorGeometry = new THREE.BoxGeometry(2.6, 3.6, 0.2);
      const doorMaterial = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.4,
        metalness: 0.6,
        roughness: 0.3,
        transparent: true,
        opacity: 0.8
      });
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.position.z = 0.1;
      group.add(door);

      // Label
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#00ffff';
      ctx.font = 'bold 120px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 128, 128);

      const labelTexture = new THREE.CanvasTexture(canvas);
      const labelMaterial = new THREE.MeshBasicMaterial({
        map: labelTexture,
        transparent: true
      });
      const labelGeometry = new THREE.PlaneGeometry(1, 1);
      const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
      labelMesh.position.set(0, 0, 0.2);
      group.add(labelMesh);

      // Glow effect
      const glowGeometry = new THREE.PlaneGeometry(3.5, 4.5);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.z = -0.2;
      group.add(glow);

      group.position.copy(position);
      return group;
    };

    const doorA = createDoor('A', new THREE.Vector3(-6, 2, -5), 0xff0080);
    const doorB = createDoor('B', new THREE.Vector3(0, 2, -5), 0x00ff80);
    const doorC = createDoor('C', new THREE.Vector3(6, 2, -5), 0x8000ff);
    
    scene.add(doorA);
    scene.add(doorB);
    scene.add(doorC);

    doorsRef.current = {
      A: doorA as THREE.Mesh,
      B: doorB as THREE.Mesh,
      C: doorC as THREE.Mesh
    };

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (playerRef.current && !isFalling) {
        // Use higher speed for mobile/joystick
        let speed = 0.15;
        if (joystickActive && (joystickDirection.x !== 0 || joystickDirection.y !== 0)) {
          speed = 0.35; // Increase speed for joystick/mobile
        }
        const moveVector = new THREE.Vector3();

        // Keyboard input
        if (keysPressed.current['w']) moveVector.z -= 1;
        if (keysPressed.current['s']) moveVector.z += 1;
        if (keysPressed.current['a']) moveVector.x -= 1;
        if (keysPressed.current['d']) moveVector.x += 1;

        // Joystick input
        if (joystickActive) {
          moveVector.x += joystickDirection.x;
          moveVector.z += joystickDirection.y;
        }

        // Debug: log moveVector and joystick
        if (joystickActive && (joystickDirection.x !== 0 || joystickDirection.y !== 0)) {
          console.log('moveVector', moveVector, 'joystickDirection', joystickDirection);
        }

        if (moveVector.length() > 0) {
          moveVector.normalize().multiplyScalar(speed);
          playerRef.current.position.add(moveVector);

          // Constrain to platform
          playerRef.current.position.x = Math.max(-14, Math.min(14, playerRef.current.position.x));
          playerRef.current.position.z = Math.max(-9, Math.min(9, playerRef.current.position.z));

          setPlayerPosition(playerRef.current.position.clone());

          // Walking animation
          walkAnimationRef.current += 0.15;
          if (leftLegRef.current && rightLegRef.current && leftArmRef.current && rightArmRef.current) {
            const swing = Math.sin(walkAnimationRef.current) * 0.3;
            leftLegRef.current.rotation.x = swing;
            rightLegRef.current.rotation.x = -swing;
            leftArmRef.current.rotation.x = -swing * 0.5;
            rightArmRef.current.rotation.x = swing * 0.5;
          }

          // Rotate player to face movement direction
          const angle = Math.atan2(moveVector.x, moveVector.z);
          playerRef.current.rotation.y = angle;

          // Check door collisions
          const playerPos = playerRef.current.position;
          const doorDistance = 2;

          if (playerPos.z < -3 && Math.abs(playerPos.z - (-5)) < doorDistance) {
            if (Math.abs(playerPos.x - (-6)) < 1.5) {
              onDoorChoice('A');
            } else if (Math.abs(playerPos.x - 0) < 1.5) {
              onDoorChoice('B');
            } else if (Math.abs(playerPos.x - 6) < 1.5) {
              onDoorChoice('C');
            }
          }
        }
      }

      // Falling animation
      if (isFalling && playerRef.current) {
        velocityRef.current.y -= 0.02;
        playerRef.current.position.add(velocityRef.current);
        playerRef.current.rotation.x += 0.1;
        playerRef.current.rotation.z += 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [currentLevel, isFalling, joystickActive, joystickDirection]);

  // Reset player position
  useEffect(() => {
    if (resetPlayer && playerRef.current) {
      playerRef.current.position.set(0, 1, 8);
      playerRef.current.rotation.set(0, 0, 0);
      velocityRef.current.set(0, 0, 0);
      setPlayerPosition(new THREE.Vector3(0, 1, 8));
      onResetComplete();
    }
  }, [resetPlayer]);

  return (
    <div ref={mountRef} className="w-full h-full relative">
      {/* Virtual Joystick for mobile */}
      <div className="absolute bottom-8 left-8 md:hidden">
        <div
          className="w-32 h-32 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 relative"
          onTouchStart={(e) => {
            setJoystickActive(true);
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (touch.clientX - centerX) / (rect.width / 2);
            const deltaY = (touch.clientY - centerY) / (rect.height / 2);
            setJoystickDirection(new THREE.Vector2(deltaX, deltaY));
            // Debug output
            console.log('TouchStart', { deltaX, deltaY });
          }}
          onTouchMove={(e) => {
            if (!joystickActive) return;
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (touch.clientX - centerX) / (rect.width / 2);
            const deltaY = (touch.clientY - centerY) / (rect.height / 2);
            setJoystickDirection(new THREE.Vector2(
              Math.max(-1, Math.min(1, deltaX)),
              Math.max(-1, Math.min(1, deltaY))
            ));
            // Debug output
            console.log('TouchMove', { deltaX, deltaY });
          }}
          onTouchEnd={() => {
            setJoystickActive(false);
            setJoystickDirection(new THREE.Vector2(0, 0));
            // Debug output
            console.log('TouchEnd');
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cyan-500/50 pointer-events-none" />
        </div>
        <div className="text-cyan-400 text-xs text-center mt-2">MOVE</div>
        {/* Debug joystick direction */}
        <div className="text-cyan-400 text-xs mt-2">
          Joystick: {joystickDirection.x.toFixed(2)}, {joystickDirection.y.toFixed(2)}
        </div>
      </div>


    </div>
  );
}
