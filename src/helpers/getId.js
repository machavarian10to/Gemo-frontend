export default function getId() {
  return Math.random().toString(36).substr(2, 9);
}
