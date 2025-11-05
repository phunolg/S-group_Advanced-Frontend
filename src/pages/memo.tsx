import { useState, memo } from "react";

interface ChildProps {
  name: string;
}

const Child = memo(({ name }: ChildProps) => {
  console.log("Child render");
  return <div>phuong {name}</div>;
});

function MemoExp() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">React Memo Example</h1>
      <p className="text-gray-600 mb-4">
        React.memo ngăn component con render lại khi props không thay đổi.
        Thử thay đổi count → Child không render lại. Chỉ khi name thay đổi mới re-render.
      </p>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Count: {count}</h3>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Increase count
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên..."
          />
        </div>
        
        <div className="p-4 bg-gray-100 rounded">
          <Child name={name} />
        </div>
      </div>
    </div>
  );
}

export default MemoExp;
