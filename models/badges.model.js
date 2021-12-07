module.exports = mongoose => {
    const Badges = mongoose.model(
      "badges",
      mongoose.Schema(
        {
          title: String,
        },
      )
    );
  
    return Badges;
  };