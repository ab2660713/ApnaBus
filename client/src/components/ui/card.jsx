export function Card({ className = "", children }) {
    return (
      <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ className = "", children }) {
    return <div className={className}>{children}</div>;
  }
  