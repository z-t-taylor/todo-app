import "./BadgeCard.css";

const BadgeCard = ({ badge }) => {
  return (
    <div className="badge-card">
      <img className="badge-card-img" src={badge} alt="cat-badge" />
    </div>
  );
};

export default BadgeCard;
