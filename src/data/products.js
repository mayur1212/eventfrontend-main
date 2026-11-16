// Static catalogue. Replace this array with API data when the shop is connected.
const products = [
  { id: 'dc-motors', name: 'DC Motors', category: 'Motion', kind: 'motor', color: 'blue', tag: 'Build momentum', description: 'Power your next robot with the parts that get it moving.', use: 'Robot चालवण्यासाठी', features: ['Rotational motion', 'Drivetrain projects', 'Robot movement'] },
  { id: 'servo-motors', name: 'Servo Motors', category: 'Motion', kind: 'servo', color: 'purple', tag: 'Precision in motion', description: 'Bring controlled movement to arms, grippers and mechanisms.', use: 'Robot चे हात किंवा mechanism हलवण्यासाठी', features: ['Controlled positioning', 'Robotic arms', 'Gripper mechanisms'] },
  { id: 'wheels', name: 'Wheels', category: 'Motion', kind: 'wheel', color: 'orange', tag: 'Keep ideas rolling', description: 'Give your robot a foundation for its next adventure.', use: 'Robot पुढे-मागे हलवण्यासाठी', features: ['Robot drivetrains', 'Forward and reverse movement', 'Mobile robot projects'] },
  { id: 'gears-shafts', name: 'Gears & Shafts', category: 'Structure', kind: 'gear', color: 'teal', tag: 'Make the connection', description: 'Connect movement from your motor to your mechanism.', use: 'Motor ची power transfer करण्यासाठी', features: ['Power transmission', 'Mechanical assemblies', 'Motion transfer'] },
  { id: 'control-hub', name: 'Control Hub', category: 'Electronics', kind: 'hub', color: 'blue', tag: 'The brain of your build', description: 'Connect your ideas, code and robot in one place.', use: 'Robot control आणि programming साठी', features: ['Robot control', 'Programming projects', 'Electronic integration'] },
  { id: 'sensors', name: 'Sensors', category: 'Electronics', kind: 'sensor', color: 'pink', tag: 'Sense. Learn. Respond.', description: 'Help your robot discover and respond to the world around it.', use: 'Color, touch व इतर गोष्टी detect करण्यासाठी', features: ['Environmental detection', 'Interactive robots', 'Automation projects'] },
];

export default products;
