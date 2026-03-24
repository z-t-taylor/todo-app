import "./BadgeList.css";
import BadgeCard from "../BadgeCard/BadgeCard";

const BadgeList = ({ badges }) => {
  const mappedBadges = badges.map((badge, i) => {
    return <BadgeCard key={i} badge={badge} />;
  });

  return (
    <div className="badge-list">
      <h3 className="__badge-list-title">Badges:</h3>
      <div className="__badge-list-imgs">
        {badges.length > 0 ? (
          mappedBadges
        ) : (
          <p className="__todo-not-complete-placeholder">
            Complete todos and get badges!
          </p>
        )}
      </div>
    </div>
  );
};

export default BadgeList;
