module.exports = function(ent1, ent2) {
  return (
    ent1.x <= (ent2.x + ent2.width) &&
    ent2.x <= (ent1.x + ent1.width) &&
    ent1.y <= (ent2.y + ent2.height) &&
    ent2.y <= (ent1.y + ent1.height)
  );
}
