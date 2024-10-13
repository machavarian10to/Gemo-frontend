export default function getUserLevel(levelType) {
  const userLevelMap = {
    novice: '#32cd32',
    home: '#ffd700',
    enthusiast: '#ff7f50',
    gourmet: '#4682b4',
    explorer: '#6a5acd',
    professional: '#808080',
    master: '#ffa500',
  };
  return userLevelMap[levelType];
}
