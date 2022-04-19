export default function Category({ categories, onFilter }) {
  return (
    <div className="categories">
      {categories.map(cat => (
        <button key={cat} className="category" onClick={() => onFilter(cat)}>{cat}</button>
      ))}
    </div>
  );
}
