function getRecommendations(product, type) {
  const colorMap = {
    black: ["white", "gold", "red", "silver"],
    white: ["black", "blue", "gold"],
    blue: ["white", "black", "silver"],
    red: ["black", "white"],
    gold: ["black", "white"],
    silver: ["black", "blue"]
  };

  return PRODUCTS.filter(p => {
    if (p.type !== type) return false;

    const allowedColors = colorMap[product.color] || [];

    return (
      allowedColors.includes(p.color) ||
      p.occasion === product.occasion
    );
  });
}